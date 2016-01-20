package com.isartdigital.builder.ui.hud;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.Screen;
import com.isartdigital.utils.ui.UIComponent;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class BaseBuildingHUD extends UIComponent
{
	private static var _instance:BaseBuildingHUD;
	
	public static function getInstance():BaseBuildingHUD
	{
		if (_instance == null) _instance = new BaseBuildingHUD();
		
		return _instance;
	}
	
	public var hadToMove:Bool = false;
	
	private var elements:Array<StateGraphic> = new Array<StateGraphic> ();
	
	public function new() 
	{
		super();
		build();
		
		for (lChild in children) {
			elements.push(cast(lChild));
		}
		
		hideChild(true);
	}
	
	
	private function hideChild(pHide:Bool, ?pFeedBack:Bool) : Void
	{/*
		if (pFeedBack)
		{
			return;
		}*/

		for (lElement in elements)
		{
			pHide ? removeChild(lElement) : addChild(lElement);
			//pHide ? removeChild(lElement) : addChild(lElement);
			trace(children.length);
		}
	}
	
	/**
	 * Active le BuildingHUD
	 */
	public function active () :Void 
	{
		trace("try to active");
		hideChild(false);
		for (lElement in elements)
		{
			trace(lElement.x, lElement.y);
		}
	}
}