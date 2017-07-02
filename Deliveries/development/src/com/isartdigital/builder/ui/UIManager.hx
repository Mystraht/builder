package com.isartdigital.builder.ui;

import com.isartdigital.builder.game.def.metadatas.RessourceItemDef;
import com.isartdigital.builder.ui.popin.ConfirmCash;
import com.isartdigital.builder.ui.popin.Credit;
import com.isartdigital.builder.ui.popin.FirstConnexion;
import haxe.Timer;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.ui.popin.Pinata;
import com.isartdigital.services.Users;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.ui.hud.HudParade;
import com.isartdigital.builder.ui.popin.DeleteConfirm;
import com.isartdigital.builder.ui.popin.HardBuildConfirm;
import com.isartdigital.builder.ui.popin.LanternInfo;
import com.isartdigital.builder.ui.popin.LevelReward;
import com.isartdigital.builder.ui.popin.NoMoneyInfo;
import com.isartdigital.builder.ui.popin.ParadeContinue;
import com.isartdigital.builder.ui.popin.UpgradeConfirm;
import com.isartdigital.builder.ui.popin.UpgradeConfirmParamsDef;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.popin.LanternConfirm;
import com.isartdigital.builder.ui.popin.MainBuildingInfo;
import com.isartdigital.builder.ui.popin.ParadeConfirm;
import com.isartdigital.builder.ui.popin.ParadeReward;
import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.builder.ui.popin.UpgradeReward;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.ui.Popin;
import com.isartdigital.utils.ui.Screen;
import eventemitter3.EventEmitter;
import pixi.core.display.Container;

/**
 * Manager (Singleton) en charge de gérer les écrans d'interface
 * @author Mathieu ANTHOINE
 */
class UIManager extends EventEmitter
{
	public static inline var CLOSE_POPIN_REQUEST:String = "CLOSE_POPIN_REQUEST";
	
	public static inline var OPEN_POPIN_REQUEST_LANTERNCONFIRM:String = "OPEN_POPIN_REQUEST_LANTERNCONFIRM";
	public static inline var OPEN_POPIN_REQUEST_MAINBUILDINGINFO:String = "OPEN_POPIN_REQUEST_MAINBUILDINGINFO";
	public static inline var OPEN_POPIN_REQUEST_PARADECONFIRM:String = "OPEN_POPIN_REQUEST_PARADECONFIRM";
	public static inline var OPEN_POPIN_REQUEST_PARADEREWARD:String = "OPEN_POPIN_REQUEST_PARADEREWARD";
	public static inline var OPEN_POPIN_REQUEST_SHOP_BUILDING:String = "OPEN_POPIN_REQUEST_SHOP_BUILDING";
	public static inline var OPEN_POPIN_REQUEST_SHOP_RESOURCE:String = "OPEN_POPIN_REQUEST_SHOP_RESOURCE";
	public static inline var OPEN_POPIN_REQUEST_UPGRADEREWARD:String = "OPEN_POPIN_REQUEST_UPGRADEREWARD";
	public static inline var OPEN_POPIN_REQUEST_LEVELREWARD:String = "OPEN_POPIN_REQUEST_LEVELREWARD";
	public static inline var OPEN_POPIN_REQUEST_PARADECONTINUE:String = "OPEN_POPIN_REQUEST_PARADECONTINUE";
	public static inline var OPEN_POPIN_REQUEST_HARDBUILDCONFIRM:String = "OPEN_POPIN_REQUEST_HARDBUILDCONFIRM";
	public static inline var OPEN_POPIN_REQUEST_LANTERNINFO:String = "OPEN_POPIN_REQUEST_LANTERNINFO";
	public static inline var OPEN_POPIN_REQUEST_UPGRADECONFIRM:String = "OPEN_POPIN_REQUEST_UPGRADECONFIRM";
	public static inline var OPEN_POPIN_REQUEST_DELETECONFIRM:String = "OPEN_POPIN_REQUEST_DELETECONFIRM";
	public static inline var OPEN_POPIN_REQUEST_NOMONEY:String = "OPEN_POPIN_REQUEST_NOMONEY";
	public static inline var OPEN_POPIN_REQUEST_PINATA:String = "OPEN_POPIN_REQUEST_PINATA";
	public static inline var OPEN_POPIN_REQUEST_CREDIT:String = "OPEN_POPIN_REQUEST_CREDIT";
	public static inline var OPEN_POPIN_REQUEST_FIRST_CONNEXION:String = "OPEN_POPIN_REQUEST_FRIST_CONNEXION";
	public static inline var OPEN_POPIN_REQUEST_CONFIRM_CASH:String = "OPEN_POPIN_REQUEST_CONFIRM_CASH";
	
	
	public static inline var ON_MOUSE_OVER_UI:String  = "ON_MOUSE_OVER_UI";
	public static inline var ON_MOUSE_OUT_UI:String = "ON_MOUSE_OUT_UI";
	public static var mouseIsOverUI:Bool = false;

	/**
	 * instance unique de la classe UIManager
	 */
	private static var instance: UIManager;

	/**
	 * tableau des popins ouverts
	 */
	private var popins:Array<Popin>;

	public function new() 
	{
		super();
		popins = [];
		subscribeUIEvent();
	}
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): UIManager {
		if (instance == null) instance = new UIManager();
		return instance;
	}
	
	public function getPopins() : Array<Popin> {
		return popins;
	}
	
	/**
	 * Ajoute un écran dans le conteneur de Screens en s'assurant qu'il n'y en a pas d'autres
	 * @param	pScreen Screen à ouvrir
	 */
	public function openScreen (pScreen: Screen): Void {
		closeScreens();
		GameStage.getInstance().getScreensContainer().addChild(pScreen);
		pScreen.open();
	}

	/**
	 * Supprime les écrans dans le conteneur de Screens
	 */
	public function closeScreens (): Void {
		var lContainer:Container = GameStage.getInstance().getScreensContainer();
		while (lContainer.children.length > 0) {
			var lCurrent:Screen = cast(lContainer.getChildAt(lContainer.children.length - 1), Screen);
			lCurrent.interactive = false;
			lContainer.removeChild(lCurrent);
			lCurrent.close();
		}
	}
	
	/**
	 * Ajoute un popin dans le conteneur de Popin
	 * @param	pPopin Popin à ouvrir
	 */
	public function openPopin (pPopin: Popin): Void {
		if (thereIsPopinOpen()) closeCurrentPopin();
		popins.push(pPopin);
		GameStage.getInstance().getPopinsContainer().addChild(pPopin);
		pPopin.open();
		emit(UIManager.ON_MOUSE_OVER_UI);
	}
	
	private function thereIsPopinOpen () : Bool {
		return popins.length >= 1;
	}
	
	/**
	 * Supprime le popin dans le conteneur de Screens
	 */
	public function closeCurrentPopin (): Void {
		if (popins.length == 0) return;
		var lCurrent:Popin = popins.pop();
		lCurrent.interactive = false;
		GameStage.getInstance().getPopinsContainer().removeChild(lCurrent);
		lCurrent.close();
		emit(ON_MOUSE_OUT_UI);
	}
	
	/**
	 * Ajoute le hud dans le conteneur de Hud
	 */
	public function openHud (): Void {
		GameStage.getInstance().getHudContainer().addChild(Hud.getInstance());
		Hud.getInstance().open();
	}
	
	/**
	 * Retire le hud du conteneur de Hud
	 */
	public function closeHud (): Void {
		GameStage.getInstance().getHudContainer().removeChild(Hud.getInstance());
		Hud.getInstance().close();
	}
	
	/**
	 * Ajoute le Hud Parade dans le conteneur de Hud
	 */
	public function openHudParade () : Void {
		GameStage.getInstance().getHudContainer().addChild(HudParade.getInstance());
		HudParade.getInstance().open();
	}
	
	public function closeHudParade () : Void {
		GameStage.getInstance().getHudContainer().removeChild(HudParade.getInstance());
		HudParade.getInstance().close();
	}
	
	/**
	 * met l'interface en mode jeu
	 */
	public function startGame (): Void {
		closeScreens();
		openHud();
	}

	public static function mouseIsInteractingWithUI():Bool {
		return mouseIsOverUI || Button.buttonWasJustClicked;
	}

	public static function mouseIsNotInteractingWithUI():Bool {
		return !mouseIsInteractingWithUI();
	}
	
	private function subscribeUIEvent () : Void {
		on(CLOSE_POPIN_REQUEST, onClosePopin);
		
		on(OPEN_POPIN_REQUEST_LANTERNCONFIRM, onRequestLanternConfirm);
		on(OPEN_POPIN_REQUEST_MAINBUILDINGINFO, onRequestMainBuildingInfo);
		on(OPEN_POPIN_REQUEST_PARADECONFIRM, onRequestParadeConfirm);
		on(OPEN_POPIN_REQUEST_PARADEREWARD, onRequestParadeReward);
		on(OPEN_POPIN_REQUEST_SHOP_BUILDING, onRequestShopBuilding);
		on(OPEN_POPIN_REQUEST_SHOP_RESOURCE, onRequestShopResource);
		on(OPEN_POPIN_REQUEST_UPGRADEREWARD, onRequestUpgradeReward);
		on(OPEN_POPIN_REQUEST_LEVELREWARD, onRequestLevelReward);
		on(OPEN_POPIN_REQUEST_HARDBUILDCONFIRM, onRequestHardBuild);
		on(OPEN_POPIN_REQUEST_PARADECONTINUE, onRequestParadeContinue);
		on(OPEN_POPIN_REQUEST_LANTERNINFO, onRequestLanternInfo);
		on(OPEN_POPIN_REQUEST_UPGRADECONFIRM, onRequestUpgradeConfirm);
		on(OPEN_POPIN_REQUEST_DELETECONFIRM, onRequestDeleteConfirm);
		on(OPEN_POPIN_REQUEST_NOMONEY, onRequestNoMoney);
		on(OPEN_POPIN_REQUEST_PINATA, onRequestPinata);
		on(OPEN_POPIN_REQUEST_CREDIT, onRequestCredit);
		on(OPEN_POPIN_REQUEST_FIRST_CONNEXION, onFirstConnexion);
		on(OPEN_POPIN_REQUEST_CONFIRM_CASH, onConfirmCash);
		
		
		
		on(ON_MOUSE_OVER_UI, onMouseOverUI);
		on(ON_MOUSE_OUT_UI, onMouseOutUI);
	}
	
	private function onFirstConnexion (params:Dynamic) : Void {
		openPopin(new FirstConnexion());
	}
	
	private function onConfirmCash (params:Array<Dynamic>) : Void {
		openPopin(new ConfirmCash(params));
	}
	
	private function onRequestCredit (params:Dynamic) : Void {
		openPopin(new Credit());
	}
	
	private function onRequestPinata (params:Dynamic) : Void {
		openPopin(new Pinata(params));
	}
	
	private function onRequestNoMoney (params:Dynamic) : Void {
		openPopin(new NoMoneyInfo());
	}
	
	private function onRequestDeleteConfirm (params:Dynamic) : Void {
		openPopin(new DeleteConfirm());
	}
	
	private function onRequestUpgradeConfirm (params:UpgradeConfirmParamsDef) : Void {
		openPopin(new UpgradeConfirm(params));
	}
	
	private function onRequestLanternInfo (params:Dynamic) : Void {
		openPopin(new LanternInfo());
	}
	
	private function onRequestParadeContinue (params:Dynamic) : Void {
		openPopin(new ParadeContinue());
	}
	
	private function onRequestHardBuild (price:Dynamic) : Void {
		openPopin(new HardBuildConfirm(price));
	}

	private function onClosePopin(params:Dynamic) : Void {
		closeCurrentPopin();
	}
	
	private function onRequestLevelReward (params:Dynamic) : Void {
		openPopin(new LevelReward());
	}

	private function onRequestLanternConfirm (params:Dynamic) : Void {
		openPopin(new LanternConfirm());
	}

	private function onRequestMainBuildingInfo (params:Dynamic) : Void {
		openPopin(new MainBuildingInfo());
	}

	private function onRequestParadeConfirm (params:Dynamic) : Void {
		openPopin(new ParadeConfirm());
		Ftue.event.emit(FtueEvents.PARADE_CONFIRM);
	}

	private function onRequestParadeReward (resources:Array<Float>) : Void {
		openPopin(new ParadeReward(resources[0], resources[1], resources[2]));
	}

	private function onRequestShopBuilding (params:Dynamic) : Void {
		openPopin(new Shop(Shop.SHOP_SHEET_BUILDING));
		Ftue.event.emit(FtueEvents.SHOP_OPENED);
	}

	private function onRequestShopResource (params:Dynamic) : Void {
		openPopin(new Shop(Shop.SHOP_SHEET_RESSOURCE));
		Ftue.event.emit(FtueEvents.SHOP_OPENED);
	}

	private function onRequestUpgradeReward (params:Dynamic) : Void {
		if (Users.infos.ftue_complet) {
			openPopin(new UpgradeReward());
		}
	}

	private function onMouseOverUI(e:Dynamic):Void {
		setMouseIsOverUIStateTo(true);
	}

	private function onMouseOutUI(e:Dynamic):Void {
		setMouseIsOverUIStateTo(false);
	}

	private function setMouseIsOverUIStateTo(state:Bool):Void {
		mouseIsOverUI = state;
	}

	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}
}