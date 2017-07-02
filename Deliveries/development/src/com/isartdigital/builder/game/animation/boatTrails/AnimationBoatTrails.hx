package com.isartdigital.builder.game.animation.boatTrails;

import haxe.Timer;
import pixi.core.display.Container;
import pixi.core.math.Point;
import com.isartdigital.utils.game.StateGraphic;

@:access(com.isartdigital.builder.game.animation.boatTrails.AnimationBoatTrailsBuilder)
class AnimationBoatTrails {
	private static inline var ANIMATION_BASE_DURATION:Int = 850;
	private static inline var ANIMATION_SPEED_COEF:Float = 0.5;

	private var boatTrails:StateGraphic;
	private var position:Point;
	private var trailsAlpha:Float;
	private var container:Container;

	public function new(animationBoatTrailsBuilder:AnimationBoatTrailsBuilder) {
		this.position = animationBoatTrailsBuilder.position;
		this.trailsAlpha = animationBoatTrailsBuilder.trailsAlpha;
		this.container = animationBoatTrailsBuilder.container;

		createTrails();
	}

	public function createTrails():Void {
		var animationDuraiton:Float = (ANIMATION_BASE_DURATION / ANIMATION_SPEED_COEF);
		boatTrails = new StateGraphic(AnimationNames.BOAT_TRAILS);
		boatTrails.position = position;
		boatTrails.position.x -= 25;
		boatTrails.alpha = trailsAlpha;
		boatTrails.scale = new Point(0.5, 0.5);
		boatTrails.getFlumpMovie().animationSpeed = ANIMATION_SPEED_COEF;
		container.addChild(boatTrails);
		Timer.delay(destroy, Std.int(animationDuraiton));
	}

	public function destroy():Void {
		container.removeChild(boatTrails);
		boatTrails.destroy();
		boatTrails = null;
	}
}
