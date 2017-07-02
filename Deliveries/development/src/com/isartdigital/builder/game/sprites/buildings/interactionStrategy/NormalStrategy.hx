package com.isartdigital.builder.game.sprites.buildings.interactionStrategy;

import com.isartdigital.utils.game.Filter;
import pixi.core.math.Point;
import com.isartdigital.utils.game.Camera;

class NormalStrategy extends Building {
	private var building:Building;

	public function new(building:Building) {
		super();
		this.building = building;
	}

	public function normalInteraction() {
		if (cantInteract()) {
			return;
		}

		if (canConstructRequest()) {
			constructBuilding();
			Camera.activateCamera();
			building.stopMove();
			building.emitSelectEvent();
		} else if (canHarvest()) {
			building.buildingHarvester.harvest();
		} else if (canSelectBuilding()) {
			building.select();
		} else if (canUnselectBuilding()) {
			BuildingUtils.unselectBuildingSelected();
		}
	}
	
	private function cantInteract():Bool {
		return (
			cameraIsMoving() ||
			building.isMoving && building.buildingPosition.isCursorNotOverBuilding() ||
			isBuildingMovingAndCantConstruct()
		);
	}

	private function cameraIsMoving():Bool {
		return Camera.getInstance().hasMoved;
	}

	private function canConstructRequest():Bool {
		return building.isMoving && canConstruct();
	}
	
	private function isBuildingMovingAndCantConstruct():Bool {
		return building.isMoving && !canConstruct();
	}
	
	private function canConstruct():Bool {
		var destination:Point = building.positionToModel(true);
		building.buildingConstructor.setDestination(destination);
		return building.buildingConstructor.canConstruct();
	}

	private function constructBuilding():Void {
		var destination:Point = building.positionToModel(true);

		building.buildingConstructor.setDestination(destination);

		if (building.buildingConstructor.canConstruct()) {
			building.buildingConstructor.construct();
			building.filters = Filter.EMPTY_FILTER;
		}
	}

	private function canHarvest():Bool {
		if (building.hasHarvestableFunctionality) {
			return building.buildingHarvester.canHarvest() && canSelectBuilding() && !canUnselectBuilding();
		} else {
			return false;
		}
	}

	private function canSelectBuilding():Bool {
		return !BuildingUtils.thereIsOtherBuildingMovingThan(building) && !building.isSelected;
	}

	private function canUnselectBuilding():Bool {
		return building.isSelected;
	}
}
