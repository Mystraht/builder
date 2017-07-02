package com.isartdigital.builder.game.animation.petals;

import com.isartdigital.utils.Config;
import Math;
import pixi.core.math.Point;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.utils.game.iso.IsoManager;

class PetalsSalve {
	private static inline var CHANCE_TO_POP_PETAL:Float = 0.02;
	private static inline var PETALS_MAX_DELAY_FOR_GLOBAL_LAUNCH:Int = 1500;
	private static inline var PETALS_MAX_DELAY_FOR_LOCALIZED_LAUNCH:Int = 500;
	private static inline var RADIUS_SALVE:Int = 200;
	public static inline var PETALS_COUNT_FOR_GLOBAL_SALVE:Int = 20;
	public static var PETALS_NUMBER_FOR_LAUCNHING_ON_POSITION:Int = 3;


	public function new() {
	}

	public static function launchOnBuildableTiles(number:Int):Void {
		for	(i in 0...number) {
			AnimationPetalsBuilder.create()
								  .withPosition(IsoManager.modelToIsoView(GMap.getRandomAvailablePosition()))
								  .withMaxPetalDelay(PETALS_MAX_DELAY_FOR_GLOBAL_LAUNCH)
								  .withContainer(GameStage.getInstance().getPetalsContainer())
								  .build();
		}
	}

	public static function lauchOnPositionWithRadius(position:Point, number:Int) {
		for (i in 0...number) {
			var position:Point = IsoManager.modelToIsoView(position);
			position.x += Math.random() * RADIUS_SALVE * Math.cos(Math.random() * (Math.PI * 2));
			position.y += Math.random() * RADIUS_SALVE * Math.sin(Math.random() * (Math.PI * 2));
			position.x -= Config.tileWidth;

			AnimationPetalsBuilder.create()
								  .withPosition(position)
								  .withMaxPetalDelay(PETALS_MAX_DELAY_FOR_LOCALIZED_LAUNCH)
								  .withContainer(GameStage.getInstance().getPetalsContainer())
								  .build();
		}
	}

	public static function updatePetalsAmbiance():Void {
		if (Math.random() < CHANCE_TO_POP_PETAL) {
			AnimationPetalsBuilder.create()
								  .withPosition(IsoManager.modelToIsoView(GMap.getRandomAvailablePosition()))
								  .withMaxPetalDelay(0)
								  .withContainer(GameStage.getInstance().getPetalsContainer())
								  .build();
		}
	}
}
