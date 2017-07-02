package com.isartdigital.builder.game.animation.paper;

import com.isartdigital.builder.game.animation.boatTrails.AnimationBoatTrailsBuilder;
import com.isartdigital.utils.game.StateGraphic;
import motion.Actuate;
import motion.easing.Cubic;
import motion.easing.Expo;
import pixi.core.display.Container;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
@:access(com.isartdigital.builder.game.animation.paper.AnimationPaperBuilder)
class AnimationPaper
{
	private static inline var ANGLE_BETWEEN_PAPER:Float = 20;
	
	private static inline var PAPER_PER_LINE:Float = 30;
	private static inline var FALL_TIME_LINE:Float = 5;
	
	private var fallTimeCirclePapers:Float = 10;
	
	private var papers:Array<StateGraphic> = new Array<StateGraphic> ();
	
	private var position:Point;
	private var container:Container;
	private var radius:Float;
	
	public function new(animationPaperBuilder:AnimationPaperBuilder) 
	{		
		this.container = animationPaperBuilder.container;
		this.radius = animationPaperBuilder.radius;
		this.position = new Point();
		this.position.set(animationPaperBuilder.position.x - radius / 2, 
			animationPaperBuilder.position.y - radius / 2);
		
		this.fallTimeCirclePapers = 10 / animationPaperBuilder.speed;	
		
		if (animationPaperBuilder.pattern == PaperPattern.CIRCLE) {
			createCircleOfPapers();
			startCircleAnimPaper();
		} else if (animationPaperBuilder.pattern == PaperPattern.LINE) {
			createLineOfPapers();
			startLineAnimPaper();
		}
	}
	
	private function startLineAnimPaper () : Void {
		for (paper in papers) {
			Actuate.tween(paper, fallTimeCirclePapers, { x : paper.x + Math.random() * paper.width * 5} ).ease(Cubic.easeOut);
			Actuate.tween(paper, FALL_TIME_LINE, { rotation : 360 } ).ease(Cubic.easeOut);
			Actuate.tween(paper, FALL_TIME_LINE, { y : container.height } ).ease(Cubic.easeOut).onComplete(destroyPaper, [paper]);
		}
	}
	
	private function createLineOfPapers () : Void {
		var deltaX:Float = container.width / PAPER_PER_LINE;
		for ( i in 0...PAPER_PER_LINE) {
			var paper:StateGraphic = new StateGraphic(AnimationNames.PINATA_PAPER);
			container.addChild(paper);
			paper.position.set(position.x + i * deltaX, position.y);
			paper.getFlumpMovie().gotoAndStop(Math.ceil(Math.random() * paper.getFlumpMovie().totalFrames));			
			papers.push(paper);
		}
	}
	
	private function startCircleAnimPaper () : Void {
		for (paper in papers) {
			Actuate.tween(paper, fallTimeCirclePapers, { x : getXEndPosition(paper) } ).ease(Cubic.easeOut);
			Actuate.tween(paper, fallTimeCirclePapers, { y : container.height } ).ease(Cubic.easeOut).onComplete(destroyPaper, [paper]);
		}
	}
	
	private function getXEndPosition (paper:StateGraphic) : Float {
		var direction:Float = paper.x < 0 ? -1 : 1;
		return paper.parent.width / Math.ceil(Math.random() * 10) * direction;
	}
	
	private function destroyPaper (paper:StateGraphic) : Void {
		paper.parent.removeChild(paper);
		papers.splice(papers.indexOf(paper), 1);
		paper.destroy();
	}
	
	private function createCircleOfPapers () : Void {
		var numberOfPaper:Float = 360 / ANGLE_BETWEEN_PAPER;
		for ( i in 0...Std.int(numberOfPaper)) {
			var paper:StateGraphic = new StateGraphic(AnimationNames.PINATA_PAPER);
			container.addChild(paper);
			paper.position.set(position.x + getPositionInTheCircle(radius, i * ANGLE_BETWEEN_PAPER).x
							, position.y + getPositionInTheCircle(radius, i * ANGLE_BETWEEN_PAPER).y);
							
			paper.getFlumpMovie().gotoAndStop(Math.ceil(Math.random() * paper.getFlumpMovie().totalFrames));
							
			papers.push(paper);
		}
	}
	
	private function getPositionInTheCircle (radius:Float, angle:Float) : Point {
		var position:Point = new Point(); 
		position.x =(radius/2)+(radius/2)*Math.cos(angle);
		position.y = (radius / 2) + (radius / 2) * Math.sin(angle);
		return position;
	}
	
}