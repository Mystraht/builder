package com.isartdigital.builder.ui.hud;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class CurrencyAsset extends UIComponent
{

	public function new() 
	{
		super();
		build();
	}
	
	public function changeCount(pNumber:Int) {
		trace ("Number :" + pNumber);
	}
	
}