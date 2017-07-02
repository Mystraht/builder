package com.isartdigital.builder.game.animation;

import pixi.display.FlumpMovie;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.builder.ui.hud.Hud;
import motion.easing.Quad;
import Math;
import haxe.Timer;
import pixi.core.display.Container;
import pixi.core.graphics.Graphics;
import motion.Actuate;

import pixi.core.math.Point;

@:access(com.isartdigital.builder.game.animation.AnimationHarvestBuilder)
class AnimationHarvest {
	private static inline var MINIMUM_COIN_SCALE:Float = 0.5;
	private static inline var SPACE_BETWEEN_CURVE_ANIMATION:Float = 15;

	private var startPosition:Void->Point;
	private var endPosition:Void->Point;
	private var coinToGenerateCount:Int;
	private var totalAnimationDuration:Float;
	private var callbackWhenCoinIsArrivedAtDestination:Void->Void;
	private var animationName:String;
	private var container:Container;

	private var coins:Array<StateGraphic> = new Array<StateGraphic>();


	private function new(animationHarvestBuilder:AnimationHarvestBuilder) {
		this.startPosition = animationHarvestBuilder.startPosition;
		this.endPosition = animationHarvestBuilder.endPosition;
		this.coinToGenerateCount = animationHarvestBuilder.coinToGenerateCount;
		this.totalAnimationDuration = animationHarvestBuilder.totalAnimationDuration;
		this.callbackWhenCoinIsArrivedAtDestination = animationHarvestBuilder.callbackWhenCoinIsArrivedAtDestination;
		this.animationName = animationHarvestBuilder.animationName;
		this.container = animationHarvestBuilder.container;
	}

	public function animate():Void {
		launchCoinAnimationSalve();
	}

	private function launchCoinAnimationSalve():Void {
		var inversedIndex:Float;
		var timeToWait:Int;

		for (i in 0...coinToGenerateCount) {
			timeToWait = Math.floor(Math.random() * (totalAnimationDuration * 1000 / 2) / 2);

			Timer.delay(function() {
				launchCoinAnimation();
			}, timeToWait);
		}
	}

	private function launchCoinAnimation():Void {
		var spaceCoef:Float = totalAnimationDuration / SPACE_BETWEEN_CURVE_ANIMATION;
		var animationDurationPerAxes:Point = new Point();
		var coin:StateGraphic = createCoin();
		var endPosition:Point = this.endPosition();
		var onCompleteCallbackByAxes:AxesCallback = {
			x: null,
			y: null
		}

		animationDurationPerAxes.x = (
			(totalAnimationDuration / 2 - spaceCoef) +
			(Math.random() * spaceCoef * 2)
		);

		animationDurationPerAxes.y =  totalAnimationDuration - animationDurationPerAxes.x;

		if (animationDurationPerAxes.x > animationDurationPerAxes.y) {
			onCompleteCallbackByAxes.x = onCoinArrivedAtDestination(coin);
		} else {
			onCompleteCallbackByAxes.y = onCoinArrivedAtDestination(coin);
		}

		Actuate.tween(coin, animationDurationPerAxes.x, { x : endPosition.x} )
		       .ease(Quad.easeInOut)
			   .onComplete(onCompleteCallbackByAxes.x);

		Actuate.tween(coin, animationDurationPerAxes.y, { y : endPosition.y} )
		       .ease(Quad.easeInOut)
		       .onComplete(onCompleteCallbackByAxes.y);
	}

	private function createCoin():StateGraphic {
		var coin:StateGraphic = new StateGraphic(animationName);
		var startPosition:Point = this.startPosition();
		var coinScale:Float = MINIMUM_COIN_SCALE + (Math.random() * (1 - MINIMUM_COIN_SCALE));
		container.addChild(coin);

		coin.scale = new Point(coinScale, coinScale);
		cast(coin.getAnim(), FlumpMovie).animationSpeed = 2;

		coin.position.set(startPosition.x, startPosition.y);
		return coin;
	}

	private function onCoinArrivedAtDestination(coin:StateGraphic):Void->Void {
		return function () {
			this.callbackWhenCoinIsArrivedAtDestination();
			container.removeChild(coin);
		}
	}
}

typedef AxesCallback =
{
	var x:Void->Void;
	var y:Void->Void;
}
