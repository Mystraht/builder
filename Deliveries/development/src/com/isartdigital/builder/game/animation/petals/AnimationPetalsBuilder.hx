package com.isartdigital.builder.game.animation.petals;
import pixi.core.display.Container;
import pixi.core.math.Point;


class AnimationPetalsBuilder {
	private var position:Point;
	private var petalsDelay:Float;
	private var container:Container;

	public function new() {

	}

	public static function create():AnimationPetalsBuilder {
		return new AnimationPetalsBuilder();
	}

	public function withPosition(position:Point):AnimationPetalsBuilder {
		this.position = position;
		return this;
	}

	public function withMaxPetalDelay(delay:Float):AnimationPetalsBuilder {
		this.petalsDelay = delay;
		return this;
	}

	public function withContainer(container:Container):AnimationPetalsBuilder {
		this.container = container;
		return this;
	}

	public function build():AnimationPetals {
		return new AnimationPetals(this);
	}
}
