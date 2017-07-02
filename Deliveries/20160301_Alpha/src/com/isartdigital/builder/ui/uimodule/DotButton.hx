package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.builder.ui.screens.Shop;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.Button;
import pixi.display.FlumpMovie;
import pixi.display.FlumpSprite;
import pixi.extras.MovieClip;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class DotButton extends Button
{
	public static var list:Array<DotButton> = new Array<DotButton> () ;

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		
		list.push(this);
		
	}
	
	/**
	 * Change l'asset du Dot en mode actif
	 */
	public function setActive () : Void {
		untyped anim.gotoAndStop(Button.DOWN);
	}
	
	/**
	 * Change l'asset du Dot en mode inactif
	 */
	public function setInActive () : Void {
		untyped anim.gotoAndStop(Button.UP);
	}
	
	override function _click(pEvent:EventTarget):Void 
	{
		//super._click(pEvent);
	}
	
	override function _mouseOut(pEvent:EventTarget):Void 
	{
		//super._mouseOut(pEvent);
	}
	
	override function _mouseOver(pEvent:EventTarget):Void 
	{
		//super._mouseOver(pEvent);
	}
	
	override public function destroy():Void 
	{
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
}