package com.isartdigital.builder.ui.items;
import com.isartdigital.builder.game.def.settings.RessourceItemDef;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.manager.Settings;
import pixi.core.display.DisplayObject;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ItemRessource extends ItemShop
{
	private var packageItemName:String = "gold_1";
	
	private var cashCurrencyAssetList:Array<DisplayObject> = new Array<DisplayObject> ();
	
	private var currentDefinition:RessourceItemDef;
	
	public function new() 
	{
		super();
		build();
		
		itemTitleComponentName = "PackageName_txt";
		itemAssetComponentName = "RessourceInShop";
		
		init();
	}
	
	override function init():Void 
	{
		super.init();
		
		setListFromChild("CashAsset", cashCurrencyAssetList);
		
		subscribeButtonsClickAndTap(buyHard, cast(buyHardButtonList));
	}
	
	override public function changeItemSelect(itemName:String):Void 
	{		
		packageItemName = itemName;
		
		setItemAsset(packageItemName);
		
		getItemDefinition();
		updateHardTxt();
		updatePackageName();
		showGoodCurrencyAsset();
	}
	
	private function showGoodCurrencyAsset () : Void {
		setVisibilityInList((currentDefinition.resource_price == RessourceManager.CASH), cashCurrencyAssetList);
		setVisibilityInList(!(currentDefinition.resource_price == RessourceManager.CASH), hardCurrencyAssetList);
	}
	
	private function getItemDefinition () : Void {
		currentDefinition = cast(Reflect.field(Settings.shopItem, packageItemName));
	}
	
	private function buyHard(event:EventTarget) : Void {
		if (currentDefinition.resource_price == RessourceManager.CASH) {
			
		} else {
			if (!RessourceManager.getInstance().removeRessources(currentDefinition.resource_price, currentDefinition.price)) return;
			
			RessourceManager.getInstance().addRessources(currentDefinition.resource_product, currentDefinition.product);
			
		}
		
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
	}
	
	private function updateHardTxt () : Void {
		for (hardText in hardPriceTextList) {
			hardText.text = Std.string(currentDefinition.price);
		}
	}
	
	private function updatePackageName () : Void {
		for (title in itemTitleTextList) {
			title.text =  packageItemName;
		}
	}
	
}