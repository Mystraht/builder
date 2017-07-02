package com.isartdigital.builder.game.animation.paper;
import pixi.core.display.Container;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class AnimationPaperBuilder
{
	private var position:Point;
	private var container:Container;
	private var radius:Float;
	private var speed:Float;
	private var pattern:String;
	
	public function new() {

	}

	public static function create():AnimationPaperBuilder {
		return new AnimationPaperBuilder();
	}

	public function withPosition(position:Point):AnimationPaperBuilder {
		this.position = position;
		return this;
	}

	public function withContainer(container:Container):AnimationPaperBuilder {
		this.container = container;
		return this;
	}
	
	public function withRadius (radius:Float) : AnimationPaperBuilder {
		this.radius = radius;
		return this;
	}
	
	public function withSpeedRatio (speed:Float) : AnimationPaperBuilder {
		this.speed = speed;
		return this;
	}
	
	public function withPattern (pattern:String) : AnimationPaperBuilder {
		this.pattern = pattern;
		return this;
	}
	
	public function build():AnimationPaper {
		return new AnimationPaper(this);
	}
	
}