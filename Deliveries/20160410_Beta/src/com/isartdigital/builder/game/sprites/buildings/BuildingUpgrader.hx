package com.isartdigital.builder.game.sprites.buildings;

import Std;
import Date;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import pixi.display.FlumpMovie;
import pixi.core.math.Point;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.manager.RessourceManager;

class BuildingUpgrader {
	private var building:Building;

	public function new(building:Building) {
		this.building = building;
	}

	/**
	 * If building can upgrade or not
	 * @param bool
	 **/
	public function canUpgrade():Bool {
		var config:Dynamic = building.getConfig();

		if (config.upgrade_price == null) {
			return false;
		}

		if (RessourceManager.getInstance().getRessources(config.resource_upgrade) < config.upgrade_price) {
			return false;
		} else {
			return true;
		}
	}

	/**
	 * Advice if building has next level
	 **/
	public function hasNextLevel():Bool {
		var config:Dynamic = building.getConfig();

		if (config.upgrade_price == null) {
			return false;
		}
		return true;
	}

	/**
	 * Request an upgrade
     **/
	public function upgrade():Void {
		var position:Point = building.positionToModel(true);
		var buildingModel:BuildingModelDef = building.getModelInGlobalMap();
		var configBeforeUpgrade:Dynamic = building.getConfig();
		var configAfterUpgrade:Dynamic;
		var upgradeEnd:Float;

		if (!canUpgrade()) {
			throw 'You try to upgrade building but it can\'t be upgraded';
		}

		Api.buildings.upgrade(Std.int(position.x), Std.int(position.y));
		RessourceManager.getInstance().removeRessources(configBeforeUpgrade.resource_upgrade, configBeforeUpgrade.upgrade_price);
		building.buildingLevel++;
		configAfterUpgrade = building.getConfig();
		upgradeEnd = Date.now().getTime() + Std.int(configAfterUpgrade.contruction_time * 1000 * 60);
		buildingModel.construct_end_at = Date.fromTime(upgradeEnd).toString();

		updateGraphicState();
	}

	private function updateGraphicState():Void {
		cast(building.getAnim(), FlumpMovie).gotoAndStop(building.buildingLevel * 2 + 1);
	}
}
