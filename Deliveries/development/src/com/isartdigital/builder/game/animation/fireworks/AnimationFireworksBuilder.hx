package com.isartdigital.builder.game.animation.fireworks;

import pixi.core.math.Point;
import pixi.core.display.Container;

class AnimationFireworksBuilder {
	private var name:String;
	private var shotAnimation:Bool;
	private var position:Point;
	private var container:Container;

	public function new() {
	}

	public static function create():AnimationFireworksBuilder {
		return new AnimationFireworksBuilder();
	}

	public function withFireworksName(name:String):AnimationFireworksBuilder {
		this.name = name;
		return this;
	}

	public function withShotAnimation(shotAnimation:Bool):AnimationFireworksBuilder {
		this.shotAnimation = shotAnimation;
		return this;
	}

	public function withPosition(position:Point):AnimationFireworksBuilder {
		this.position = position;
		return this;
	}

	public function withContainer(container:Container):AnimationFireworksBuilder {
		this.container = container;
		return this;
	}

	public function build():AnimationFireworks {
		if (name == null ||
			shotAnimation == null ||
			position == null ||
			container == null
		) {
			throw 'AnimationFireworksBuilder : Parameters missing';
		}
		return new AnimationFireworks(this);
	}
}
