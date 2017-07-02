package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.buttons.ParadeButton;
import com.isartdigital.builder.ui.buttons.ShopButton;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.ui.Screen;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * Classe en charge de gérer les informations du Hud
 * @author Mathieu ANTHOINE
 */
class Hud extends Screen 
{
	public static inline var UPDATE_REQUEST_LVL:String = "UPDATE_REQUEST_LVL";
	public static inline var UPDATE_REQUEST_XP:String = "UPDATE_REQUEST_XP";
	
	public static inline var UPDATE_REQUEST_OFFERING_TEXT:String = "UPDATE_OFFERING_TEXT";
	public static inline var UPDATE_REQUEST_PIMIENTOS_TEXT:String = "UPDATE_PIMIENTOS_TEXT";
	public static inline var UPDATE_REQUEST_PESOS_TEXT:String = "UPDATE_GOLD_TEXT";
	
	
	/**
	 * instance unique de la classe Hud
	 */
	private static var instance: Hud;
	
	private var levelComponent:LevelCurrency;
	private var offeringCurrency:OfferingsCurrency;
	private var spiceCurrency:SpiceCurrency;
	private var goldCurrency:GoldCurrency;
	
	private var paradeButton:ParadeButton;
	private var shopButton:ShopButton;
	

	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Hud {
		if (instance == null) instance = new Hud();
		return instance;
	}	
	
	public function new() 
	{
		super();
		_modal = false;
		build();
		
		setVariableFromChild();
		subscribeEvents();
	}
	
	public function getRessourceProductionAssetPositionInHud (ressource:String) : Point {
		var UIResourceComponent:CurrencyAsset;
		
		switch (ressource) {
			case RessourceManager.GOLD:
				UIResourceComponent = getGoldComponent();
			case RessourceManager.OFFERING:
				UIResourceComponent = getOfferingComponent();
			case RessourceManager.SPICE:
				UIResourceComponent = getSpiceComponent();
			default:
				throw 'Hud: ressource value in getRessourceProductionAssetPositionInHud is incorrect';
		}
		
		return new Point (
			UIResourceComponent.x + CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_X,
			UIResourceComponent.y + CurrencyAsset.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y
		);
	}
	
	public function getOfferingComponent () : OfferingsCurrency {
		return offeringCurrency;
	}
	
	public function getGoldComponent () : GoldCurrency {
		return goldCurrency;
	}
	
	public function getSpiceComponent () : SpiceCurrency {
		return spiceCurrency;
	}
	
	public function getLevelComponent () : LevelCurrency {
		return levelComponent;
	}
	
	public function getParadeButton () : ParadeButton {
		return paradeButton;
	}
	
	public function getShopButton () : ShopButton {
		return shopButton;
	}
	
	private function subscribeEvents () : Void {
		on(UPDATE_REQUEST_LVL, updateLevel);
		on(UPDATE_REQUEST_XP, updateXp);
		on(UPDATE_REQUEST_PESOS_TEXT, onUpdatePesos);
		on(UPDATE_REQUEST_PIMIENTOS_TEXT, onUpdatePimientos);
		on(UPDATE_REQUEST_OFFERING_TEXT, onUpdateOffering);
			
		levelComponent.on(MouseEventType.MOUSE_OVER, _mouseOver);
		levelComponent.on(MouseEventType.MOUSE_OUT, _mouseOut);
		levelComponent.on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		
		offeringCurrency.on(MouseEventType.MOUSE_OVER, _mouseOver);
		offeringCurrency.on(MouseEventType.MOUSE_OUT, _mouseOut);
		offeringCurrency.on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		
		spiceCurrency.on(MouseEventType.MOUSE_OVER, _mouseOver);
		spiceCurrency.on(MouseEventType.MOUSE_OUT, _mouseOut);
		spiceCurrency.on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		
		goldCurrency.on(MouseEventType.MOUSE_OVER, _mouseOver);
		goldCurrency.on(MouseEventType.MOUSE_OUT, _mouseOut);
		goldCurrency.on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		
	}
	
	private function unsubscribeEvent () : Void {
		removeListener(UPDATE_REQUEST_LVL, updateLevel);
		removeListener(UPDATE_REQUEST_XP, updateXp);
		removeListener(UPDATE_REQUEST_PESOS_TEXT, onUpdatePesos);
		removeListener(UPDATE_REQUEST_PIMIENTOS_TEXT, onUpdatePimientos);
		removeListener(UPDATE_REQUEST_OFFERING_TEXT, onUpdateOffering);
	}
	
	private function onUpdatePimientos (pesosValue:Int) {
		spiceCurrency.changeDisplayTextValue(pesosValue);
	}
	
	private function onUpdatePesos (pesosValue:Int) {
		goldCurrency.changeDisplayTextValue(pesosValue);
	}
	
	private function onUpdateOffering (offeringValue:Int) {
		offeringCurrency.changeDisplayTextValue(offeringValue);
	}
	
	private function updateXp (pPercentProgress:Float) : Void {
		levelComponent.setProgressBar(pPercentProgress, true);
	}
	
	private function updateLevel (pNumber:Float) : Void {
		levelComponent.setLevel(Std.int(pNumber));
	}
	
	private function setVariableFromChild () : Void {
		levelComponent = cast(getChildByName("LevelCurrency"), LevelCurrency);
		offeringCurrency = cast(getChildByName("OfferingsCurrency"), OfferingsCurrency);
		goldCurrency = cast(getChildByName("GoldCurrency"), GoldCurrency);
		spiceCurrency = cast(getChildByName("SpiceCurrency"), SpiceCurrency);
		paradeButton = cast(getChildByName("ParadeButton"), ParadeButton);
		shopButton = cast(getChildByName("ShopButton"), ShopButton);
	}
	
	/**
	 * repositionne les éléments du Hud
	 * @param	pEvent
	 */
	override private function onResize (pEvent:EventTarget = null): Void {
		super.onResize();
	}	
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {		
		unsubscribeEvent();
		
		levelComponent.destroy();
		offeringCurrency.destroy();
		goldCurrency.destroy();
		spiceCurrency.destroy();
		
		
		instance = null;
		super.destroy();
	}

}