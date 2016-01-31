package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian
 */
class BuildingConstructor
{
	private var building:Building;
	private var initialeModelPosition:Point;
	
	public function new(building:Building, initialeModelPosition:Point) 
	{
		this.building = building;
		this.initialeModelPosition = initialeModelPosition;
	}
	
	/**
	 * Essaye de construire le building en dessous de la souris
	 * Ne ce construit pas si la construction n'est pas possible
	 */
	public function constructAtPosition(x:Float, y:Float):Void {
		var buildingPosition:Point = new Point(x, y);
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesOrigin:Array<TileSavedDef>;
		var tilesDest:Array<TileSavedDef>;
		var isBuildable:Bool;
		var elementsAtBuildingInitialePosition:Array<Dynamic>;
		var elementsAtBuildingPosition:Array<Dynamic>;
		var buildingSavedDef:BuildingSavedDef = TypeDefUtils.buildingSavedDef;
		
		buildingPosition.x = Math.round(buildingPosition.x);
		buildingPosition.y = Math.round(buildingPosition.y);
		
		tilesDest = lMapManager.getTilesArray(buildingPosition, building.definition.size);
		
		tilesOrigin = lMapManager.getTilesArray(initialeModelPosition, building.definition.size);
		
		lMapManager.setTilesBuildable(tilesOrigin, true);
		lMapManager.setTilesBuildable(tilesDest, false);
		
		elementsAtBuildingInitialePosition = lMapManager.globalMap[Std.int(initialeModelPosition.x)][Std.int(initialeModelPosition.y)];
		elementsAtBuildingPosition = lMapManager.globalMap[Std.int(buildingPosition.x)][Std.int(buildingPosition.y)];
		
		for (i in 0...elementsAtBuildingInitialePosition.length) {
			if (TypeDefUtils.compare(elementsAtBuildingInitialePosition[i], TypeDefUtils.buildingSavedDef)) {
				buildingSavedDef = elementsAtBuildingInitialePosition[i];
				elementsAtBuildingInitialePosition.splice(i, 1);
			}
		}
		
		elementsAtBuildingPosition.push(buildingSavedDef);
		
	}
	
	public function isConstructibleAtPosition(x:Float, y:Float):Bool {
		var buildingPosition:Point = new Point(x, y);
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesDest:Array<TileSavedDef>;
		
		buildingPosition.x = Math.round(buildingPosition.x);
		buildingPosition.y = Math.round(buildingPosition.y);
		
		tilesDest = lMapManager.getTilesArray(buildingPosition, building.definition.size);
		
		return lMapManager.isBuildable(tilesDest);
	}
}