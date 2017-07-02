package com.isartdigital.builder.game.animation.fishs;

import pixi.core.display.Container;
import pixi.core.math.Point;
import com.isartdigital.utils.game.StateGraphic;

class AnimationFishBuilder {
	private var position:Point;
	private var container:Container;

	public function new() {

	}

	public static function create():AnimationFishBuilder {
		return new AnimationFishBuilder();
	}

	public function withPosition(position:Point):AnimationFishBuilder {
		this.position = position;
		return this;
	}

	public function withContainer(container:Container):AnimationFishBuilder {
		this.container = container;
		return this;
	}

	public function build():AnimationFish {
		return new AnimationFish(this);
	}
}


