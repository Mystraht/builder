package com.isartdigital.builder.game.animation.harvest;

import pixi.core.display.Container;
import pixi.core.math.Point;

@:access(com.isartdigital.builder.game.animation.harvest.AnimationHarvest)
class AnimationHarvestBuilder {
	private static inline var DEFAULT_ANIMATION_DURATION:Float = 2.5;
	private static inline var ERROR_MISSING_PARAMETERS:String =
	'AnimationHarvestBuilder : Missing required parameters.\n' +
	'\n' +
	'Usage : \n' +
	'AnimationHarvestBuilder.create()\n' +
	'                       .setStartAnimationPosition(position:Void->Point) (Required)\n' +
	'                       .setEndAnimationPosition(position:Void->Point) (Required)\n' +
	'                       .withCoinAmountToGenerate(count:Int) (Required)\n' +
	'						.withAnimationName(name:String) (Required)\n' +
	'                       .withContainer(container:Container) (Required)\n' +
	'                       .withAnimationDurationInSecond(duration:Float) (Optional) (Default : 2,5s)\n' +
	'	   				    .withCoinCountLimit(count:Int) (Optional) (Default : AnimationHarvest.COIN_COUNT_LIMIT)\n' +
	'                       .withCallbackWhenCoinReachDestination(callback:Void->Void) (Optional)\n' +
	'                       .withCallbackOnAnimationEnd(callback:Void->Void) (Optional)\n' +
	'                       .build()';

	private var startPosition:Void->Point;
	private var endPosition:Void->Point;
	private var coinToGenerateCount:Int;
	private var totalAnimationDuration:Float;
	private var coinCountLimit:Int;
	private var callbackWhenCoinIsArrivedAtDestination:Void->Void;
	private var animationName:String;
	private var container:Container;
	private var animationHarvestBuilder:Void->Void;
	private var callbackOnAnimationEnd:Void->Void;

	/**
	 * Usage :
	 * AnimationHarvestBuilder.create()
	 * 				  		  .setStartAnimationPosition(position:Void->Point) (Required)
	 *	   				      .setEndAnimationPosition(position:Void->Point) (Required)
	 *	   				      .withCoinAmountToGenerate(count:Int) (Required)
	 *                        .withAnimationName(name:String) (Required)
	 * 						  .withContainer(container:Container) (Required)
	 *	   				      .withAnimationDurationInSecond(duration:Float) (Optional) (Default : 2,5s)
	 *	   				      .withCoinCountLimit(count:Int) (Optional) (Default : AnimationHarvest.COIN_COUNT_LIMIT)
	 *	   				      .withCallbackWhenCoinReachDestination(callback:Void->Void) (Optional)
	 * 				   		  .withCallbackOnAnimationEnd(callback:Void->Void) (Optional)\n
	 * 				   		  .build()
     **/
	public function new() {
	}

	public static function create():AnimationHarvestBuilder {
		return new AnimationHarvestBuilder();
	}

	public function withStartAnimationPosition(position:Void->Point):AnimationHarvestBuilder {
		startPosition = position;
		return this;
	}

	public function withEndAnimationPosition(position:Void->Point):AnimationHarvestBuilder {
		endPosition = position;
		return this;
	}

	public function withCoinAmountToGenerate(count:Int):AnimationHarvestBuilder {
		coinToGenerateCount = count;
		return this;
	}

	public function withAnimationName(name:String):AnimationHarvestBuilder {
		animationName = name;
		return this;
	}

	public function withContainer (container:Container) : AnimationHarvestBuilder {
		this.container = container;
		return this;
	}

	public function withAnimationDurationInSecond(duration:Float):AnimationHarvestBuilder {
		totalAnimationDuration = duration;
		return this;
	}

	public function withCoinCountLimit(count:Int):AnimationHarvestBuilder {
		coinCountLimit = count;
		return this;
	}

	public function withCallbackWhenCoinReachDestination(callback:Void->Void):AnimationHarvestBuilder {
		callbackWhenCoinIsArrivedAtDestination = callback;
		return this;
	}
	
	public function withCallbackOnAnimationEnd(callback:Void->Void):AnimationHarvestBuilder {
		callbackOnAnimationEnd = callback;
		return this;
	}

	public function build():AnimationHarvest {
		throwAnErrorIfRequiredParametersIsMissingAndShowUsage();
		setTotalAnimationDurationDefaultValueIfNotSet();
		setCoinCountLimitDefaultValueIfNotSet();
		setEmptyFunctionIfCallbackOnAnimationEndIsNotSet();
		setEmptyFunctionIfCallbackWhenCoinIsArrivedAtDestinationIsNotSet();
		return new AnimationHarvest(this);
	}

	private function throwAnErrorIfRequiredParametersIsMissingAndShowUsage():Void {
		if (
			startPosition == null ||
			endPosition == null ||
			container == null ||
			coinToGenerateCount == null ||
			animationName == null
		) {
			throw ERROR_MISSING_PARAMETERS;
		}
	}

	private function setTotalAnimationDurationDefaultValueIfNotSet():Void {
		if (totalAnimationDuration == null) {
			totalAnimationDuration = DEFAULT_ANIMATION_DURATION;
		}
	}

	private function setCoinCountLimitDefaultValueIfNotSet():Void {
		if (coinCountLimit == null) {
			coinCountLimit = AnimationHarvest.COIN_COUNT_LIMIT;
		}
	}

	private function setEmptyFunctionIfCallbackOnAnimationEndIsNotSet():Void {
		if (callbackOnAnimationEnd == null) {
			callbackOnAnimationEnd = function () {};
		}
	}
	
	private function setEmptyFunctionIfCallbackWhenCoinIsArrivedAtDestinationIsNotSet():Void {
		if (callbackWhenCoinIsArrivedAtDestination == null) {
			callbackWhenCoinIsArrivedAtDestination = function () {};
		}
	}
}
