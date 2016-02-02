package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.ui.uimodule.ColorButton;
import com.isartdigital.builder.ui.uimodule.DeleteButton;
import com.isartdigital.builder.ui.uimodule.MoveButton;
import com.isartdigital.builder.ui.uimodule.UpgradeButton;
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
	
	private static var BUTTON_DELETE_NAME:String = "DeleteButton";
	private static var BUTTON_COLOR_NAME:String = "ColorButton";
	private static var BUTTON_UPGRADABLE_NAME:String = "UpgradableButton";
	private static var BUTTON_MOVE_NAME:String = "MoveButton";
	
	public function new() 
	{
		_instance = this;
		super();
		build();
		
		for (lChild in children) {
			elements.push(cast(lChild));
		}
		
		hideChild();
	}
	
	
	private function hideChild() : Void
	{
		for (lElement in elements)
		{
			removeChild(lElement);
		}
	}
	
	/**
	 * Active le BuildingHUD
	 */
	public function initHUD (pMove:EventTarget->Void, pDelete:EventTarget->Void, ?pUpgrading:EventTarget->Void = null, ?pColor:EventTarget->Void = null) :Void 
	{		
		for (lElement in elements)
		{
			var lName = Type.getClassName(Type.getClass(lElement));
			if (isClassNameEqual(lName, BUTTON_MOVE_NAME, MoveButton))
			{
				cast(lElement, MoveButton).setClickCallBack(pMove);
				addChild(lElement);
			} else if (isClassNameEqual(lName, BUTTON_DELETE_NAME, DeleteButton)) 
			{
				cast(lElement, DeleteButton).setClickCallBack(pDelete);
				addChild(lElement);
			} else if (isClassNameEqual(lName, BUTTON_UPGRADABLE_NAME, UpgradeButton)
					&& pUpgrading != null) 
			{
				cast(lElement, UpgradeButton).setClickCallBack(pUpgrading);
				addChild(lElement);
			} else if (isClassNameEqual(lName, BUTTON_COLOR_NAME, ColorButton)
					&& pColor != null)
			{
				cast(lElement, MoveButton).setClickCallBack(pColor);
				addChild(lElement);
			}
		}		
	}
	
	private function isClassNameEqual (pName:String, pSuffix:String, pClass:Class<Dynamic>) : Bool
	{
		return (pName.length - pSuffix.length 
			== Type.getClassName(pClass).length - pSuffix.length);
	}
	
	public function closeHUD():Void
	{
		hideChild();
	}
}