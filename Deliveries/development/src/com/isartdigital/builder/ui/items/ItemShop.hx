package com.isartdigital.builder.ui.items;

import pixi.filters.color.ColorMatrixFilter;
import haxe.Timer;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class ItemShop extends UIComponent
{
	private static inline var TOTAL_ERROR_BLINK:Int = 6;
	private static inline var ERROR_BLINK_INTERVAL_DELAY:Int = 150;

	private var hardPriceTextList:Array<Text> = new Array<Text> ();
	private var itemTitleTextList:Array<Text> = new Array<Text> ();
	private var buyHardButtonList:Array<ShopBuyHardButton> = new Array<ShopBuyHardButton> ();
	private var itemAssetList:Array<ItemAssetInShop> = new Array<ItemAssetInShop> ();
	
	private var itemTitleComponentName:String;
	private var itemAssetComponentName:String;
	
	public function new() 
	{
		super();
	}
	
	private function init () : Void {
		setListFromChild("PriceHard_txt", hardPriceTextList);
		setListFromChild(itemTitleComponentName, itemTitleTextList);
		setListFromChild("ShopBuyHardButton", buyHardButtonList);
		setListFromChild(itemAssetComponentName, itemAssetList);
	}
	
	private function setItemAsset (asset:String) : Void {
		for (itemAsset in itemAssetList) {
			itemAsset.setAsset(asset);
		}
	}
	
	public function changeItemSelect (itemName:String) : Void {
		
	}

	public static function applyRedBlinkEffect(target:DisplayObject):Void {
		target.filters = cast Filter.getRed();
		for (i in 0...TOTAL_ERROR_BLINK) {
			var blinkDelay:Int = ERROR_BLINK_INTERVAL_DELAY * i;
			if (i % 2 == 0) {
				Timer.delay(toggleRedFilter(target, cast Filter.getRed()), blinkDelay);
			} else {
				Timer.delay(toggleRedFilter(target, cast Filter.EMPTY_FILTER), blinkDelay);
			}
		}
	}

	private static function toggleRedFilter(target:DisplayObject, filters:Array<ColorMatrixFilter>):Void->Void {
		return function () {
			target.filters = cast filters;
		}
	}
	
	override public function destroy():Void 
	{
		while (buyHardButtonList.length > 0) {
			buyHardButtonList.shift().destroy();
		}		
		
		while (itemAssetList.length > 0) {
			itemAssetList.shift().destroy();
		}

		super.destroy();
	}
}