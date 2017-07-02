package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingComponents;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingEventDef;
import com.isartdigital.builder.game.utils.CameraUtils;
import com.isartdigital.builder.ui.items.BuildingInfo;
import com.isartdigital.builder.ui.items.UpgradeComfirm;
import com.isartdigital.builder.ui.popin.UpgradeReward;
import com.isartdigital.builder.ui.uimodule.ColorButton;
import com.isartdigital.builder.ui.uimodule.DeleteButton;
import com.isartdigital.builder.ui.uimodule.MoveButton;
import com.isartdigital.builder.ui.uimodule.UpgradeButton;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.ui.Screen;
import com.isartdigital.utils.ui.UIComponent;
import motion.Actuate;
import motion.easing.Bounce;
import motion.easing.Elastic;
import motion.easing.Quad;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;
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
	
	private var elements:Array<DisplayObject> = new Array<DisplayObject> ();
	
	private var buildingInfoElement:BuildingInfo;
	private var paintButton:ColorButton;
	public var upgradeButton:UpgradeComfirm;
	private var moveButton:MoveButton;
	private var deleteButton:DeleteButton;
	
	
	private static var BUTTON_DELETE_NAME:String = "DeleteButton";
	private static var BUTTON_COLOR_NAME:String = "ColorButton";
	private static var BUTTON_UPGRADABLE_NAME:String = "UpgradableComfirm";
	private static var BUTTON_MOVE_NAME:String = "MoveButton";
	private static var DESCRIPTION_ITEM:String = "BuildingInfo";
	
	private var startPositionY:Float = 0;
	
	public function new() 
	{
		_instance = this;
		super();
		build();
		
		buildingInfoElement = cast(getChildByName("BuildingInfo"), BuildingInfo);
		deleteButton = cast(getChildByName("DeleteButton"), DeleteButton);
		upgradeButton = cast(getChildByName("UpgradeComfirm"), UpgradeComfirm);
		paintButton = cast(getChildByName("ColorButton"), ColorButton);
		moveButton = cast(getChildByName("MoveButton"), MoveButton);
		
		elements.push(buildingInfoElement);
		elements.push(deleteButton);
		elements.push(upgradeButton);
		elements.push(paintButton);
		elements.push(moveButton);
		
		startPositionY = moveButton.y;
		
		hideElements();
		
		Main.getInstance().on(BuildingEvents.SELECTED, showChild);
		Main.getInstance().on(BuildingEvents.UNSELECTED, hideElements);
	}
	
	private function sortByX(pObjectA:DisplayObject, pObjectB:DisplayObject) : Int
	{
		return Std.int(pObjectB.x - pObjectA.x);
	}
	
	private function setComponent(pSuffix:String, pClass:Class<Dynamic>) : Void {
		for (lElement in elements) {
			var lName = Type.getClassName(Type.getClass(lElement));
			if (isClassNameEqual(lName, pSuffix, pClass)) addChild(lElement);
		}
	}
	
	private function showChild(pDef:BuildingEventDef) : Void {
		hideElements();		
		
		for (lType in pDef.type) {
			if (lType == BuildingComponents.UPGRADABLE) {
				addChild(upgradeButton);
				upgradeButton.init(Reflect.field(pDef.ref.getConfig(), "upgrade_price"));				
			}
			else if (lType == BuildingComponents.MOVABLE) addChild(moveButton);
			else if (lType == BuildingComponents.PAINTABLE) addChild(paintButton);
			else if (lType == BuildingComponents.ERASABLE) addChild(deleteButton);
		}

		addChild(buildingInfoElement);
		buildingInfoElement.setDescription(pDef.ref);
		children.sort(sortByX);
		packChildren();
		centerBuildingHud();
		
		for (lElement in children) {
			startFeedBack(lElement);
		}
	}
	
	private function startFeedBack (pObject:DisplayObject) : Void {
		pObject.y += pObject.getLocalBounds().height;
		Actuate.tween(pObject, 1, { y: pObject.y - pObject.getLocalBounds().height} ).ease(Elastic.easeOut); 
		
	}
	
	private function centerBuildingHud() : Void {
		var lWidthComponents:Float = 0;
		for (lElement in children) {
			lWidthComponents += lElement.getLocalBounds().width;
		}
		var lWidthHud:Float = GameStage.getInstance().getHudContainer().width;		
		
		children[0].x = lWidthHud / 2 - children[0].getLocalBounds().width - children[0].parent.getBounds().x;
		
		packChildren();
	}
	
	private function packChildren() : Void {
		for (i in 0...children.length) {
			if (i >= children.length - 1) break;
			children[i + 1].x = children[i].x - children[i+1].getLocalBounds().width;
		}
	}
	
	private function hideElements(?pDef:BuildingEventDef) : Void {
		for (lElement in elements)
		{
			removeChild(lElement);
		}
	}
	
	private function isClassNameEqual (pName:String, pSuffix:String, pClass:Class<Dynamic>) : Bool
	{
		return (pName.length - pSuffix.length 
			== Type.getClassName(pClass).length - pSuffix.length);
	}
}