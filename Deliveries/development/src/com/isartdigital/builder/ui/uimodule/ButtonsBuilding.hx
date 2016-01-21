package com.isartdigital.builder.ui.uimodule;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ButtonsBuilding extends Button
{
	private var onClick:EventTarget->Void = null;
	
	public function new() 
	{
		super();
		interactive = true;
		buttonMode = true;
		click = baseOnClick;
	
	}
	
	private function baseOnClick(pEvent:EventTarget) : Void
	{
		onClick(pEvent);
	}
	
	public function setClickCallBack(pCallBack:EventTarget->Void) : Void
	{
		removeListener(MouseEventType.CLICK, onClick);
		
		onClick = pCallBack;
	}
}