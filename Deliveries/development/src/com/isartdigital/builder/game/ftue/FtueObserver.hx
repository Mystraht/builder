package com.isartdigital.builder.game.ftue;

import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
class FtueObserver {
	public function new() {
		subscribeEvents();
	}

	public function destroy():Void {
		unsubscribeEvents();
	}

	private function subscribeEvents():Void {
		Ftue.event.on(FtueEvents.BUILDING_BOUGHT, onBuildingBought);
		Ftue.event.on(FtueEvents.BUILDING_UPGRADED, onBuildingUpgraded);
		Ftue.event.on(FtueEvents.BUILDING_PLACED, onBuildingPlaced);
		Ftue.event.on(FtueEvents.BUILDING_SELECTED, onBuildingSelected);
	}

	private function unsubscribeEvents():Void {
		Ftue.event.off(FtueEvents.BUILDING_BOUGHT, onBuildingBought);
		Ftue.event.off(FtueEvents.BUILDING_UPGRADED, onBuildingUpgraded);
		Ftue.event.off(FtueEvents.BUILDING_PLACED, onBuildingPlaced);
		Ftue.event.off(FtueEvents.BUILDING_SELECTED, onBuildingSelected);
	}

	private function onBuildingBought(parameters:Dynamic):Void {
		if (parameters.buildingName == BuildingNames.BAR) {
			Ftue.event.emit(FtueEvents.BAR_BOUGHT);
		}
		if (parameters.buildingName == BuildingNames.HOUSE) {
			Ftue.event.emit(FtueEvents.HOUSE_BOUGHT);
		}
		if (parameters.buildingName == BuildingNames.LANTERNS) {
			Ftue.event.emit(FtueEvents.LANTERN_BOUGHT);
		}
	}

	private function onBuildingUpgraded(parameters:Dynamic):Void {
		if (parameters.buildingName == BuildingNames.CITY_HALL) {
			Ftue.event.emit(FtueEvents.CITYHALL_UPGRADE);
		}
		if (parameters.buildingName == BuildingNames.BAR) {
			Ftue.event.emit(FtueEvents.BAR_UPGRADED);
		}
	}

	private function onBuildingPlaced(parameters:Dynamic):Void {
		if (parameters.buildingName == BuildingNames.BAR) {
			Ftue.event.emit(FtueEvents.BAR_PLACED);
		}
		if (parameters.buildingName == BuildingNames.HOUSE) {
			Ftue.event.emit(FtueEvents.HOUSE_PLACED);
		}
	}

	private function onBuildingSelected(parameters:Dynamic):Void {
		if (parameters.buildingName == BuildingNames.CITY_HALL){
			Ftue.event.emit(FtueEvents.CITYHALL_SELECT);
		}
	}
}
