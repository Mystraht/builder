package com.isartdigital.builder.game.sprites;

import Math;
import com.isartdigital.utils.game.GameStage;
import pixi.core.math.Point;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import pixi.display.FlumpMovie;

/**
 * ...
 * @author Flavien
 */
class Background extends SpriteObject
{
	public inline static var BACKGROUND_WIDTH:Int = 3;
	public inline static var BACKGROUND_HEIGHT:Int = 3;

	private inline static var ANIM_SPEED:Float = 0.3;
	
	public function new() 
	{
		super();
		boxType = BoxType.NONE;
		factory = new FlumpMovieAnimFactory();
	}

	override public function init(pDefiniton:Dynamic):Void {
		var lPosition:Point = new Point(pDefiniton.x, pDefiniton.y);
		lPosition = IsoManager.modelToIsoView(lPosition);
		position.set(Math.floor(lPosition.x), Math.floor(lPosition.y));

		changeAsset("Background");
		setState(DEFAULT_STATE);

		getFlumpMovie().animationSpeed = ANIM_SPEED;

		GameStage.getInstance().getBackgroundContainer().addChild(this);
	}

	override public function remove():Bool {
		GameStage.getInstance().getBackgroundContainer().removeChild(this);

		if (!super.remove()) {
			destroy();
			return true;
		};

		return true;
	}

	override public function destroy():Void {
		super.destroy();
	}
}

