package com.isartdigital.builder.game.sprites.buildings.utils;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.loader.GameLoader;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingDefinition
{
	private static inline var BUILDING_JSON_PATH:String = "json/building.json";
	private static var definitionName:String;
	
	public function new() 
	{
		
	}
	
	
	public static function getByName(name:String):BuildingDef {
		var buildingDefinitions:Array<BuildingDef>;
		setDefinitionName(name);
		buildingDefinitions = getTypedBuildingDefinitions();
		return getBuildingDefinitionInto(buildingDefinitions);
	}
	
	private static function setDefinitionName(pDefinitionName:String):Void {
		definitionName = pDefinitionName;
	}
	
	private static function getTypedBuildingDefinitions():Array<BuildingDef> {
		return cast(GameLoader.getContent(BUILDING_JSON_PATH));
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