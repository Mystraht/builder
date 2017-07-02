package com.isartdigital.builder.game.sprites.buildings;
import com.isartdigital.builder.game.def.TileModelDef;

/**
 * Component du building
 * @author Dorian MILLIERE
 */
class BuildingTile
{
	private var building:Building;
	
	public function new(building:Building) 
	{
		this.building = building;
	}
	
	/**
	 * permet de mettre les tiles en dessous du buiolding au status constructible
	 */
	public function setTileUnderBuildingBuildable():Void {
		changeTileUnderBuildingBuildableStateTo(true);
	}
	
	/**
	 * permet de mettre les tiles en dessous du buiolding au status constructible
	 */
	public function setTileUnderBuildingNotBuildable():Void {
		changeTileUnderBuildingBuildableStateTo(false);
	}
	
	private function changeTileUnderBuildingBuildableStateTo(buildableState:Bool):Void {
		var tilesUnderBuilding:Array<TileModelDef>;
		var positionToModel = building.positionToModel(true);
		
		tilesUnderBuilding = Tile.getTilesArray(positionToModel, building.definition.size);
		Tile.changeTilesBuildableState(tilesUnderBuilding, buildableState);
	}
}