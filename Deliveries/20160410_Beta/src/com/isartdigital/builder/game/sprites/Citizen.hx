package com.isartdigital.builder.game.sprites;

import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.manager.Maps;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.ui.popin.ParadeReward;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.MathUtils;
import js.Browser;
import motion.Actuate;
import motion.actuators.GenericActuator;
import motion.easing.Elastic;
import motion.easing.Expo;
import motion.easing.Linear;
import motion.easing.Quad;
import motion.easing.Sine;
import pathfinder.Coordinate;
import pathfinder.EHeuristic;
import pathfinder.Pathfinder;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;
import pixi.display.FlumpMovie;
import pixi.extras.MovieClip;

/**
 * ...
 * @author Thorcal
 */
class Citizen extends StateGraphic
{
	public static inline var HEAD_OF_PARADE_ASSET_NAME:String = "CitizenB";
	public static var assetNameList:Array<String> = ["CitizenB", "CitizenC", "CitizenD", "CitizenE"];
	
	private static inline var TIME_TO_RUN_THROUGH_100_PIXEL:Float = 0.25;
	private static inline var PIXEL_100:Float = 100;
	private static inline var TIME_MULTIPLICATOR_FOR_EASING:Float = 3;
	
	private static inline var TIME_TO_APPEAR:Float = 3;
	private static inline var TIME_TO_DISAPPEAR:Float = 5;
	private static inline var TIME_TO_GET_FULL_ALPHA:Float = 0.25;
	private static inline var ALPHA_TO_REACH_WHEN_APPEAR:Float = 0.75;
	
	
	public static var list:Array<Citizen> = new Array<Citizen>();

	private var pathToFollow:Array<Point> = new Array<Point>();

	private var isCurrentlyMoving:Bool = false;

	private var nextPositionToReach:Point = null;

	public function new(?assetName:String = null)
	{
		super();
		factory = new FlumpMovieAnimFactory();
		
		if (assetName == null) this.assetName = getRandomAssetName();
		else this.assetName = assetName;
		
		setState(DEFAULT_STATE);
		boxType = BoxType.NONE;

		list.push(this);

		alpha = 0;
		
		Actuate.tween(this, TIME_TO_APPEAR, { alpha : ALPHA_TO_REACH_WHEN_APPEAR } ).ease(Linear.easeNone);
	}
	
	public function getRandomAssetName () : String {
		return assetNameList[Math.floor(Math.random() * assetNameList.length)];
	}

	public function setNoTransparency () : Void {
		Actuate.tween(this, TIME_TO_GET_FULL_ALPHA, { alpha : 1 } ).ease(Linear.easeNone);
	}
	
	public function getPositionInModel () : Point {
		if (nextPositionToReach != null) return IsoManager.isoToModelView(nextPositionToReach);
		return  IsoManager.isoToModelView(position);
	}
	
	public function hasReachEndPositionOfPath () : Bool {
		return pathToFollow.length == 0;
	}

	public function setPath(targetDestination:Point):Void {
		var map:Maps = new Maps(100, 100);
		var pathfinder:Pathfinder = new Pathfinder(map);

		var startCoordinate:Coordinate = new Coordinate(Std.int(getPositionInModel().x), Std.int(getPositionInModel().y));
		var targetCoordinate:Coordinate = new Coordinate(Std.int(targetDestination.x), Std.int(targetDestination.y));

		var methodType:EHeuristic = EHeuristic.PRODUCT;
		var isDiagonalEnable:Bool = false;
		var isMapDynamic:Bool = false;

		var path:Array<Coordinate> = pathfinder.createPath(startCoordinate, targetCoordinate, methodType, isDiagonalEnable, isMapDynamic);
		
	
		if (path != null) refreshPathToFollow(path);
	}
	
	public function getPathToFollow () : Array<Point> {
		return pathToFollow;
	}
	
	private function refreshPathToFollow (path:Array<Coordinate>) : Void {
		pathToFollow = new Array<Point> ();

		for (i in 1...path.length)
		{
			var pathPositionInIso:Point = IsoManager.modelToIsoView(new Point (path[i].x, path[i].y));
			pathToFollow.push(pathPositionInIso);
		}

		if (isCurrentlyMoving == false) move(true);
	}

	private function move (?accelerate = false) : Void {
		if (this == null) return;
		if (pathToFollow.length == 0) {
			isCurrentlyMoving = false;
			return;
		}

		isCurrentlyMoving = true;
		nextPositionToReach = pathToFollow.shift();

		changeOrientation();

		if (accelerate) Actuate.tween(position, getTimeToReachNextPosition() * TIME_MULTIPLICATOR_FOR_EASING , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Quad.easeIn).onUpdate(onMoveUpdate, []).onComplete(move, []);
		else if (pathToFollow.length == 0) Actuate.tween(position, getTimeToReachNextPosition() * TIME_MULTIPLICATOR_FOR_EASING , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Quad.easeOut).onUpdate(onMoveUpdate, []).onComplete(move, []);
		else Actuate.tween(position, getTimeToReachNextPosition() , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Linear.easeNone).onUpdate(onMoveUpdate, []).onComplete(move, []);

	}
	
	private function onMoveUpdate () : Void {
		if (this != null) return;
		Actuate.stop(position, ["x", "y"], false, false);
	}

	private function getTimeToReachNextPosition () : Float {
		return MathUtils.getDistance(position, nextPositionToReach) / PIXEL_100 * TIME_TO_RUN_THROUGH_100_PIXEL;
	}

	private function changeOrientation () : Void {
		var direction:Point = getCurrentDirection();

		if (direction.x > 0 && direction.y > 0) {
			cast(anim, FlumpMovie).gotoAndStop(1);
			scale.x = 1;
		}
		else if (direction.x > 0 && direction.y < 0) {
			cast(anim, FlumpMovie).gotoAndStop(0);
			scale.x = 1;
		}
		else if (direction.x < 0  && direction.y > 0) {
			cast(anim, FlumpMovie).gotoAndStop(1);
			scale.x = -1;
		}
		else if (direction.x < 0 && direction.y < 0) {
			cast(anim, FlumpMovie).gotoAndStop(0);
			scale.x = -1;
		}
	}

	private function getCurrentDirection () : Point {
		return new Point(MathUtils.getSign(position.x - nextPositionToReach.x),
		MathUtils.getSign(position.y - nextPositionToReach.y));
	}

	public function disappear() : Void {
		setPath(new Point(getPositionInModel().x, 0));
		
		Actuate.tween(this, TIME_TO_DISAPPEAR, { alpha : 0 } ).ease(Linear.easeNone).onComplete(destroy);
	}
	
	override public function destroy():Void
	{
		Actuate.stop(position, ["x", "y"], false, false);
		parent.removeChild(this);
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
}