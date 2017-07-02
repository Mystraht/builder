package com.isartdigital.builder.game.animation.fireworks;

import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import Math;
import Math;
import haxe.Timer;
import com.isartdigital.utils.game.StateGraphic;
import pixi.core.math.Point;
import pixi.core.display.Container;

@:access(com.isartdigital.builder.game.animation.fireworks.AnimationFireworksBuilder)
class AnimationFireworks {
	private static inline var ANIMATION_TOTAL_DURATION_A:Int = 1300;
	private static inline var ANIMATION_TOTAL_DURATION_B:Int = 1300;
	private static inline var FIREWORKS_SHOT_DURATION:Int = 500;
	private static inline var DURATION_TO_WAIT_AFTER_SHOT_EXPLODE:Int = 0;
	private static inline var VERTICAL_SHOT_OFFSET:Int = 400;

	private var fireworksShot:StateGraphic;
	private var fireworks:StateGraphic;
	private var name:String;
	private var shotAnimation:Bool;
	private var position:Point;
	private var container:Container;

	public static var availableFireworks:Array<String> = [AnimationNames.FIREWORKS_A, AnimationNames.FIREWORKS_B];

	public function new(fireworskBuilder:AnimationFireworksBuilder) {
		this.name = fireworskBuilder.name;
		this.position = fireworskBuilder.position;
		this.container = fireworskBuilder.container;
		this.shotAnimation = fireworskBuilder.shotAnimation;

		createFireworks();
		if (name == AnimationNames.FIREWORKS_A) {
			Timer.delay(destroy, ANIMATION_TOTAL_DURATION_A);
		}
		if (name == AnimationNames.FIREWORKS_B) {
			Timer.delay(destroy, ANIMATION_TOTAL_DURATION_B);
		}
	}

	public static function getRandomFireworks():String {
		return availableFireworks[Math.floor(Math.random() * availableFireworks.length)];
	}

	private function createFireworks():Void {
		if (shotAnimation) {
			createFireworksShotGraphic();
			Timer.delay(createFireworksGraphic, FIREWORKS_SHOT_DURATION + DURATION_TO_WAIT_AFTER_SHOT_EXPLODE);
		} else {
			createFireworksGraphic();
		}
	}

	private function createFireworksShotGraphic():Void {
		fireworksShot = new StateGraphic(AnimationNames.FIREWORKS_SHOT);
		fireworksShot.position.set(position.x, position.y + VERTICAL_SHOT_OFFSET);
		container.addChild(fireworksShot);
		Timer.delay(destroyShot, FIREWORKS_SHOT_DURATION);
	}

	private function createFireworksGraphic():Void {
		fireworks = new StateGraphic(name);
		if (name == AnimationNames.FIREWORKS_A) {
			SoundManager.playSFX(SoundNames.FIREWORKS_1);
			var scale:Float = 2.7 + Math.random() * 0.7;
			fireworks.getFlumpMovie().scale = new Point(scale, scale);
			fireworks.getFlumpMovie().animationSpeed = 0.5;
		}
		if (name == AnimationNames.FIREWORKS_B) {
			SoundManager.playSFX(SoundNames.FIREWORKS_2);
			var scale:Float = 1.7 + Math.random() * 0.7;
			fireworks.getFlumpMovie().scale = new Point(scale, scale);
			fireworks.getFlumpMovie().animationSpeed = 0.5;
		}
		fireworks.position.set(position.x, position.y);
		container.addChild(fireworks);
	}

	private function destroyShot():Void {
		if (shotAnimation) {
			container.removeChild(fireworksShot);
			fireworksShot.destroy();
		}
	}

	private function destroy():Void {
		container.removeChild(fireworks);
		fireworks.destroy();
	}
}
