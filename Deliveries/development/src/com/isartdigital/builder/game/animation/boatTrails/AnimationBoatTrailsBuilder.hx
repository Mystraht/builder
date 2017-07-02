package com.isartdigital.builder.game.animation.boatTrails;

import pixi.core.display.Container;
import pixi.core.math.Point;
import com.isartdigital.utils.game.StateGraphic;

class AnimationBoatTrailsBuilder {
	private var position:Point;
	private var trailsAlpha:Float;
	private var container:Container;

	public function new() {

	}

	public static function create():AnimationBoatTrailsBuilder {
		return new AnimationBoatTrailsBuilder();
	}

	public function withPosition(position:Point):AnimationBoatTrailsBuilder {
		this.position = position;
		return this;
	}

	public function withAlpha(alpha:Float):AnimationBoatTrailsBuilder {
		this.trailsAlpha = alpha;
		return this;
	}

	public function withContainer(container:Container):AnimationBoatTrailsBuilder {
		this.container = container;
		return this;
	}

	public function build():AnimationBoatTrails {
		return new AnimationBoatTrails(this);
	}
}


