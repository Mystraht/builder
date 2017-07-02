package com.isartdigital.builder.game.sprites.buildings.interactionStrategy;

import com.isartdigital.utils.game.Filter;
import pixi.core.math.Point;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.builder.ui.hud.BaseBuildingHUD;


class NormalStrategy extends Building {
	private var building:Building;

	public function new(building:Building) {
		super();
		this.building = building;
	}

	public function normalInteraction() {
		if (cameraIsMoving()) {
			return;
		}

		if (canRequestConstruction()) {
			constructBuildingAtMousePosition();
		} else if (canHarvest()) {
			building.buildingHarvester.harvest();
		} else if (canSelectBuilding()) {
			building.select();
		} else if (canUnselectBuilding()) {
			BuildingUtils.unselectBuildingSelected();
		}
	}

	private function cameraIsMoving():Bool {
		return Camera.getInstance().asMoved;
	}

	private function canRequestConstruction():Bool {
		return building.isFollowingCursor && !Camera.getInstance().asMoved;
	}

	private function constructBuildingAtMousePosition():Void {
		var destination:Point = building.buildingPosition.getPositionOnCursor();

		building.buildingConstructor.setDestination(destination);

		if (building.buildingConstructor.canConstruct()) {
			building.buildingConstructor.construct();
			building.stopFollowCursor();
			building.filters = Filter.EMPTY_FILTER;
		}
	}

	private function canHarvest():Bool {
		if (building.buildingHarvester.isBuildingHasHarvestFunctionality()) {
			return building.buildingHarvester.canHarvest();
		} else {
			return false;
		}
	}

	private function canSelectBuilding():Bool {
		return !BuildingUtils.thereIsOtherBuildingMovingThan(building) && !building.isSelected;
	}

	private function canUnselectBuilding():Bool {
		return building.isSelected && !BaseBuildingHUD.getInstance().upgradeButton.isActive;
	}
}
