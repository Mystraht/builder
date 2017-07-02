package com.isartdigital.builder.ui.items;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.utils.game.StateGraphic;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class MissionAsset extends StateGraphic
{

	private static inline var MOUSE_OVER_BRIGHTNESS:Float = 1.5;
	
	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
							
		boxType = BoxType.SELF;
		setState(DEFAULT_STATE, false);
		
		gotoAndStopToRandomFrames();
		
		interactive = true;
		
		on(MouseEventType.MOUSE_OVER, mouseOver);
		on(MouseEventType.MOUSE_OUT, mouseOut);
		on(MouseEventType.MOUSE_UP_OUTSIDE, mouseOut);
	}
	
	private function mouseOut (event:EventTarget) : Void {
		filters = cast Filter.EMPTY_FILTER;
	}
	
	private function mouseOver (event:EventTarget) : Void {
		filters = cast Filter.getBrightness(MOUSE_OVER_BRIGHTNESS);
	}
	
	private function gotoAndStopToRandomFrames () : Void {
		getFlumpMovie().gotoAndStop(Math.floor(Math.random() * getFlumpMovie().totalFrames));
	}
	
}