package com.isartdigital.builder.ui.items;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.buttons.DotButton;
import com.isartdigital.builder.ui.buttons.LeftButton;
import com.isartdigital.builder.ui.buttons.RightButton;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.math.Point;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ShopCategory extends UIComponent
{
	private var ShopSheetSettings:Array<String> = new Array<String> ();
	private var jsonSettingsName:String;
	private var itemComponentName:String;
	private var dotButtonName:String = "DotButton";
	
	private var buildingPerSheet:Int;
	private var positionInShop:Int = 0;
	
	private var dotList:Array<DotButton> = new Array<DotButton> ();
	private var itemList:Array<ItemShop> = new Array<ItemShop> ();
	private var rightArrowList:Array<RightButton> = new Array<RightButton> ();
	private var leftArrowList:Array<LeftButton> = new Array<LeftButton> ();
	
	public function new() 
	{
		super();
	}
	
	private function init () : Void {
		getSettings();
		
		setListFromChild(itemComponentName, itemList);
		setListFromChild(dotButtonName, dotList);
		setListFromChild("RightButton", rightArrowList);
		setListFromChild("LeftButton", leftArrowList);
		
		createMissingDotButton();
		centerDotButton();
		
		changeSheet();
		
		setCurrentDotButtonActive();
		
		subscribeButtonsClickAndTap(goRight, cast(rightArrowList));
		subscribeButtonsClickAndTap(goLeft, cast(leftArrowList));
		subscribeButtonsClickAndTap(onDotClick, cast(dotList));
	}
	
	private function goLeft(pEvent:EventTarget) : Void {
		if (positionInShop - buildingPerSheet >= 0) {
			dotList[Math.floor(positionInShop / buildingPerSheet)].setInactive();
			positionInShop -= buildingPerSheet;
			changeSheet();
			dotList[Math.floor(positionInShop / buildingPerSheet)].setActive();
		}
	}
	
	private function goRight(pEvent:EventTarget) : Void {		
		if (positionInShop + buildingPerSheet < ShopSheetSettings.length) {
			dotList[Math.floor(positionInShop / buildingPerSheet)].setInactive();
			positionInShop += buildingPerSheet;
			changeSheet();
			dotList[Math.floor(positionInShop / buildingPerSheet)].setActive();
		}
	}
	
	private function changeSheet() : Void {
		for (i in 0...itemList.length) {
			itemList[i].changeItemSelect(ShopSheetSettings[positionInShop + i]);
		}
	}
	
	private function onDotClick (event:EventTarget) : Void {
		setCurrentDotButtonInactive();
		changePositionInShopFromDotButton(cast(event.target, DotButton));
		setCurrentDotButtonActive();

		changeSheet();		
	}
	
	private function changePositionInShopFromDotButton (dotButton:DotButton) : Void {
		positionInShop = dotList.indexOf(dotButton) * buildingPerSheet;
	}
	
	private function setCurrentDotButtonActive () : Void {
		dotList[Math.floor(positionInShop / buildingPerSheet)].setActive();
	}
	
	private function setCurrentDotButtonInactive () : Void {
		dotList[Math.floor(positionInShop / buildingPerSheet)].setInactive();
	}
	
	private function centerDotButton() : Void {
		var widthBetweenFirstAndLastElement:Float = dotList[dotList.length -1].x - dotList[0].x;
		var widthToAbduct:Float = widthBetweenFirstAndLastElement / 2 - dotList[0].width  ;
		var yPositionOfDotButton:Float = dotList[dotList.length -1].y;
		
		for (dotButton in dotList) 
			dotButton.position.set(dotButton.x - widthToAbduct, yPositionOfDotButton);
	}
	
	private function getNumberOfMissingDotButton () : Int {
		return Std.int(Math.ceil(ShopSheetSettings.length / buildingPerSheet) - dotList.length);
		
	}
	
	private function createMissingDotButton () : Void {
		var delatX:Float = dotList[1].x - dotList[0].x;
		for (i in 0...getNumberOfMissingDotButton()) {
			var position:Point = dotList[i + 1].position.clone();
			dotList.push(createDotButton(new Point(position.x + delatX, position.y)));
		}
	}
	
	private function createDotButton (createAtPosition:Point) : DotButton {
		var dotButton:DotButton = new DotButton();
		dotButton.position.set(createAtPosition.x, createAtPosition.y);
		addChild(dotButton);
		return dotButton;
	}
	
	private function getSettings () : Void {
		ShopSheetSettings = cast GameLoader.getContent(jsonSettingsName);
	}
	
	override public function destroy():Void 
	{
		unsubscribeButtonsClickAndTap(cast(rightArrowList));
		unsubscribeButtonsClickAndTap(cast(leftArrowList));
		unsubscribeButtonsClickAndTap(cast(dotList));
		
		while (itemList.length > 0) {
			itemList[0].destroy();
		}
		
		while (dotList.length > 0) {
			dotList[0].destroy();
		}
		
		interactive = false;
		
		super.destroy();
	}
	
}