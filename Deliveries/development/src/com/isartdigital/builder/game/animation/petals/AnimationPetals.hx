package com.isartdigital.builder.game.animation.petals;


import com.isartdigital.builder.game.sprites.buildings.BuildingHarvester;
import Std;
import Math;
import haxe.Timer;
import motion.easing.Cubic;
import motion.Actuate;
import com.isartdigital.utils.game.StateGraphic;
import pixi.core.display.Container;
import pixi.core.math.Point;


@:access(com.isartdigital.builder.game.animation.petals.AnimationPetalsBuilder)
class AnimationPetals {
	private static inline var PETALS_ANIMATION_DURATION:Int = 1600;

	private var petals:StateGraphic;
	private var position:Point;
	private var petalsDelay:Float;
	private var container:Container;

	public function new(animationPetalsBuilder:AnimationPetalsBuilder) {
		this.position = animationPetalsBuilder.position;
		this.petalsDelay = animationPetalsBuilder.petalsDelay;
		this.container = animationPetalsBuilder.container;

		Timer.delay(createPetals, Std.int(Math.random() * petalsDelay));
	}

	public function createPetals():Void {
		petals = new StateGraphic(AnimationNames.PETALS);
		petals.position = position;
		petals.position.x -= petals.width * 2;
		petals.position.y -= petals.height * 2;
		container.addChild(petals);
		Actuate.tween(petals, PETALS_ANIMATION_DURATION / 1000, { alpha: 0 }).ease(Cubic.easeIn);
		Timer.delay(destroy, PETALS_ANIMATION_DURATION);
	}

	public function destroy():Void {
		container.removeChild(petals);
		petals.destroy();
		petals = null;
	}
}
