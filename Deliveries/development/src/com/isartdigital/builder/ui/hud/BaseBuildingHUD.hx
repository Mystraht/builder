package com.isartdigital.builder.ui.hud;
import com.isartdigital.utils.ui.Screen;
import com.isartdigital.utils.ui.UIComponent;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class BaseBuildingHUD extends UIComponent
{
	
	public function new() 
	{
		trace("createtion");
		super();
		build();
	}
	
	/**
	 * repositionne les éléments du BuildingHud
	 * @param	pEvent
	 */
	override private function onResize (pEvent:EventTarget = null): Void {
		//super.onResize();
	}
	
}