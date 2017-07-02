package com.isartdigital.builder.ui.items;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class Disclaimer_item extends UIComponent
{

	private var leftButtonAsset:DisplayObject;
	
	public function new() 
	{
		super();
		build();
		
		interactive = true;
		
		click = tap = onClick;
		
		leftButtonAsset = getChildByName("ShopCloseButtonAsset");
		leftButtonAsset.interactive = true;
		leftButtonAsset.click = leftButtonAsset.tap = onClick;
	}
	
	private function onClick(event:EventTarget) : Void {
		visible = false;
	}
	
}