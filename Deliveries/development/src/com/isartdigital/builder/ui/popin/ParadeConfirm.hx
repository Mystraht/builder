package com.isartdigital.builder.ui.popin;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.MathUtils;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Bounce;
import motion.easing.Cubic;
import motion.easing.Quad;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien & Steven
 */
class ParadeConfirm extends Popin
{	
	private var hardButton:ShopBuyHardButton;
	private var softButton:ShopBuySoftButton;
	private var priceHardText:Text;
	private var priceSoftText:Text;
	
	private var softPrice:String;
	
	public var priceSoft:Float;
	public var priceHard:Float;
	
	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
		
		setPrice();
		setTextPrice();
		
		subscribeButtonClick();
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	public function getSoftButton () : ShopBuySoftButton {
		return softButton;
	}
	
	private function subscribeButtonClick () : Void {
		hardButton.click = hardButton.tap = onHardButtonClick;
		softButton.click = softButton.tap = onSoftButtonClick;
	}
	
	private function unsubscribeButtonClick () : Void {
		hardButton.click = hardButton.tap = null;
		softButton.click = softButton.tap = null;
	}
	
	private function setVariableFromChild () : Void {
		hardButton = cast(getChildByName("BuyHardButton"));
		softButton = cast(getChildByName("BuyPesosButton"));
		
		priceHardText = cast(getChildByName("PriceHard_txt"));
		priceSoftText = cast(getChildByName("PriceSoft_txt"));
	}
	
	private function setTextPrice () : Void {
		priceSoftText.text = Std.string(priceSoft);
		priceHardText.text = Std.string(priceHard);
	}
	
	private function setPrice () : Void {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		priceSoft = Metadatas.paradeDetails.get(Std.string(mainBuildingLvl)).price_soft;
		priceHard = Metadatas.paradeDetails.get(Std.string(mainBuildingLvl)).price_hard;
	}
	
	private function onSoftButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, Std.int(priceSoft))) {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_NOMONEY);
			return;
		}
		UIManager.getInstance().closeCurrentPopin();
		GameManager.getInstance().startParade(false);
		Ftue.event.emit(FtueEvents.PARADE_LAUNCHED);
	}

	private function onHardButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, Std.int(priceHard))) {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_NOMONEY);
			return;
		}
		UIManager.getInstance().closeCurrentPopin();
		GameManager.getInstance().startParade(true);
		Ftue.event.emit(FtueEvents.PARADE_LAUNCHED);
	}
	
	override public function destroy():Void 
	{
		unsubscribeButtonClick();
		hardButton.destroy();
		softButton.destroy();
		super.destroy();
	}
	
}