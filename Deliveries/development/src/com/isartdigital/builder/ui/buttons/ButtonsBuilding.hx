package com.isartdigital.builder.ui.buttons;
import com.isartdigital.builder.ui.hud.BuildingHudElement;
import com.isartdigital.utils.ui.Button;
import pixi.core.math.Point;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ButtonsBuilding extends Button implements BuildingHudElement
{	
	public var basePosition:Point;
	
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