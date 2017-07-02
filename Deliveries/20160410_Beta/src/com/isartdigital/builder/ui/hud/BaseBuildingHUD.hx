package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingComponents;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingEventDef;
import com.isartdigital.builder.game.utils.CameraUtils;
import com.isartdigital.builder.ui.items.BuildingInfo;
import com.isartdigital.builder.ui.items.UpgradeComfirm;
import com.isartdigital.builder.ui.popin.UpgradeReward;
import com.isartdigital.builder.ui.buttons.ColorButton;
import com.isartdigital.builder.ui.buttons.DeleteButton;
import com.isartdigital.builder.ui.buttons.HardBuildButton;
import com.isartdigital.builder.ui.buttons.MoveButton;
import com.isartdigital.builder.ui.buttons.UpgradeButton;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.ui.Screen;
import com.isartdigital.utils.ui.UIComponent;
import motion.Actuate;
import motion.easing.Bounce;
import motion.easing.Elastic;
import motion.easing.Expo;
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
	private var hardBuildButton:HardBuildButton;
	
	private static inline var BUTTON_DELETE_NAME:String = "DeleteButton";
	private static inline var BUTTON_COLOR_NAME:String = "ColorButton";
	private static inline var BUTTON_UPGRADABLE_NAME:String = "UpgradeComfirm";
	private static inline var BUTTON_MOVE_NAME:String = "MoveButton";
	private static inline var DESCRIPTION_ITEM:String = "BuildingInfo";
	private static inline var BUTTON_HARDBUILD_NAME:String = "HardBuildButton"; 
	
	public function new() 
	{
		_instance = this;
		super();
		build();
		
		buildingInfoElement = cast(getChildByName(DESCRIPTION_ITEM), BuildingInfo);
		deleteButton = cast(getChildByName(BUTTON_DELETE_NAME), DeleteButton);
		upgradeButton = cast(getChildByName(BUTTON_UPGRADABLE_NAME), UpgradeComfirm);
		paintButton = cast(getChildByName(BUTTON_COLOR_NAME), ColorButton);
		moveButton = cast(getChildByName(BUTTON_MOVE_NAME), MoveButton);
		hardBuildButton = cast(getChildByName(BUTTON_HARDBUILD_NAME), HardBuildButton);
		
		elements.push(buildingInfoElement);
		buildingInfoElement.basePosition = buildingInfoElement.position.clone();
		elements.push(deleteButton);
		deleteButton.basePosition = deleteButton.position.clone();
		elements.push(upgradeButton);
		upgradeButton.basePosition = upgradeButton.position.clone();
		elements.push(paintButton);
		paintButton.basePosition = paintButton.position.clone();
		elements.push(moveButton);
		moveButton.basePosition = moveButton.position.clone();
		elements.push(hardBuildButton);
		hardBuildButton.basePosition = hardBuildButton.position.clone();
		
		hideElements(false);
		
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
		hideElements(false);
		
		for (lType in pDef.type) {
			if (lType == BuildingComponents.UPGRADABLE) {
				addChild(upgradeButton);
				upgradeButton.position = upgradeButton.basePosition.clone();
				upgradeButton.init(Reflect.field(pDef.ref.getConfig(), "upgrade_price"), Reflect.field(pDef.ref.getConfig(), "resource_upgrade"));							
			}
			else if (lType == BuildingComponents.MOVABLE) {
				addChild(moveButton);
				moveButton.position = moveButton.basePosition.clone();
			}
			else if (lType == BuildingComponents.PAINTABLE) {
				addChild(paintButton);
				paintButton.position = paintButton.basePosition.clone();
			}
			else if (lType == BuildingComponents.ERASABLE) {
				addChild(deleteButton);
				deleteButton.position = deleteButton.basePosition.clone();
			}
			else if (lType == BuildingComponents.HARDBUILD) {
				addChild(hardBuildButton);
				hardBuildButton.position = hardBuildButton.basePosition.clone();
			}
		}
		
		addChild(buildingInfoElement);
		buildingInfoElement.position = buildingInfoElement.basePosition.clone();
		buildingInfoElement.setDescription(pDef.ref);
		children.sort(sortByX);
		packChildren();
		centerBuildingHud();
		
		for (lElement in children) {
			startAppearFeedBack(lElement);
		}
	}
	
	private function startAppearFeedBack (pObject:DisplayObject) : Void {
		pObject.y += pObject.getLocalBounds().height;
		Actuate.tween(pObject, 1, { y: pObject.y - pObject.getLocalBounds().height} ).ease(Elastic.easeOut); 	
	}
	
	private function startHideFeedBack (pObject:DisplayObject) : Void {
		Actuate.tween(pObject, 0.3, { y: pObject.y + pObject.getLocalBounds().height } ).ease(Expo.easeIn).onComplete(setToStartPosition, [pObject]); 
	}
	
	private function setToStartPosition (pObject:DisplayObject) : Void {
		pObject.y -= pObject.getLocalBounds().height;
		removeChild(pObject);
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
	
	private function hideElements(?pFeedBack = true) : Void {	
		for (lElement in elements)
		{
			if (pFeedBack) startHideFeedBack(lElement);
			else {
				removeChild(lElement);
			//	lElement.y += lElement.getLocalBounds().height;
			}
		}
	}
	
	private function isClassNameEqual (pName:String, pSuffix:String, pClass:Class<Dynamic>) : Bool
	{
		return (pName.length - pSuffix.length 
			== Type.getClassName(pClass).length - pSuffix.length);
	}
}