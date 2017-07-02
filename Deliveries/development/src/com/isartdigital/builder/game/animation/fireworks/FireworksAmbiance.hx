package com.isartdigital.builder.game.animation.fireworks;

import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.builder.game.map.GMap;
import pixi.core.math.Point;
import com.isartdigital.utils.game.GameStage;

class FireworksAmbiance {
	private static inline var CHANCE_TO_GENERATE_FIREWORKS:Float = 0.1;

	public function new() {

	}

	public static function update() {
		if (Math.random() < CHANCE_TO_GENERATE_FIREWORKS) {
			var fireworksPosition:Point = IsoManager.modelToIsoView(GMap.getRandomAvailablePosition());
			AnimationFireworksBuilder.create()
									 .withFireworksName(AnimationFireworks.getRandomFireworks())
									 .withShotAnimation(true)
									 .withContainer(GameStage.getInstance().getFireworksContainer())
									 .withPosition(fireworksPosition)
									 .build();
		}
	}
}
