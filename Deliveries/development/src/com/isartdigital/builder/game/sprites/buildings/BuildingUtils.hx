package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import Array;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.Config;
import com.isartdigital.builder.game.map.GMap;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
@:access(com.isartdigital.builder.game.sprites.buildings.Building)
class BuildingUtils
{
	/**
	 * Desectionne le building actuellement selectionné
	 */
	public static function unselectBuildingSelected():Void {
		var building:Building;
		var buildings:Array<Building> = Building.list;
		
		for (i in 0...buildings.length) {
			building = buildings[i];
			if (building.isSelected) {
				building.setBuildingUnselected();
			}
		}
	}
	
	/**
	 * Permet de savoir si il y a un autre building actuellement en train de bougé, autre que celui entré en paramètre
	 * @param	buildingSource
	 * @return
	 */
	public static function thereIsOtherBuildingMovingThan(buildingSource:Building):Bool {
		var building:Building;
		var buildings:Array<Building> = Building.list;
		
		for (i in 0...buildings.length) {
			building = buildings[i];
			if (building.isMoving && building != buildingSource) {
				return true;
			}
		}
		
		return false;
	}
	
	
	/**
	 * Return true si la position inqiqué est l'origine du building
	 */
	public static function isBuildingOriginInGlobalMapAt(position:Point):Bool {
		return GMap.isModelElementOriginInGlobalMapAt(position, ModelElementNames.BUILDING);
	}

	/**
	 * Récupère la taille du building en px
	 **/
	public static function getBuildingSizeInPixelBy(building:Building):Point {
		return new Point(
			building.definition.size.width * Config.tileWidth,
			building.definition.size.height * Config.tileHeight
		);
	}

	/**
	 * Récupère la configuration d’un building par son nom et son niveau
	 * @param name Nom du building
	 * @param level Niveau du building (0 = lvl 1)
	 */
	public static function getConfigByName(name:String, level:Int = null) {
		var buildingsSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		var buildingSetting:Dynamic = Reflect.field(buildingsSettings, name);

		if (buildingSetting == null) {
			throw BuildingExceptions.configNotFound + ' | Building name : ' + name;
		}

		if (isUpgradableBuilding(name)) {
			buildingSetting = Reflect.field(buildingSetting, '' + (level + 1));
		}

		return buildingSetting;
	}

	/**
	 * Permet de savoir si un building est upgradable ou non
	 * @param name Nom du building
	 */
	public static function isUpgradableBuilding(name:String):Bool {
		var buildingsSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		var buildingSetting:Dynamic = Reflect.field(buildingsSettings, name);

		if (buildingSetting == null) {
			throw BuildingExceptions.configNotFound;
		}

		return Reflect.field(buildingSetting, '1') != null;
	}

	/**
	 * Permet de rendre un building visible
	 * @param position position du building
	 **/
	public static function setBuildingVisibleAt(position:Point):Void {
		var buildingModel:BuildingModelDef = GMap.getElementByTypeAt(position, ModelElementNames.BUILDING);

		if (buildingModel == null) {
			return;
		}

		if (GMap.getElementByTypeAt(position, ModelElementNames.BUILDING).reference != null) {
			GMap.getElementByTypeAt(position, ModelElementNames.BUILDING).reference.visible = true;
		}
	}

	/**
	 * Indique si un building exist dans la map
	 * @param name nom du building
	 **/
	public static function isBuildingModelExist(name:String):Bool {
		try {
			getBuildingsModel(name);
			return true;
		} catch (e:String) {
			return false;
		}
	}

	/**
	 * Récupère les model des buildings dans la map avec son nom
	 * @param name Nom du building
	 * @return buildingsModel Array des modelDef trouvé
     **/
	public static function getBuildingsModel(name:String):Array<BuildingModelDef> {
		var buildingsModel:Array<BuildingModelDef> = new Array();
		var buildingModel:BuildingModelDef;

		for (i in 0...Building.buildingsModel.length) {
			buildingModel = Building.buildingsModel[i];
			if (buildingModel.name == name) {
				buildingsModel.push(buildingModel);
			}
		}

		if (buildingsModel.length == 0) {
			throw 'BuildingUtils :: You try to get building but it doesnt exist. Use isBuildingModelExist(name:String):Bool';
		}

		return buildingsModel;
	}

	/**
	 * Return house count
     **/
	public static function getTotalHouse():Int {
		if (isBuildingModelExist(BuildingNames.HOUSE)) {
			return getBuildingsModel(BuildingNames.HOUSE).length;
		} else {
			return 0;
		}
	}

	/**
	 * Remove component of component list and return it
	 * @param Array<String> old component list
	 * @param String name of component to remove
	 * @return Array<String> new component list
	 **/
	public static function removeActionComponent(components:Array<String>, componentToRemove:String):Array<String> {
		var newComponents:Array<String> = new Array();

		for (component in components) {
			if (component != componentToRemove) {
				newComponents.push(component);
			}
		}

		return newComponents;
	}
}