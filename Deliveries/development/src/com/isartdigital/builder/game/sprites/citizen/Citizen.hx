package com.isartdigital.builder.game.sprites.citizen;

import Math;
import com.isartdigital.utils.Debug;
import Std;
import haxe.Timer;
import com.isartdigital.builder.game.animation.boatTrails.AnimationBoatTrailsBuilder;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.lib.pathfinder.Pathfinder;
import com.isartdigital.utils.lib.pathfinder.EHeuristic;
import com.isartdigital.utils.lib.pathfinder.Coordinate;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.animation.fireworks.AnimationFireworks;
import com.isartdigital.builder.game.animation.fireworks.AnimationFireworksBuilder;
import com.isartdigital.utils.game.GameStage;
import pixi.core.math.Point;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.builder.game.manager.Maps;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.MathUtils;
import motion.easing.Cubic;
import motion.Actuate;
import motion.actuators.GenericActuator;
import motion.easing.Linear;
import motion.easing.Quad;
import pixi.display.FlumpMovie;

/**
 * ...
 * @author Thorcal
 */
class Citizen extends StateGraphic implements IZSortable {
	private static inline var TRAILS_FREQUENCY:Float = 500;
	private static inline var TIME_TO_RUN_THOUGH_100_PIXEL_FOR_PASSIVE_CITIZEN:Float = 1;
	private static inline var PIXEL_100:Float = 100;
	private static inline var TIME_MULTIPLICATOR_FOR_EASING:Float = 3;
	private static inline var TIME_TO_APPEAR:Float = 3;
	private static inline var TIME_TO_DISAPPEAR:Float = 5;
	private static inline var TIME_TO_GET_FULL_ALPHA:Float = 0.25;
	private static inline var ALPHA_TO_REACH_WHEN_APPEAR:Float = 0.75;
	
	private static inline var WIDTH_FOR_TOP_LEFT_ORIANTATION:Int = 3;
	private static inline var HEIGHT_FOR_TOP_LEFT_ORIANTATION:Int = 1;
	
	private static inline var WIDTH_FOR_TOP_RIGHT_ORIANTATION:Int = 1;
	private static inline var HEIGHT_FOR_TOP_RIGHT_ORIANTATION:Int = 3;
	private static inline var TIME_TO_SHOW_OR_HIDE_PASSIVE_CITIZEN:Int = 2;
	private static inline var CHANCE_TO_LAUNCH_FIREWORKS_AFTER_CHANGING_DIRECTION:Float = 0.05;

	private var trailsActivated:Bool= true;
	private var timeToRunThough100Pixel:Float = 0.25;
	private var pathToFollow:Array<Point> = new Array<Point>();
	private var isCurrentlyMoving:Bool = false;
	private var nextPositionToReach:Point = null;
	private var isPassiveCitizen:Bool = false;

	public static inline var HEAD_OF_PARADE_ASSET_NAME:String = "CitizenA";
	public static var assetNameList:Array<String> = ["CitizenB", "CitizenC", "CitizenD", "CitizenE", "CitizenF"];
	public static var list:Array<Citizen> = new Array<Citizen>();
	public static var passiveCitizens:Array<Citizen> = new Array<Citizen>();
	
	public var modelWidth:Int = 1;
	public var modelHeight:Int = 1;

	public function new(?assetName:String = null, isPassiveCitizen = false)
	{
		super();
		factory = new FlumpMovieAnimFactory();
		this.isPassiveCitizen = isPassiveCitizen;
		
		if (assetName == null) this.assetName = getRandomAssetName();
		else this.assetName = assetName;
		
		setState(DEFAULT_STATE);
		boxType = BoxType.NONE;

		list.push(this);

		alpha = 0;

		if (!isPassiveCitizen) {
			Actuate.tween(this, TIME_TO_APPEAR, { alpha : ALPHA_TO_REACH_WHEN_APPEAR } ).ease(Linear.easeNone);
		}

		createTrails();
	}


	public static function hideAllPassiveCitizens():Void {
		toggleAllPassiveCitizensVisibility(false);
	}

	public static function showAllPassiveCitizens():Void {
		toggleAllPassiveCitizensVisibility(true);
	}

	public static function toggleAllPassiveCitizensVisibility(show:Bool):Void {
		for (passiveCitizen in passiveCitizens) {
			Actuate.tween(passiveCitizen, TIME_TO_SHOW_OR_HIDE_PASSIVE_CITIZEN, { alpha : show ? 1 : 0}).ease(Cubic.easeInOut);
		}
	}

	public static function reInitAllPassiveCitizenPath():Void {
		for (i in 0...passiveCitizens.length) {
			passiveCitizens[i].setPath(GMap.getRandomAvailablePosition());
		}
	}

	public static function createCitizenAtRandomPosition():Void {
		var citizen = new Citizen(null, true);
		citizen.position = IsoManager.modelToIsoView(GMap.getRandomAvailablePosition());
		citizen.setPath(GMap.getRandomAvailablePosition());
		citizen.setNewTimeToRunThough100Pixel(TIME_TO_RUN_THOUGH_100_PIXEL_FOR_PASSIVE_CITIZEN);
		citizen.start();
		GameStage.getInstance().getBuildingsContainer().addChild(citizen);
		passiveCitizens.push(citizen);
	}

	public function setNewTimeToRunThough100Pixel(value:Float):Void {
		timeToRunThough100Pixel = value;
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
		var isDiagonalEnable:Bool = true;
		var isMapDynamic:Bool = true;

		var path:Array<Coordinate> = pathfinder.createPath(startCoordinate, targetCoordinate, methodType, isDiagonalEnable, isMapDynamic);

		if (path != null) {
			refreshPathToFollow(path);
		}
	}
	
	public function getPathToFollow () : Array<Point> {
		return pathToFollow;
	}
	
	private function refreshPathToFollow (path:Array<Coordinate>) : Void {
		pathToFollow = new Array<Point> ();

		for (i in 1...path.length) {
			var pathPositionInIso:Point = IsoManager.modelToIsoView(new Point (path[i].x, path[i].y));
			pathToFollow.push(pathPositionInIso);
		}

		if (isCurrentlyMoving == false) move(true);
	}

	private function move (?accelerate = false) : Void {
		if (this == null) return;
		if (pathToFollow.length == 0) {
			isCurrentlyMoving = false;
			if (isPassiveCitizen) {
				setPath(GMap.getRandomAvailablePosition());
			}
			return;
		}

		if (isPassiveCitizen && Math.random() < CHANCE_TO_LAUNCH_FIREWORKS_AFTER_CHANGING_DIRECTION) {
			var fireworksPosition:Point = IsoManager.modelToIsoView(getPositionInModel());
			var verticalOffset:Int = 500;
			fireworksPosition.y -= verticalOffset;
			AnimationFireworksBuilder.create()
								 	 .withFireworksName(AnimationFireworks.getRandomFireworks())
									 .withShotAnimation(true)
									 .withContainer(GameStage.getInstance().getFireworksContainer())
									 .withPosition(fireworksPosition)
									 .build();
		}

		isCurrentlyMoving = true;

		nextPositionToReach = pathToFollow.shift();

		changeOrientation();
		changeModelSize();

		if (accelerate) Actuate.tween(position, getTimeToReachNextPosition() * TIME_MULTIPLICATOR_FOR_EASING , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Quad.easeIn).onUpdate(onMoveUpdate, []).onComplete(move, []);
		else if (pathToFollow.length == 0) Actuate.tween(position, getTimeToReachNextPosition() * TIME_MULTIPLICATOR_FOR_EASING , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Quad.easeOut).onUpdate(onMoveUpdate, []).onComplete(move, []);
		else Actuate.tween(position, getTimeToReachNextPosition() , { x : nextPositionToReach.x, y : nextPositionToReach.y } ).ease(Linear.easeNone).onUpdate(onMoveUpdate, []).onComplete(move, []);
	}
	
	private function changeModelSize () : Void {
		if (scale.x > 0 && getFlumpMovie().currentFrame == 0
			|| scale.x < 0 && getFlumpMovie().currentFrame == 1) {
				modelWidth = WIDTH_FOR_TOP_RIGHT_ORIANTATION;
				modelHeight = HEIGHT_FOR_TOP_RIGHT_ORIANTATION;
			} else if (scale.x > 0 && getFlumpMovie().currentFrame == 1
			|| scale.x < 0 && getFlumpMovie().currentFrame == 0) {
				modelWidth = WIDTH_FOR_TOP_LEFT_ORIANTATION;
				modelHeight = HEIGHT_FOR_TOP_LEFT_ORIANTATION;
			}
	}
	
	private function onMoveUpdate () : Void {
		if (this != null) return;
		Actuate.stop(position, ["x", "y"], false, false);
	}

	private function getTimeToReachNextPosition () : Float {
		return MathUtils.getDistance(position, nextPositionToReach) / PIXEL_100 * timeToRunThough100Pixel;
	}

	private function changeOrientation () : Void {
		var direction:String = getCurrentDirection();

		if (direction == CitizenDirections.RIGHT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_TOP_LEFT);
			scale.x = 1;
		}
		else if (direction == CitizenDirections.TOP) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_BOT_LEFT);
			scale.x = 1;
		}
		else if (direction == CitizenDirections.BOT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_TOP_LEFT);
			scale.x = -1;
		}
		else if (direction == CitizenDirections.LEFT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_BOT_LEFT);
			scale.x = -1;
		}
		else if (direction == CitizenDirections.TOP_LEFT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_BOT);
			scale.x = 1;
		}
		else if (direction == CitizenDirections.TOP_RIGHT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_LEFT);
			scale.x = -1;
		}
		else if (direction == CitizenDirections.BOT_LEFT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_LEFT);
			scale.x = 1;
		}
		else if (direction == CitizenDirections.BOT_RIGHT) {
			cast(anim, FlumpMovie).gotoAndStop(CitizenDirections.FRAMES_TOP);
			scale.x = 1;
		}
	}

	private function getCurrentDirection() : String {
		var positionModel:Point = IsoManager.isoToModelView(position);
		var nextPositionModel:Point = IsoManager.isoToModelView(nextPositionToReach);
		var direction:Point = new Point(
			positionModel.x - nextPositionModel.x,
			positionModel.y - nextPositionModel.y
		);
		var directionLength:Float = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
		direction.set(
			direction.x / directionLength,
			direction.y / directionLength
		);
		direction.x *= 10;
		direction.y *= 10;
		direction.set(Math.round(direction.x), Math.round(direction.y));
		direction.x /= 10;
		direction.y /= 10;

		if (isDirectionEqual(direction, new Point(-1, 0))) return CitizenDirections.LEFT;
		if (isDirectionEqual(direction, new Point(1, 0))) return CitizenDirections.RIGHT;
		if (isDirectionEqual(direction, new Point(0, -1))) return CitizenDirections.TOP;
		if (isDirectionEqual(direction, new Point(0, 1))) return CitizenDirections.BOT;
		if (isDirectionEqual(direction, new Point(0.7, -0.7))) return CitizenDirections.TOP_RIGHT;
		if (isDirectionEqual(direction, new Point(-0.7, -0.7))) return CitizenDirections.TOP_LEFT;
		if (isDirectionEqual(direction, new Point(0.7, 0.7))) return CitizenDirections.BOT_RIGHT;
		if (isDirectionEqual(direction, new Point(-0.7, 0.7))) return CitizenDirections.BOT_LEFT;
		throw 'citizen getCurrentDirection : incorrect direction : ' + direction;
	}

	private function isDirectionEqual(direction:Point, sourceToTest:Point):Bool {
		return (
			direction.x == sourceToTest.x &&
			direction.y == sourceToTest.y
		);
	}

	public function disappear() : Void {
		setPath(new Point(getPositionInModel().x, 0));
		Actuate.tween(this, TIME_TO_DISAPPEAR, { alpha : 0 } ).ease(Linear.easeNone).onComplete(destroy);
	}

	private function createTrails():Void {
		if (trailsActivated) {
			AnimationBoatTrailsBuilder.create()
									  .withPosition(new Point(x, y))
									  .withAlpha(alpha)
									  .withContainer(GameStage.getInstance().getBoatTrailsContainer())
									  .build();
			Timer.delay(createTrails, Std.int(TRAILS_FREQUENCY * timeToRunThough100Pixel));
		}
	}
	
	override public function destroy():Void {
		trailsActivated = false;
		Actuate.stop(position, ["x", "y"], false, false);
		parent.removeChild(this);
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
}