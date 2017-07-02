package com.isartdigital.builder.game.sprites.buildings;

import pixi.core.math.Point;
import motion.easing.Cubic;
import motion.Actuate;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.builder.api.Utils;
import haxe.Json;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.game.type.ModelElementNames;
import Std;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.utils.Config;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.ui.screens.ShopEvent;
import com.isartdigital.builder.Main;

class BuildingCreator {
	public var buildingConstructor:BuildingConstructor;

	public function new() {}

	public function listenShopBuyEvents():Void {
		Main.getInstance().on(ShopEvent.SHOP_BUY_BUILDING, onBuildingBought);
	}

	public function onBuildingBought(buildingBuyAction:Dynamic):Void {
		var isHardBought:Bool = buildingBuyAction.hard;
		var buildingName:String = buildingBuyAction.buildingName;
		var buildingDef:BuildingDef = BuildingDefinition.getByName(buildingName);
		var building:Building = cast PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings.Building"));
		var buildingModelDef:BuildingModelDef = TypeDefUtils.cloneObject(TypeDefUtils.buildingModelDef);
		var availablePlaceInMap:Point;
		var cameraMoveToBuildingDelay:Int = 1;

		buildingConstructor = new BuildingConstructor(building);
		building.definition = buildingDef;
		building.x = 0;
		building.y = 0;
		availablePlaceInMap = getAvailablePlace();

		buildingModelDef.type = ModelElementNames.BUILDING;
		buildingModelDef.x = Std.int(availablePlaceInMap.x);
		buildingModelDef.y = Std.int(availablePlaceInMap.y);
		buildingModelDef.buildingLevel = 0;
		buildingModelDef.name = buildingName;

		if (buildingDef.component.indexOf('COLLECTABLE') != -1) {
			buildingModelDef.last_recolt_at = Date.now().toString();
		}

		if (GMap.isPositionExistAt(new Point(buildingModelDef.x, buildingModelDef.y), GMap.globalMap)) {
			GMap.addElementsBySizeAt(new Point(buildingModelDef.x, buildingModelDef.y), buildingDef.size, buildingModelDef);
		}

		building.init(buildingModelDef);

		Api.buildings.create(buildingName, buildingModelDef.x, buildingModelDef.y, isHardBought, cbOnBuildingCreated);
		Actuate.tween(Camera.getInstance().cameraFocus, cameraMoveToBuildingDelay, { x: building.position.x, y: building.position.y } ).ease(Cubic.easeInOut);

		haxe.Timer.delay(function() {
			setMovingStateTo(buildingModelDef);
		}, cameraMoveToBuildingDelay * 1000);
	}

	private function getAvailablePlace():Point {
		for (x in 0...Config.mapSize) {
			for (y in 0...Config.mapSize) {
				buildingConstructor.setDestination(new Point(x, y));
				if (buildingConstructor.canConstruct()) {
					return new Point(x, y);
				}
			}
		}

		// todo
		// Return un event pour dire qu'il y a pas de place pour construire
		return new Point();
	}

	private function setMovingStateTo(buildingModelDef:BuildingModelDef) {
		for (i in 0...Building.list.length) {
			var buildingToTestPosition = Building.list[i].positionToModel(true);

			if (buildingToTestPosition.x == buildingModelDef.x && buildingToTestPosition.y == buildingModelDef.y) {
				Building.list[i].select();
				Building.list[i].setMoveState();
			}
		}
	}

	private function cbOnBuildingCreated(results:String):Void {
		var results:DataDef = cast(Json.parse(results));

		if (results.error) {
			Utils.errorHandler(results.errorCode, results.errorMessage);
			return;
		}
	}
}
