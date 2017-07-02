package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.type.ModelElementNames;
import pathfinder.IMap;
import pixi.core.math.Point;

/**
 * ...
 * @author Thorcal	
 */
class Maps implements IMap
{
    public var rows( default, null ):Int;
    public var cols( default, null ):Int;

    public function new( p_cols:Int, p_rows:Int )
    {
        cols = p_cols;
        rows = p_rows;
        // create an array of tiles, and determine if they are walkable or obstructed
    }

    public function isWalkable( p_x:Int, p_y:Int ):Bool
    {
		return true;
    }
}