package com.isartdigital.builder.ui.popin;


import com.isartdigital.builder.ui.TextUtils;
import com.isartdigital.services.Users;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
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

		priceSoft.text = lanternConfig.price * Users.getTotalIlluminatedLanterns() + lanternConfig.base_price;
		priceHard.text = lanternConfig.hard_price * Users.getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;

		buyHard = cast(getChildByName("BuyHardButton"));
		buySoft = cast(getChildByName("BuyPesosButton"));
		
		buyHard.click = buyHard.tap = onBuyHardButton;
		buySoft.click = buySoft.tap = onBuySoftButton;
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	private function onBuyHardButton(pEventTarget:EventTarget) : Void {
		Main.getInstance().emit(BUYHARD);
	}
	
	private function onBuySoftButton(pEventTarget:EventTarget) : Void {
		Main.getInstance().emit(BUYSOFT);
	}
	
	override public function destroy():Void 
	{
		buyHard.destroy();
		buySoft.destroy();
		super.destroy();
	}
}