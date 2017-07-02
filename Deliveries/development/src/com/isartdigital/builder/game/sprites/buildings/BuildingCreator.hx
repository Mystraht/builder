package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.game.sprites.citizen.Citizen;
import com.isartdigital.utils.Time;
import Date;
import pixi.core.math.Point;
import com.isartdigital.builder.ui.popin.Shop;
import motion.easing.Cubic;
import motion.Actuate;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.game.type.ModelElementNames;
import Std;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.Main;

/**
 * Class qui gère la création de building au moment d'un achat dans le shop
 */
class BuildingCreator {
	private static inline var CAMERA_MOVE_TO_BUILDING_DELAY:Int = 1;

	private var buildingConstructor:BuildingConstructor;
	private var building:Building;
	private var isHardBought:Bool;
	private var buildingName:String;
	private var buildingModelToCreate:BuildingModelDef;
	private var buildingDef:BuildingDef;

	public function new() {}

	public function listenShopBuyEvents():Void {
		Main.getInstance().on(Shop.BUY_REQUEST_BUILDING, onBuildingBought);
	}

	public function onBuildingBought(buildingBuyAction:Dynamic):Void {
		var availablePlaceInMap:Point;

		isHardBought = buildingBuyAction.hard;
		buildingName = buildingBuyAction.buildingName;
		buildingDef = BuildingDefinition.getByName(buildingName);

		building = prepareBuildingObject();
		availablePlaceInMap = getAvailablePlace();
		prepareBuildingModelWith(availablePlaceInMap);
		addBuildingModelInGlobalMap();
		building.init(buildingModelToCreate);
		buildingModelToCreate.reference = building;
		buildingCreationRequestToServer();
		moveCameraToBuilding();
		Citizen.createCitizenAtRandomPosition();
		Citizen.showAllPassiveCitizens();
	}

	private function prepareBuildingObject():Building {
		var building:Building = cast PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings.Building"));
		buildingConstructor = new BuildingConstructor(building);
		building.definition = buildingDef;
		building.x = 0;
		building.y = 0;
		return building;
	}

	private function prepareBuildingModelWith(availablePlaceInMap:Point):Void {
		buildingModelToCreate = TypeDefUtils.cloneObject(TypeDefUtils.buildingModelDef);
		buildingModelToCreate.type = ModelElementNames.BUILDING;
		buildingModelToCreate.x = Std.int(availablePlaceInMap.x);
		buildingModelToCreate.y = Std.int(availablePlaceInMap.y);
		buildingModelToCreate.lvl = 0;
		buildingModelToCreate.name = buildingName;
		buildingModelToCreate.construct_end_at = getBuildingModelConstructEnd();

		if (buildingDef.component.indexOf('COLLECTABLE') != -1) {
			buildingModelToCreate.last_recolt_at = Date.now().toString();
		}
	}

	private function getBuildingModelConstructEnd():String {
		var config:Dynamic = BuildingUtils.getConfigByName(buildingName, 0);
		var contructEndInMS:Float = Date.now().getTime() + config.contruction_time * Time.MILLISECONDS_IN_SECOND * Time.SECONDS_IN_MINUTE;
		var constructEndInDate:Date = Date.fromTime(contructEndInMS);
		return constructEndInDate.toString();
	}

	private function addBuildingModelInGlobalMap():Void {
		if (GMap.isPositionExistAt(new Point(buildingModelToCreate.x, buildingModelToCreate.y), GMap.globalMap)) {
			Building.buildingsModel.push(buildingModelToCreate);
			GMap.addElementsBySizeAt(new Point(buildingModelToCreate.x, buildingModelToCreate.y), buildingDef.size, buildingModelToCreate);
		}
	}

	private function getAvailablePlace():Point {
		var startResearchPosition:Point = GMap.getTilePositionAtScreenCenter();
		var radius:Int = 100;
		var index:Float;
		var positionToTestAvailablePlace:Point = new Point();

		for (i in 0...radius) {
			for (j in 0...radius * 30) {
				index = j / radius;
				positionToTestAvailablePlace.x = Math.round(startResearchPosition.x + Math.cos(index) * i);
				positionToTestAvailablePlace.y = Math.round(startResearchPosition.y + Math.sin(index) * i);
				buildingConstructor.setDestination(new Point(positionToTestAvailablePlace.x, positionToTestAvailablePlace.y));
				if (buildingConstructor.canConstruct()) {
					return new Point(positionToTestAvailablePlace.x, positionToTestAvailablePlace.y);
				}
			}
		}

		return new Point();
	}

	private function buildingCreationRequestToServer():Void {
		Api.buildings.create(buildingName, buildingModelToCreate.x, buildingModelToCreate.y, isHardBought);
	}

	private function moveCameraToBuilding():Void {
		Actuate.tween(Camera.getInstance().cameraFocus, CAMERA_MOVE_TO_BUILDING_DELAY, { x: building.position.x, y: building.position.y } ).ease(Cubic.easeInOut);

		haxe.Timer.delay(function() {
			setMoveStateTo(buildingModelToCreate);
		}, CAMERA_MOVE_TO_BUILDING_DELAY * 1000);
	}

	private function setMoveStateTo(buildingModelDef:BuildingModelDef) {
		for (i in 0...Building.list.length) {
			var buildingToTestPosition = Building.list[i].positionToModel(true);

			if (buildingToTestPosition.x == buildingModelDef.x && buildingToTestPosition.y == buildingModelDef.y) {
				Building.list[i].select();
				Building.list[i].setMoveState();
			}
		}
	}
}
