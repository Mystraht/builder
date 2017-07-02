package com.isartdigital.builder.ui.uimodule;

import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ShopOnglet extends Button
{

	public function new() 
	{
		super();
		
	}
	
	public function setActive() : Void {
		untyped anim.gotoAndStop(Button.DOWN);
	}
	
	public function setUnActive() : Void {
		untyped anim.gotoAndStop(Button.UP);
	}
	
	override function _mouseOut(pEvent:EventTarget):Void 
	{
		//super._mouseOut(pEvent);
	}
	
	override function _click(pEvent:EventTarget):Void 
	{
		//super._click(pEvent);
	}
	
	override function _mouseOver(pEvent:EventTarget):Void 
	{
		//super._mouseOver(pEvent);
	}
	
	override function _mouseDown(pEvent:EventTarget):Void 
	{
		//super._mouseDown(pEvent);
	}
	
}