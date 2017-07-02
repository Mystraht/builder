package com.isartdigital.builder.game.sprites.buildings;

import motion.easing.IEasing;
import motion.easing.Cubic;
import motion.Actuate;
import com.isartdigital.utils.Config;
import Reflect;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.utils.game.StateGraphic;
import haxe.Json;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingHarvester
{
	public static inline var MINIMUM_FILL_PERCENT_FOR_HARVESTING:Float = 0.0005;
	public static inline var HARVEST_OFFERING_ICON:String = 'HarvestOffering';
	public static inline var HARVEST_GOLD_ICON:String = 'HarvestPesos';

	private static inline var SECONDS_IN_HOUR:Int = 3600;
	private static inline var MILLISECONDS_IN_SECOND:Int = 1000;

	private var building:Building;
	private var icon:StateGraphic;
	private var iconPosition:Point;

	private var oscillationCurveType:IEasing = Cubic.easeInOut;
	private var oscillationOffset:Int = 15;
	private var timeBeforeChangeDirection:Int = 1000;

	public function new(building:Building) {
		this.building = building;
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
		building.definition.component.indexOf('COLLECTABLE');
		return buildingModel.last_recolt_at != null;
	}

	/**
	 * Met à jour la class avec la resource correct
	 */
	public function setHarvestResourceType():Void {
		var buildingConfig:Dynamic = building.getConfig();
		var resourceType:String = '';

		resourceType = Reflect.field(buildingConfig, 'resource_price') == 'gold' ?  HARVEST_GOLD_ICON : HARVEST_OFFERING_ICON;

		if (icon != null) {
			if (icon.parent != null) {
				icon.parent.removeChild(icon);
			}
		}

		icon = new StateGraphic(resourceType);
		var lPoint:Point = getSize();
		iconPosition = new Point(0 - 50, -(lPoint.y / 2) - 300);
		building.addChild(icon);

		icon.position.set(iconPosition.x, iconPosition.y);

		goUp();
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
		var hoursElapsedSinceLastRecolt:Float = millisecondsElapsedSinceLastRecolt / (SECONDS_IN_HOUR * MILLISECONDS_IN_SECOND);
		var percentFilled:Float = percentFilledPerHours * hoursElapsedSinceLastRecolt;
		percentFilled = percentFilled > 1 ? 1 : percentFilled;
		return percentFilled;
	}

	/**
	 * Indique si le building peut être recolté
	 */
	public function canHarvest():Bool {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		return getPercentFilled() > MINIMUM_FILL_PERCENT_FOR_HARVESTING;
	}
	
	/**
	 * Havers le building
	 */
	public function harvest():Void {
		throwExceptionIfBuildingHaventHarvestFunctionality();
		addHarvestingResource();
		updateLastRecoltDate();
		updateResourceInServer();
	}

	public function cleanObject():Void {
		if (icon != null) {
			icon.parent.removeChild(icon);
		}
	}
	
	private function getSize():Point {
		return new Point(building.definition.size.width * Config.tileWidth,
						building.definition.size.height * Config.tileHeight);
	}

	private function addHarvestingResource():Void {
		var buildingConfig:Dynamic = building.getConfig();
		var percentFilled:Float = getPercentFilled();
		var position:Point = building.positionToModel(true);
		RessourceManager.getInstance().addRessources(buildingConfig.resource_production, Math.ceil(percentFilled * buildingConfig.capacity));
	}
	
	private function updateLastRecoltDate():Void {
		building.getModelInGlobalMap().last_recolt_at = Date.now().toString();		
	}
	
	private function updateResourceInServer():Void {
		var position:Point = building.positionToModel(true);
		Api.buildings.collect(Std.int(position.x), Std.int(position.y), cbBuildingHarvested);
	}
	
	private function cbBuildingHarvested(results:String):Void {
		var results:DataDef = cast(Json.parse(results));
		
		if (results.error) {
			Utils.errorHandler(results.errorCode, results.errorMessage);
			return;
		}
	}
	
	private function throwExceptionIfBuildingHaventHarvestFunctionality():Void {
		if (!isBuildingHasHarvestFunctionality()) {
			throw BuildingExceptions.noHarvestFunctionality;			
		}
	}

	private function goDown():Void {
		haxe.Timer.delay(function() {
			Actuate.tween(icon.position, timeBeforeChangeDirection / 1000, { y: iconPosition.y + oscillationOffset } ).ease(oscillationCurveType);
			goUp();
		}, timeBeforeChangeDirection);
	}

	private function goUp():Void {
		haxe.Timer.delay(function() {
			Actuate.tween(icon.position, timeBeforeChangeDirection / 1000, { y: iconPosition.y - oscillationOffset } ).ease(oscillationCurveType);
			goDown();
		}, timeBeforeChangeDirection);
	}
}