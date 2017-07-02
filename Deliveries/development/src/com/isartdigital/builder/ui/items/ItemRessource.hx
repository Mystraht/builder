package com.isartdigital.builder.ui.items;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.ui.items.ItemShop;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.def.metadatas.RessourceItemDef;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.ui.buttons.CashButton;
import com.isartdigital.services.Wallet;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ItemRessource extends ItemShop
{
	private var packageItemName:String = "gold_1";
	
	private var buyCashButtonList:Array<CashButton> = new Array<CashButton> ();
	
	private var currentDefinition:RessourceItemDef;
	
	private var packageGainText:Text;
	private var promotionText:Text;
	
	private var cocardeRessourceAsset:DisplayObject;
	
	public function new() 
	{
		super();
		build();
		
		itemTitleComponentName = "PackageName_txt";
		itemAssetComponentName = "RessourceInShop";
		
		init();
	}
	
	override function init():Void {
		super.init();
		
		setListFromChild("CashButton", buyCashButtonList);
		
		packageGainText = cast(getChildByName("PackageNumber_txt"), Text);
		
		promotionText = cast(getChildByName("promo_txt"), Text);
		cocardeRessourceAsset = getChildByName("cocardeRessourceAsset");
		
		subscribeButtonsClickAndTap(buyHard, cast(buyHardButtonList));
		subscribeButtonsClickAndTap(buyCash, cast(buyCashButtonList));
	}
	
	override public function changeItemSelect(itemName:String):Void 
	{		
		packageItemName = itemName;
		
		setItemAsset(packageItemName);
		
		getItemDefinition();
		updateHardTxt();
		updatePackageInfos();
		updatePromoAssets();
		showGoodButtonAsset();
	}
	
	private function updatePromoAssets (): Void {
		if (currentDefinition.promotion == 0) {
			cocardeRessourceAsset.visible = false;
			promotionText.visible = false;
		} else {
			cocardeRessourceAsset.visible = true;
			promotionText.visible = true;
			promotionText.text = "-" + Std.string(currentDefinition.promotion) + "%";
		}		
	}
	
	private function showGoodButtonAsset () : Void {
		setVisibilityInList((currentDefinition.resource_price == RessourceManager.SPICE),cast( buyHardButtonList));
		setVisibilityInList((currentDefinition.resource_price == RessourceManager.CASH),cast( buyCashButtonList));
	}
	
	private function getItemDefinition () : Void {
		currentDefinition = cast(Reflect.field(Metadatas.shopItem, packageItemName));
	}
	
	private function buyCash (event:EventTarget) : Void {
		Wallet.getMoney(Main.getInstance().getMail() , function (params:Dynamic) {
			if (Reflect.hasField(params, "money")) {
				var money:Float = Reflect.field(params, "money");
				trace("Current Money : " + money);
				if (money > currentDefinition.price) {
					UIManager.getInstance()
						.emit(UIManager.OPEN_POPIN_REQUEST_CONFIRM_CASH
							, [currentDefinition, packageItemName]);
				}
				else {
					ItemShop.applyRedBlinkEffect(buyCashButtonList[0]);
				}
			}
		});
	}
	
	private function buyHard(event:EventTarget) : Void {
		trace("current definition " +currentDefinition.resource_price);
		if (!RessourceManager.getInstance().removeRessources(currentDefinition.resource_price, currentDefinition.price)) {
			ItemShop.applyRedBlinkEffect(event.target);
			return;
		};
		RessourceManager.getInstance().addRessources(currentDefinition.resource_product, currentDefinition.product);
		Api.user.buy(packageItemName);
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
		SoundManager.getSound(SoundNames.BUY).play();
	}
	
	private function updateHardTxt () : Void {
		for (hardText in hardPriceTextList) {
			hardText.text = Std.string(currentDefinition.price);
		}
	}
	
	private function updatePackageInfos () : Void {
		for (title in itemTitleTextList) {
			title.text = Localization.getText("label_" + packageItemName);
		}
		packageGainText.text = Std.string(currentDefinition.product);
	}
	
	override public function destroy():Void 
	{
		unsubscribeButtonsClickAndTap(cast buyCashButtonList);
		unsubscribeButtonsClickAndTap(cast buyHardButtonList);
		for (button in buyCashButtonList) {
			button.destroy();
		}
		super.destroy();
	}
}