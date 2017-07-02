package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.uimodule.DotButton;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.math.Point;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ShopBuilding extends UIComponent
{
	private var ShopSheetSettings:Array<String> = new Array<String> ();
	
	private var positionInShop:Int = 0;
	
	private var buildingPerSheet:Int = 2;

	public function new() 
	{
		super();
		build();
		
		ShopSheetSettings = cast GameLoader.getContent(JsonNames.SHOP_SHEET);
		changeSheet();
		listenRightButton();
		listenLeftButton();
		
		positionInShop = 0;
		createAllDot();
		listenDot();
		
		DotButton.list[positionInShop].setActive();
	}
	
	private function onDotClick (pEvent:EventTarget) : Void {
		DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setInActive();
		positionInShop = DotButton.list.indexOf(cast(pEvent.target, DotButton)) * 2;
		DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setActive();

		changeSheet();		
	}
	
	private function listenDot () : Void {
		for (lDot in DotButton.list) {
			lDot.tap = lDot.click = onDotClick;
		}
	}
	
	private function centerDot() : Void {
		var lMoveToCenter:Float = DotButton.list[DotButton.list.length -1].x - DotButton.list[0].x;
		lMoveToCenter = lMoveToCenter / 2 - DotButton.list[0].width  ;
		var lY:Float = DotButton.list[DotButton.list.length -1].y;
		for (lDot in DotButton.list) {
			lDot.x -= lMoveToCenter;
			lDot.y = lY;
		}
	}
	
	private function createAllDot () : Void {
		var lDeltaX = DotButton.list[1].x - DotButton.list[0].x;
		while (DotButton.list.length < Math.ceil(ShopSheetSettings.length / buildingPerSheet)) {
			var lPosition:Point = DotButton.list[DotButton.list.length -1].position.clone();
			var lDot:DotButton = new DotButton();			
			lDot.position = lPosition;
			lDot.x += lDeltaX;
			addChild(lDot);
		}
		centerDot();

	}
	
	private function listenRightButton() : Void
	{
		cast(getChildByName("RightButton"), Button).click = goRight;
	}
	
	private function listenLeftButton() : Void
	{
		cast(getChildByName("LeftButton"), Button).click = goLeft;
	}
	
	private function goLeft(pEvent:EventTarget) : Void {
		if (positionInShop - buildingPerSheet >= 0) {
			DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setInActive();
			positionInShop -= buildingPerSheet;
			changeSheet();
			DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setActive();
		}
	}
	
	private function goRight(pEvent:EventTarget) : Void {		
		if (positionInShop + buildingPerSheet < ShopSheetSettings.length) {
			DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setInActive();
			positionInShop += buildingPerSheet;
			changeSheet();
			DotButton.list[Math.floor(positionInShop / buildingPerSheet)].setActive();
		}
		
		
	}
	
	private function changeSheet() : Void {
		ItemBuilding.list[0].changeItemSelect(ShopSheetSettings[positionInShop]);
		ItemBuilding.list[1].changeItemSelect(ShopSheetSettings[positionInShop + 1]);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		while (ItemBuilding.list.length > 0) {
			ItemBuilding.list[0].destroy();
		}
		while (DotButton.list.length > 0) {
			DotButton.list[0].destroy();
		}
	}
	
}