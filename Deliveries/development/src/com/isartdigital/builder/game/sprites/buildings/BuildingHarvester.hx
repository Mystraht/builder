package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.game.animation.harvest.AnimationHarvest;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.animation.AnimationNames;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.ui.hud.CurrencyAsset;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.utils.Config;
import pixi.core.math.Point;
import com.isartdigital.utils.ui.UIComponent;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.builder.game.animation.harvest.AnimationHarvestBuilder;
import com.isartdigital.utils.Time;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import motion.easing.IEasing;
import motion.easing.Cubic;
import motion.Actuate;
import Reflect;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.utils.game.StateGraphic;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingHarvester
{
	public static inline var MINIMUM_FILL_PERCENT_FOR_HARVESTING:Float = 0.005;
	public static inline var HARVEST_OFFERING_ICON:String = 'HarvestOffering';
	public static inline var HARVEST_GOLD_ICON:String = 'HarvestPesos';

	private var building:Building;
	private var harvestingActivated:Bool;
	private var icon:StateGraphic;
	private var iconPosition:Point;
	private var oscillationCurveType:IEasing = Cubic.easeInOut;
	private var oscillationOffset:Int = 15;
	private var timeBeforeChangeDirection:Int = 1000;

	public function new(building:Building) {
		this.building = building;
		harvestingActivated = true;
	}

	/**
	 * Update le status de l'icon d'harvesting
	 */
	public function updateHarvestIconState():Void {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		if (canHarvest()) {
			icon.visible = true;
		} else {
			icon.visible = false;
		}
	}
	
	/**
	 * Indique si le batiment est un batiment recoltable ou non
	 * @return
	 */
	public function isBuildingHasHarvestFunctionality():Bool {
		var buildingModel:BuildingModelDef = building.getModelInGlobalMap();
		return buildingModel.last_recolt_at != null;
	}

	/**
	 * Met à jour la class avec la resource correct
	 */
	public function setHarvestResourceType():Void {
		var buildingConfig:Dynamic = building.getConfig();
		var resourceType:String = '';
		var buildingSize:Point = BuildingUtils.getBuildingSizeInPixelBy(building);

		resourceType = Reflect.field(buildingConfig, 'resource_price') == 'gold' ?  HARVEST_GOLD_ICON : HARVEST_OFFERING_ICON;

		if (icon != null) {
			if (icon.parent != null) {
				icon.parent.removeChild(icon);
				icon.destroy();
			}
		}

		icon = new StateGraphic(resourceType);
		iconPosition = new Point(-50, -(buildingSize.y / 2) - 300);
		building.addChild(icon);

		icon.position.set(iconPosition.x, iconPosition.y);
		icon.interactive = true;
		icon.boxType = BoxType.SELF;
		icon.on(MouseEventType.CLICK, building.interactionAction);

		moveAnimToUp();
	}

	/**
	 * Indique à combien de pourcentage le batiment est remplie avec sa ressource (0 à 1)
	 * @return
	 */
	public function getPercentFilled():Float {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		var buildingConfig:Dynamic = building.getConfig();
		var buildingLastRecolt:Date = Date.fromString(building.getModelInGlobalMap().last_recolt_at);
		var percentFilledPerHours:Float = buildingConfig.production / buildingConfig.capacity;
		var millisecondsElapsedSinceLastRecolt:Float = Date.now().getTime() - buildingLastRecolt.getTime();
		var hoursElapsedSinceLastRecolt:Float = millisecondsElapsedSinceLastRecolt / (Time.SECONDS_IN_HOUR * Time.MILLISECONDS_IN_SECOND);
		var percentFilled:Float = percentFilledPerHours * hoursElapsedSinceLastRecolt;
		percentFilled = percentFilled > 1 ? 1 : percentFilled;
		return percentFilled;
	}

	/**
	 * Indique si le building peut être recolté
	 */
	public function canHarvest():Bool {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		return getPercentFilled() > MINIMUM_FILL_PERCENT_FOR_HARVESTING && harvestingActivated;
	}
	
	/**
	 * Havers le building
	 */
	public function harvest():Void {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		createAnimationFeedback();
		updateLastRecoltDate();
		Ftue.event.emit(FtueEvents.HARVESTED);
	}

	public function activeHarversting():Void {
		harvestingActivated = true;
	}

	public function desactiveHarversting():Void {
		harvestingActivated = false;
	}

	public function cleanObject():Void {
		if (icon != null) {
			icon.parent.removeChild(icon);
			icon.destroy();
		}
	}

	private function createAnimationFeedback():Void {
		AnimationHarvestBuilder.create()
							   .withStartAnimationPosition(getPositionInHudView)
							   .withEndAnimationPosition(getRessourceProductionAssetPositionInHud)
							   .withCoinAmountToGenerate(Math.ceil(getAmountFilled()))
							   .withCallbackWhenCoinReachDestination(addHarvestingResource)
							   .withAnimationName(getAnimationName())
							   .withContainer(Hud.getInstance())
							   .withCallbackOnAnimationEnd(updateResourceInServer)
							   .build()
							   .animate();
	}

	private function getPositionInHudView():Point {
		var buildingSize:Point = BuildingUtils.getBuildingSizeInPixelBy(building);
		var modelPosition:Point = building.positionToModel(true);
		modelPosition.x -= (buildingSize.y / 2) / Config.tileHeight;
		modelPosition.y -= (buildingSize.y / 2) / Config.tileHeight;

		return IsoManager.modelToHudView(modelPosition);
	}

	private function getRessourceProductionAssetPositionInHud():Point {
		var buildingConfig:Dynamic = building.getConfig();
		var hud:Hud = Hud.getInstance();
		var UIResourceComponent:UIComponent;

		switch (buildingConfig.resource_production) {
			case RessourceManager.GOLD:
				UIResourceComponent = hud.getGoldComponent();
			case RessourceManager.OFFERING:
				UIResourceComponent = hud.getOfferingComponent();
			case RessourceManager.SPICE:
				UIResourceComponent = hud.getSpiceComponent();
			default:
				throw 'BuildingHarvester: resource_production value retrevied from building settings json is incorrect';
		}

		return new Point(
			UIResourceComponent.x + CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_X,
			UIResourceComponent.y + CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y
		);
	}

	private function getAnimationName():String {
		var buildingConfig:Dynamic = building.getConfig();
		switch (buildingConfig.resource_production) {
			case RessourceManager.GOLD:
				return AnimationNames.ANIM_GOLD;
			case RessourceManager.OFFERING:
				return AnimationNames.ANIM_OFFERING;
			case RessourceManager.SPICE:
				return AnimationNames.ANIM_SPICE;
			default:
				throw 'BuildingHarvester: resource_production value retrevied from building settings json is incorrect';
		}
	}

	private function addHarvestingResource():Void {
		var buildingConfig:Dynamic = building.getConfig();
		RessourceManager.getInstance().addRessources(buildingConfig.resource_production, AnimationHarvest.RESOURCE_GAIN_PER_COIN);
	}

	private function updateLastRecoltDate():Void {
		building.getModelInGlobalMap().last_recolt_at = Date.now().toString();
	}

	private function updateResourceInServer():Void {
		var position:Point = building.positionToModel(true);
		Api.buildings.collect(Std.int(position.x), Std.int(position.y));
	}

	private function getAmountFilled():Int {
		var buildingConfig:Dynamic = building.getConfig();
		var houseResourceMultiplier:Float = BuildingUtils.getConfigByName(BuildingNames.HOUSE).resource_multiplier;
		var resourceMultiplier:Float = 1 + houseResourceMultiplier * BuildingUtils.getTotalHouse();
		return Math.ceil(getPercentFilled() * buildingConfig.capacity * resourceMultiplier);
	}

	private function throwExceptionIfBuildingHaventHarvestFunctionality():Void {
		if (!building.isHarvestable()) {
			throw BuildingExceptions.noHarvestFunctionality;			
		}
	}

	private function moveAnimToDown():Void {
		haxe.Timer.delay(function() {
			if (icon.position == null) {
				return;
			}
			Actuate.tween(icon.position, timeBeforeChangeDirection / 1000, { y: iconPosition.y + oscillationOffset } ).ease(oscillationCurveType);
			moveAnimToUp();
		}, timeBeforeChangeDirection);
	}

	private function moveAnimToUp():Void {
		haxe.Timer.delay(function() {
			if (icon.position == null) {
				return;
			}
			Actuate.tween(icon.position, timeBeforeChangeDirection / 1000, { y: iconPosition.y - oscillationOffset } ).ease(oscillationCurveType);
			moveAnimToDown();
		}, timeBeforeChangeDirection);
	}
}