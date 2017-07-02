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
	private var eventEmit:String;
	
	public function new() 
	{
		super();
		interactive = true;
		buttonMode = true;
		click = tap = onClickEvent;
	
	}
	
	private function onClickEvent(pEvent:EventTarget) : Void
	{
		Main.getInstance().emit(eventEmit);
		pEvent.stopPropagation();
	}
}