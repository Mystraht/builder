package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.utils.game.GameStage;
import pixi.display.FlumpMovie;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.sprites.buildings.interactionStrategy.NormalStrategy;
import com.isartdigital.builder.game.sprites.buildings.interactionStrategy.LanternStrategy;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.sprites.buildings.Building;

/**
 * Building component that will set base configuration of building
 */
@:access(com.isartdigital.builder.game.sprites.buildings.Building)
class BuildingInitialisator {
	private var building:Building;

	public function new(building:Building) {
		this.building = building;
	}

	public function initialisate(buildingModelDef:BuildingModelDef):Void {
		setBuildingConfigurationWith(buildingModelDef);
		setInteractionStrategy();
		createZSortableConfiguration();
		addEventSubscription();
		hideIfInFog();
		addToStage();
	}

	private function setBuildingConfigurationWith(buildingModelDef:BuildingModelDef):Void {
		var buildingModelPosition:Point = new Point(buildingModelDef.x, buildingModelDef.y);
		var buildingIsoPosition:Point = IsoManager.modelToIsoView(buildingModelPosition);

		building.definition = BuildingDefinition.getByName(buildingModelDef.name);
		building.assetName = building.definition.spriteName;
		building.changeAsset(building.definition.spriteName);

		building.x = Math.floor(buildingIsoPosition.x);
		building.y = Math.floor(buildingIsoPosition.y);

		building.buildingLevel = buildingModelDef.lvl;

		building.buildingConstructor.setDestination(buildingModelPosition);
		building.buildingConstructor.construct();

		building.hasHarvestableFunctionality = building.buildingHarvester.isBuildingHasHarvestFunctionality();

		Building.list.push(building);
	}

	private function setInteractionStrategy():Void {
		var lanternStrategy:LanternStrategy = new LanternStrategy(building);
		var normalStrategy:NormalStrategy = new NormalStrategy(building);

		if (isBuildingLantern()) {
			building.interactionAction = lanternStrategy.lanternInteraction;
		} else {
			building.interactionAction = normalStrategy.normalInteraction;
		}
	}

	private function isBuildingLantern():Bool {
		return building.definition.name == 'lanterns';
	}

	private function isNotBuildingLantern():Bool {
		return !isBuildingLantern();
	}

	private function createZSortableConfiguration():Void {
		var position:Point = building.positionToModel(true);

		building.colMin = Std.int(position.y);
		building.colMax = Std.int(position.y) + building.definition.size.height;
		building.rowMin = Std.int(position.x);
		building.rowMax = Std.int(position.x) + building.definition.size.width;
	}

	private function addEventSubscription():Void {
		Main.getInstance().on(GameManager.EVENT_INTERACTION, building.onInteractionEvent);
	}

	private function hideIfInFog():Void {
		var positionModel:Point = building.positionToModel(true);
		var tileUnderBuilding:TileModelDef = GMap.getElementByTypeAt(positionModel, ModelElementNames.TILE);
		building.visible = tileUnderBuilding.isIlluminated;

	}

	private function addToStage():Void {
		building.setState(building.DEFAULT_STATE);
		cast(building.anim, FlumpMovie).gotoAndStop(building.buildingLevel * 2);
		cast(building.anim, FlumpMovie).animationSpeed = 0.80;
		GameStage.getInstance().getBuildingsContainer().addChild(building);

		if (isBuildingLantern()) {
			building.setModeVoid();
		} else {
			building.start();
		}

		if (building.hasHarvestableFunctionality) {
			building.buildingHarvester.setHarvestResourceType();
		}

		building.buildingTimebase.addAnimation();
	}
}
