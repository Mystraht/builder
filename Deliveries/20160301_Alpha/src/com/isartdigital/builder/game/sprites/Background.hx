package com.isartdigital.builder.game.sprites;

import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;

/**
 * ...
 * @author Flavien
 */
class Background extends StateGraphic
{

	public function new() 
	{
		super();
		boxType = BoxType.NONE;
		factory = new FlumpMovieAnimFactory();
	}
	
	override public function start():Void 
	{
		super.start();
		setState(DEFAULT_STATE);
	}
	
	override public function destroy():Void 
	{
		super.destroy();
	}
}