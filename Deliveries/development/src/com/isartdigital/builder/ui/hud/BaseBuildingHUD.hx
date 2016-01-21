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
	
	private var active:Bool = false;
	
	public function new() 
	{
		_instance = this;
		super();
		build();
		
		for (lChild in children) {
			elements.push(cast(lChild));
		}
		
		displayChild();
	}
	
	
	private function displayChild() : Void
	{
		for (lElement in elements)
		{
			active ? addChild(lElement) : removeChild(lElement);
		}
		active = !active;
	}
	
	/**
	 * Active le BuildingHUD
	 */
	public function initElements () :Void 
	{
		displayChild();
	}
}