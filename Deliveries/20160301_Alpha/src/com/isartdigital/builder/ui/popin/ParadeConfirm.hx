package com.isartdigital.builder.ui.popin;
import com.isartdigital.builder.api.Resources;
import com.isartdigital.builder.game.manager.ParadeManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.uimodule.DisableButton;
import com.isartdigital.builder.ui.uimodule.ShopBuyHardButton;
import com.isartdigital.builder.ui.uimodule.ShopBuySoftButton;
import com.isartdigital.builder.ui.uimodule.ValideButton;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.loader.GameLoader;
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

	/**
	 * instance unique de la classe ParadeConfirm
	 */
	private static var instance: ParadeConfirm;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): ParadeConfirm {
		if (instance == null) instance = new ParadeConfirm();
		return instance;
	}
	
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
		
		hardButton = cast(getChildByName("ShopBuyHardButton"));
		softButton = cast(getChildByName("ShopBuySoftButton"));
		
		priceHardText = cast(getChildByName("PriceHard_txt"));
		priceSoftText = cast(getChildByName("PriceSoft_txt"));
		
		priceSoft = setDataParade().price_soft;
		priceSoftText.text = priceSoft + "";
		
		priceHard = setDataParade().price_hard;
		priceHardText.text = priceHard + "";
		
		hardButton.click = hardButton.tap = onHardButtonClick;
		softButton.click = softButton.tap = onSoftButtonClick;
		setDataParade();
	}
	
	private function onHardButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, Std.int(priceHard))) return;
		ParadeManager.getInstance().buildParade(60, 60, setDataParade().default_gain);
		ParadeManager.getInstance().moveParade(new Coordinate(50, 50));
		Actuate.tween(Camera.getInstance().cameraFocus, 1, { x: ParadeManager.paradeArray[2].position.x, y: ParadeManager.paradeArray[2].position.y } ).ease(Cubic.easeInOut);
		UIManager.getInstance().closeCurrentPopin();
		
	}
	
	
	public function setDataParade():Dynamic {
		var paradeSettingsJson:Dynamic = cast GameLoader.getContent(JsonNames.PARADE_SETTINGS);		
		var paradeSettings:Dynamic = cast(Reflect.field(paradeSettingsJson, "main_building"));
		var paradeLevel:Dynamic = cast(Reflect.field(paradeSettings, "5"));
		
		return paradeLevel;
		
	}
	
	private function onSoftButtonClick(pEvent:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.GOLD, Std.int(priceSoft))) return;
		ParadeManager.getInstance().buildParade(60, 60, setDataParade().default_gain);
		ParadeManager.getInstance().moveParade(new Coordinate(50, 50));
		Actuate.tween(Camera.getInstance().cameraFocus, 1, { x: ParadeManager.paradeArray[2].position.x, y: ParadeManager.paradeArray[2].position.y } ).ease(Cubic.easeInOut);
		UIManager.getInstance().closeCurrentPopin();
	}
	
	override public function destroy():Void 
	{
		hardButton.destroy();
		softButton.destroy();
		instance = null;
		super.destroy();
	}
	
}