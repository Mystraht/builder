package com.isartdigital.builder.game.sprites.buildings;

import pixi.core.math.Point;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import pixi.display.FlumpMovie;

class BuildingTimebase {
	private static inline var BASE_TIMEBASE_ANIMATION_SIZE:Int = 3;

	private var building:Building;
	private var animation:StateGraphic;

	public function new(building:Building) {
		this.building = building;
	}

	public function addAnimation() {
		animation = new StateGraphic('FX_Waterball_in2');
		cast(animation.getAnim(), FlumpMovie).loop = true;
		animation.visible = false;
		building.addChild(animation);
		centerAnimationOverBuilding();
	}

	private function centerAnimationOverBuilding() {
		var buildingMaxSize:Float = Math.max(building.definition.size.width, building.definition.size.height);
		var animationScale:Float = buildingMaxSize / BASE_TIMEBASE_ANIMATION_SIZE;
		animation.scale = new Point(animationScale, animationScale);
		animation.position = new Point(0, 0);
	}

	public function isConstructingOrUpgradingState():Bool {
		var model:Dynamic = building.getModelInGlobalMap();
		throwErrorIfBuildingModelDontHave(model.construct_end_at);
		var constructionEnd:Date = Date.fromString(model.construct_end_at);
		var constructionEndTimestamp:Float = constructionEnd.getTime();
		var nowTimestamp:Float = Date.now().getTime();
		return constructionEndTimestamp > nowTimestamp;
	}

	public function isNotConstructingOrUpgradingState():Bool {
		return !isConstructingOrUpgradingState();
	}

	public function updateAnimation():Void {
		if (isConstructingOrUpgradingState()) {
			animation.visible = true;
		} else {
			animation.visible = false;
		}
	}

	public function cleanObject():Void {
		if (animation != null) {
			if (animation.parent != null) {
				animation.parent.removeChild(animation);
			}
		}
	}

	private function throwErrorIfBuildingModelDontHave(constructEndDate:Dynamic):Void {
		if (constructEndDate == null) {
			throw BuildingExceptions.constructEndDateIsNull;
		}
	}

}
