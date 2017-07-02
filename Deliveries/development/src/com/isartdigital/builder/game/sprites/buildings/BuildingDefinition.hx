package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;

/**
 * Component du building
 * @author Dorian MILLIERE
 */
class BuildingDefinition
{
	private static var definitionName:String;
	
	public function new() 
	{
		
	}
	
	/**
	 * Récupère la définition du building dans le json (spriteName, size..) grâce à son nom
	 * @param	name
	 * @return
	 */
	public static function getByName(name:String):BuildingDef {
		var buildingDefinitions:Array<BuildingDef>;
		setDefinitionName(name);
		buildingDefinitions = getTypedBuildingDefinitions();
		return getBuildingDefinitionInto(buildingDefinitions);
	}
	
	/**
	 * Récupère l'état d'un building dans la map global
	 * @param	position
	 * @return
	 */
	public static function getBuildingModelInGlobalMapAt(position:Point):BuildingModelDef {
		return GMap.getElementByTypeAt(position, ModelElementNames.BUILDING);
	}
	
	private static function setDefinitionName(pDefinitionName:String):Void {
		definitionName = pDefinitionName;
	}
	
	private static function getTypedBuildingDefinitions():Array<BuildingDef> {
		return cast(GameLoader.getContent(JsonNames.BUILDINGS_DEFINITION));
	}
	
	private static function getBuildingDefinitionInto(buildingDefinitions:Array<BuildingDef>):BuildingDef {
		for (i in 0...buildingDefinitions.length) {
			if (buildingDefinitions[i].name == definitionName) {
				
				return buildingDefinitions[i];
			}
		}
		
		throw 'Definition not found in json';
	}
}