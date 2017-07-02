package com.isartdigital.builder.game.ftue;
import haxe.Timer;
import com.isartdigital.utils.game.Camera;
import motion.Actuate;
import motion.easing.Cubic;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
//@:access(com.isartdigital.builder.game.sprites.buildings.Building)
class FtueCamera
{
	public static inline var MOVING_TIME:Int = 2;

	public function new() {}
	
	public static function moveCameraTo(target:String, timeBeforeMoving:Int) : Void {
		Timer.delay(function () {
			startMovingCameraTo(FtueUtils.getInstanceOf(target));
		}, timeBeforeMoving);
	}

	private static function startMovingCameraTo(target:DisplayObject) : Void {
		if (target == null) return;
		Actuate.tween(
			Camera.getInstance().cameraFocus.position,
			MOVING_TIME,
			{ x: target.x, y : target.y -target.getLocalBounds().height } 
		).ease(Cubic.easeInOut);
	}
	
}