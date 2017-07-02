package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.builder.ui.buttons.CloseButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class LanternConfirm extends Popin
{
	public static var BUYHARD:String = "BUYHARDLANTERN";
	public static var BUYSOFT:String = "BUYSOFTLANTERN";
	
	private var title:Text;
	private var priceHard:Text;
	private var priceSoft:Text;
	
	private var buyHard:ShopBuyHardButton;
	private var buySoft:ShopBuySoftButton;

	public function new() 
	{
		super();
		build();
		
		priceHard = cast(getChildByName("LanternConfirmPriceHard_txt"));
		priceSoft = cast(getChildByName("LanternConfirmPriceSoft_txt"));
		
		var lanternConfig:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		lanternConfig = Reflect.field(lanternConfig, "lanterns");
		
		priceSoft.text = lanternConfig.price + lanternConfig.base_price * Users.infos.lanterns.length;
		priceHard.text = lanternConfig.hard_price + lanternConfig.base_hard_price * Users.infos.lanterns.length;
		
		buyHard = cast(getChildByName("ShopBuyHardButton"));
		buySoft = cast(getChildByName("ShopBuySoftButton"));
		
		buyHard.click = buyHard.tap = onBuyHardButton;
		buySoft.click = buySoft.tap = onBuySoftButton;
	}
	
	private function onBuyHardButton(pEventTarget:EventTarget) : Void {
		//TO DO vérifier que le joueur peux acheter
		Main.getInstance().emit(BUYHARD);
		UIManager.getInstance().closeCurrentPopin();
	}
	
	private function onBuySoftButton(pEventTarget:EventTarget) : Void {
		//TO DO vérifier que le joueur peux acheter
		Main.getInstance().emit(BUYSOFT);
		UIManager.getInstance().closeCurrentPopin();
	}
	
	override public function destroy():Void 
	{
		buyHard.destroy();
		buySoft.destroy();
		super.destroy();
	}
}