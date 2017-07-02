package com.isartdigital.builder.game.animation.fishs;

import haxe.Timer;
import com.isartdigital.utils.game.StateGraphic;
import pixi.core.display.Container;
import pixi.core.math.Point;

@:access(com.isartdigital.builder.game.animation.fishs.AnimationFishBuilder)
class AnimationFish {
	private static inline var ANIMATION_DURATION_A:Int = 2500;
	private static inline var ANIMATION_DURATION_B:Int = 3600;

	private var fish:StateGraphic;
	private var position:Point;
	private var container:Container;
	private var FISH_ASSETS:Array<String> = [
		AnimationNames.FISH_A,
		AnimationNames.FISH_B
	];

	public function new(animationFishBuilder:AnimationFishBuilder) {
		this.position = animationFishBuilder.position;
		this.container = animationFishBuilder.container;

		createFish();
	}

	public function createFish():Void {
		var scale:Float = 0.8 + Math.random() * 1;
		var assetName:String = getRandomFishAsset();
		fish = new StateGraphic(assetName);
		fish.position = position;
		fish.scale.set(scale, scale);
		fish.position.x -= fish.width / 2;
		fish.position.y -= fish.height / 2;
		fish.scale.x *= Math.random() * 2 > 1 ? 1 : -1;
		fish.scale.y *= Math.random() * 2 > 1 ? 1 : -1;
		container.addChild(fish);
		if (assetName == AnimationNames.FISH_A) {
			Timer.delay(destroy, ANIMATION_DURATION_A);
		}
		if (assetName == AnimationNames.FISH_B) {
			Timer.delay(destroy, ANIMATION_DURATION_B);
		}
	}

	public function getRandomFishAsset():String {
		return FISH_ASSETS[Math.floor(Math.random() * FISH_ASSETS.length)];
	}

	public function destroy():Void {
		container.removeChild(fish);
		fish.destroy();
		fish = null;
	}
}
