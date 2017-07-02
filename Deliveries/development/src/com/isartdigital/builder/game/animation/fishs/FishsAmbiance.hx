package com.isartdigital.builder.game.animation.fishs;

import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.GameStage;
import pixi.core.math.Point;
import com.isartdigital.builder.game.map.GMap;

class FishsAmbiance {
	private static inline var CHANCE_TO_GENERATE_FISH:Float = 0.1;

	public static function updateFishAmbiance() {
		if (Math.random() < CHANCE_TO_GENERATE_FISH) {
			var position:Point = IsoManager.modelToIsoView(GMap.getRandomAvailablePosition());
			AnimationFishBuilder.create()
								.withPosition(position)
								.withContainer(GameStage.getInstance().getFishContainer())
								.build();
		}
	}
}
