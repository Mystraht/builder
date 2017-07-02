package com.isartdigital.builder.ui.items;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ItemShop extends UIComponent
{
	private var hardPriceTextList:Array<Text> = new Array<Text> ();
	private var itemTitleTextList:Array<Text> = new Array<Text> ();
	private var hardCurrencyAssetList:Array<DisplayObject> = new Array<DisplayObject> ();
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
		setListFromChild("PimientosAsset", hardCurrencyAssetList);
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