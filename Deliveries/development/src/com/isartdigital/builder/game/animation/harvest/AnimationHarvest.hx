package com.isartdigital.builder.game.animation.harvest;

import com.isartdigital.builder.game.animation.harvest.AnimationHarvestBuilder;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import pixi.display.FlumpMovie;
import com.isartdigital.utils.game.StateGraphic;
import motion.easing.Quad;
import Math;
import haxe.Timer;
import pixi.core.display.Container;
import motion.Actuate;

import pixi.core.math.Point;

@:access(com.isartdigital.builder.game.animation.harvest.AnimationHarvestBuilder)
class AnimationHarvest {
	private static inline var MINIMUM_COIN_SCALE:Float = 0.5;
	private static inline var SPACE_BETWEEN_CURVE_ANIMATION:Float = 15;

	private var startPosition:Void->Point;
	private var endPosition:Void->Point;
	private var coinToGenerateCount:Int;
	private var totalAnimationDuration:Float;
	private var coinCountLimit:Int;
	private var callbackWhenCoinIsArrivedAtDestination:Void->Void;
	private var animationName:String;
	private var container:Container;
	private var callbackOnAnimationEnd:Void->Void;

	private var coins:Array<StateGraphic> = new Array<StateGraphic>();

	public static inline var RESOURCE_GAIN_PER_COIN:Int = 1;
	public static inline var COIN_COUNT_LIMIT:Int = 50;

	private function new(animationHarvestBuilder:AnimationHarvestBuilder) {
		this.startPosition = animationHarvestBuilder.startPosition;
		this.endPosition = animationHarvestBuilder.endPosition;
		//this.coinToGenerateCount = 1000;
		this.coinToGenerateCount = animationHarvestBuilder.coinToGenerateCount;
		this.totalAnimationDuration = animationHarvestBuilder.totalAnimationDuration;
		//this.coinCountLimit = 1000;
		this.coinCountLimit = animationHarvestBuilder.coinCountLimit;
		this.callbackWhenCoinIsArrivedAtDestination = animationHarvestBuilder.callbackWhenCoinIsArrivedAtDestination;
		this.animationName = animationHarvestBuilder.animationName;
		this.container = animationHarvestBuilder.container;
		this.callbackOnAnimationEnd = animationHarvestBuilder.callbackOnAnimationEnd;
	}

	public function animate():Void {
		launchCoinAnimationSalve();
	}

	private function launchCoinAnimationSalve():Void {
		var inversedIndex:Float;
		var timeToWait:Int;

		coinToGenerateCount = coinCountLimit < coinToGenerateCount ? coinCountLimit : coinToGenerateCount;

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

		Actuate.tween(coin, animationDurationPerAxes.x, { x : endPosition.x } )
		       .ease(Quad.easeInOut)
			   .onComplete(onCompleteCallbackByAxes.x);

		Actuate.tween(coin, animationDurationPerAxes.y, { y : endPosition.y } )
		       .ease(Quad.easeInOut)
		       .onComplete(onCompleteCallbackByAxes.y);
	}

	private function createCoin():StateGraphic {
		var coin:StateGraphic = new StateGraphic(animationName);
		var startPosition:Point = this.startPosition();
		var coinScale:Float = MINIMUM_COIN_SCALE + (Math.random() * (1 - MINIMUM_COIN_SCALE));
		coins.push(coin);
		container.addChild(coin);

		coin.scale = new Point(coinScale, coinScale);
		cast(coin.getAnim(), FlumpMovie).animationSpeed = 2;

		coin.position.set(startPosition.x, startPosition.y);
		return coin;
	}

	private function onCoinArrivedAtDestination(coin:StateGraphic):Void->Void {
		return function () {
			if (Math.random() > 0.75) SoundManager.playSFX(SoundNames.HARVEST_1);
			this.callbackWhenCoinIsArrivedAtDestination();
			destroyCoin(coin);
			if (allCoinReachedDestination()) {
				callbackOnAnimationEnd();
				SoundManager.playSFX(SoundNames.HARVEST_1);
			}
		}
	}

	private function destroyCoin(coin:StateGraphic) : Void {
		container.removeChild(coin);
		coins.splice(coins.indexOf(coin), 1);
		Timer.delay(destroyCoinInstance(coin), 10);
	}

	// hack to prevent Actuate fire onComplete before complete (Bug on library)
	private function destroyCoinInstance(coin:StateGraphic):Void->Void {
		return function () {
			coin.destroy();
		};
	}

	private function allCoinReachedDestination():Bool {
		return coins.length == 0;
	}
}

