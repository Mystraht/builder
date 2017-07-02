package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class CheckBox extends Button
{
	private var active:Bool = false;
	
	public function new() 
	{
		super();
	}
	
	public function setActive() : Void {
		untyped anim.gotoAndStop(Button.DOWN);
		active = true;
	}
	
	public function setInactive() : Void {
		untyped anim.gotoAndStop(Button.UP);
		active = false;
	}
	
	override function _mouseOut(pEvent:EventTarget):Void 
	{
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OUT_UI);
		
		//super._mouseOut(pEvent);
	}
	
	override function _click(pEvent:EventTarget):Void 
	{
		active ? setInactive() : setActive();
		//super._click(pEvent);
	}
	
	override function _mouseOver(pEvent:EventTarget):Void 
	{
		UIManager.getInstance().emit(UIManager.ON_MOUSE_OVER_UI);
		
		//super._mouseOver(pEvent);
	}
	
	override function _mouseDown(pEvent:EventTarget):Void 
	{
		//super._mouseDown(pEvent);
	}
	
}