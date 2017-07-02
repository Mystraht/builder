package com.isartdigital.builder.game.sprites.buildings;

import haxe.Timer;
import com.isartdigital.builder.game.animation.petals.PetalsSalve;
import com.isartdigital.builder.game.utils.CameraUtils;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.utils.TimeUtils;
import com.isartdigital.builder.ui.UIManager;
import Math;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.display.FlumpMovie;
import com.isartdigital.utils.game.StateGraphic;

class BuildingTimebase {
	private static inline var ANIMATION_NAME:String = 'FX_Waterball_in2';
	private static inline var DELAY_BEFORE_POPIN_END_CONSTRUCTION_OR_UPGRADE:Int = 1000;
	private static inline var BASE_TIMEBASE_ANIMATION_SIZE:Float = 2.5;
	private static inline var IN_CONSTRUCTION_ANIM_FRAME_START:Int = 34;
	private static inline var IN_CONSTRUCTION_ANIM_FRAME_END:Int = 90;
	private static inline var FINISH_CONSTRUCTION_ANIM_FRAME_END:Int = 148;

	private var isBuildingConstructing:Bool = false;
	private var building:Building;
	private var animation:StateGraphic;
	private var timeText:Text;

	public function new(building:Building) {
		this.building = building;
	}

	public function hideAnimation():Void {
		animation.visible = false;
		timeText.visible = false;
	}
	
	public function showAnimation () : Void {
		animation.visible = true;
		timeText.visible = true;
	}

	public function updateAnimation():Void {
		var currentFrame:Int = animation.getFlumpMovie().currentFrame;

		if (isConstructingOrUpgradingState()) {
			showAnimation();
			updateTimeText();
			if (currentFrame <= IN_CONSTRUCTION_ANIM_FRAME_START) {
				//building.visible = true;
			} else {
				//building.visible = false;
			}
			if (currentFrame >= IN_CONSTRUCTION_ANIM_FRAME_END) {
				animation.getFlumpMovie().gotoAndPlay(IN_CONSTRUCTION_ANIM_FRAME_START);
			}
			isBuildingConstructing = true;
		} else {
			if (isBuildingConstructing) {
				//building.visible = true;
				isBuildingConstructing = false;
			}
			if (currentFrame >= FINISH_CONSTRUCTION_ANIM_FRAME_END && animation.visible) {
				if (building.buildingLevel > 0) {
					requestRewardPopin();
				}
				PetalsSalve.lauchOnPositionWithRadius(building.positionToModel(true), PetalsSalve.PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION);
				hideAnimation();
				updateBuildingLevel();
			}
		}
	}

	public function isUpgradingState():Bool {
		return isConstructingOrUpgradingState() && building.buildingLevel > 0;
	}

	public function isConstructingOrUpgradingState():Bool {
		try {
			var constructionEndTimestamp:Float = getConstructionEndTimestamp();
			var nowTimestamp:Float = Date.now().getTime();
			return constructionEndTimestamp > nowTimestamp;
		} catch (e:String) {
			return false;
		}
	}

	public function isNotConstructingOrUpgradingState():Bool {
		return !isConstructingOrUpgradingState();
	}

	public function getHardBuildPrice():Int {
		var hardPriceMax:Int = Metadatas.buildingSettings.hard_price_max;
		var maxConstructTime:Int = Metadatas.buildingSettings.max_construct_time;
		var baseHardPrice:Int = Metadatas.buildingSettings.base_hard_price;
		var timeLeft:Float = (getTimeLeftBeforeBuildingFinishToBuild() / 1000 / 60);
		timeLeft = Math.ceil(timeLeft * 1000) / 1000;
		return Math.ceil((timeLeft / maxConstructTime) * hardPriceMax + baseHardPrice);
	}

	public function addAnimation() {
		animation = new StateGraphic(ANIMATION_NAME);
		cast(animation.getAnim(), FlumpMovie).loop = true;
		animation.visible = false;
		building.addChild(animation);
		centerAnimationOverBuilding();
		
		addTimeText();
		
		hideAnimation();
	}

	public function cleanObject():Void {
		if (animation != null) {
			if (animation.parent != null) {
				animation.parent.removeChild(animation);
				animation.destroy();
			}
		}
		
		if (timeText == null) {
			timeText.visible = true;
			building.removeChild(timeText);
			timeText.destroy();
		}
	}

	private function requestRewardPopin():Void {
		Timer.delay(function () {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_UPGRADEREWARD);
		}, DELAY_BEFORE_POPIN_END_CONSTRUCTION_OR_UPGRADE);
	}

	private function centerTextOnBuilding () : Void {
		timeText.position.set(-timeText.width / 2, -building.height);
	}
	
	private function addTimeText () : Void {
		createText();
		building.addChild(timeText);
		centerTextOnBuilding();
	}
	
	private function createText () : Void {
		var style:TextStyle = { };
		style.align = 'center';
		style.font = 'bold 50px ' + 'Candara';
		style.fill = "#FFFFFF";
		
		timeText = new Text("", style);
	}
	
	private function updateTimeText () : Void {
		var timeInMilliSeconds:Float = getTimeLeftBeforeBuildingFinishToBuild();
		var textToDisplay:String = TimeUtils.getTimeLeftFromMilliseconds(timeInMilliSeconds);
		timeText.text = textToDisplay;
		centerTextOnBuilding();
	}
	
	private function updateBuildingLevel():Void {
		var buildingLevelInGlobalMap:Int = building.getModelInGlobalMap().lvl;

		if (buildingLevelInGlobalMap > 0) {
			updateGraphicState();
		}
	}

	private function updateGraphicState():Void {
		cast(building.getAnim(), FlumpMovie).gotoAndStop(building.buildingLevel * 2);
	}

	private function getTimeLeftBeforeBuildingFinishToBuild():Float {
		var constructionEndTimestamp:Float = getConstructionEndTimestamp();
		var nowTimestamp:Float = Date.now().getTime();
		return constructionEndTimestamp - nowTimestamp;
	}

	private function getConstructionEndTimestamp():Float {
		var model:Dynamic = building.getModelInGlobalMap();
		throwErrorIfBuildingModelDontHave(model.construct_end_at);
		var constructionEnd:Date = Date.fromString(model.construct_end_at);
		var constructionEndTimestamp:Float = constructionEnd.getTime();
		return constructionEndTimestamp;
	}

	private function centerAnimationOverBuilding() {
		var buildingMaxSize:Float = Math.max(building.definition.size.width, building.definition.size.height);
		var animationScale:Float = buildingMaxSize / BASE_TIMEBASE_ANIMATION_SIZE;
		animation.scale = new Point(animationScale, animationScale);
		animation.position = new Point(0, 10);
	}

	private function throwErrorIfBuildingModelDontHave(constructEndDate:Dynamic):Void {
		if (constructEndDate == null) {
			throw BuildingExceptions.constructEndDateIsNull;
		}
	}
}
