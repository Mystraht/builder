package com.isartdigital.builder.game.sprites;

import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.Maps;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.StateGraphic;
import js.Browser;
import pathfinder.Coordinate;
import pathfinder.EHeuristic;
import pathfinder.Pathfinder;
import pixi.core.math.Point;
import pixi.extras.MovieClip;

/**
 * ...
 * @author Thorcal
 */
class Citizen extends StateGraphic
{
	public static var list:Array<Citizen> = new Array<Citizen>();
	public var posInModel:Point;
	private var listPos:Array<Point> = new Array<Point>();
	private var nextPosModel:Point = new Point();
	private var nextPosIso:Point = new Point();
	private var speed:Point = new Point(2,1);
	
	public function new() 
	{
		super();
		
		factory = new FlumpMovieAnimFactory();
		assetName = "Building_1x1"; 
		setState(DEFAULT_STATE);
		boxType = BoxType.NONE;
		list.push(this);
		posInModel = IsoManager.isoViewToModel(position);
		startPathfinder();
		setNextPos();
	}
	
	private function startPathfinder():Void {
		var l_map = new Maps(30, 30); // Create a 30x30 map
		var l_pathfinder = new Pathfinder(l_map); // Create a Pathfinder engine configured for our map
		var l_startNode = new Coordinate(Std.int(posInModel.x), Std.int(posInModel.y)); //  The starting node
		var l_destinationNode = new Coordinate(2, 7); // The destination node
		var l_heuristicType = EHeuristic.PRODUCT; // The method of A Star used
		var l_isDiagonalEnabled = false; // Set to true to ensure only up, left, down, right movements are allowed
		var l_isMapDynamic = false; // Set to true to force fresh lookups from IMap.isWalkable() for each node's isWalkable property (e.g. for a dynamically changing map)
		var l_path = l_pathfinder.createPath(l_startNode, l_destinationNode, l_heuristicType, l_isDiagonalEnabled, l_isMapDynamic);
		
		for (i in 0...l_path.length)
		{
			listPos.push(new Point(l_path[i].x, l_path[i].y));
		}
	}
	
	override function doActionNormal():Void 
	{
		super.doActionNormal();
		//trace (listPos);
		moveTo();
	}
	
	/**
	 * Récupere le prochain point du model à atteindre dans listPos
	 */
	
	private function setNextPos():Void {
		if (listPos.length != 0) {
			nextPosModel = listPos.shift();
			nextPosIso = IsoManager.modelToIsoView(nextPosModel);
		}
	}
	
	/**
	 * Bouge le sprite vers une coordonnée du model grace à setNextPos
	 */
	public function moveTo():Void {
		if (position.x < nextPosIso.x) {
			position.x += speed.x;
		}else if (position.x > nextPosIso.x) {
			position.x -= speed.x;
		}
		if (position.y < nextPosIso.y) {
			position.y += speed.y;
		}else if (position.y > nextPosIso.y) {
			position.y -= speed.y;
		}
		if (position.x == nextPosIso.x && position.y == nextPosIso.y) {
			setNextPos();
		}
	}
	
	override public function destroy():Void 
	{
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
}