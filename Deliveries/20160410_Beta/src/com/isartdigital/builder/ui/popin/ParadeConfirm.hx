package com.isartdigital.builder.ui.popin;
import com.isartdigital.builder.api.Resources;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.manager.Settings;
import com.isartdigital.builder.game.parade.Parade;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.buttons.DisableButton;
import com.isartdigital.builder.ui.buttons.ShopBuyHardButton;
import com.isartdigital.builder.ui.buttons.ShopBuySoftButton;
import com.isartdigital.builder.ui.buttons.ValideButton;
import com.isartdigital.services.Users;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.MathUtils;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
import pathfinder.Coordinate;
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
	
	private function subscribeButtonClick () : Void {
		hardButton.click = hardButton.tap = onHardButtonClick;
		softButton.click = softButton.tap = onSoftButtonClick;
	}
	
	private function unsubscribeButtonClick () : Void {
		hardButton.click = hardButton.tap = null;
		softButton.click = softButton.tap = null;
	}
	
	private function setVariableFromChild () : Void {
		hardButton = cast(getChildByName("ShopBuyHardButton"));
		softButton = cast(getChildByName("ShopBuySoftButton"));
		
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
		priceSoft = Settings.paradeDetails.get(Std.string(mainBuildingLvl)).price_soft;
		priceHard = Settings.paradeDetails.get(Std.string(mainBuildingLvl)).price_hard;
	}
	
	private function onSoftButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, Std.int(priceSoft))) return;
		UIManager.getInstance().closeCurrentPopin();
		GameManager.getInstance().startParade(false);
	}
	
	private function onHardButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, Std.int(priceHard))) return;
		UIManager.getInstance().closeCurrentPopin();
		GameManager.getInstance().startParade(true);
	}
	
	override public function destroy():Void 
	{
		unsubscribeButtonClick();
		hardButton.destroy();
		softButton.destroy();
		super.destroy();
	}
	
}