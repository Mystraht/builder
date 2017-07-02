package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.services.Users;
import com.isartdigital.builder.game.def.ResourceDef;


/**
 * ...
 * @author Thorcal
 */
class RessourceManager extends Manager 
{
	public static inline var UPDATE_REQUEST_GOLD_VALUE:String = "UPDATE_REQUEST_GOLD_VALUE";
	public static inline var UPDATE_REQUEST_OFFERING_VALUE:String = "UPDATE_REQUEST_OFFERING_VALUE";
	public static inline var UPDATE_REQUEST_SPICE_VALUE:String = "UPDATE_REQUEST_SPICE_VALUE";
	
	public static inline var GOLD:String = 'gold';
	public static inline var OFFERING:String = 'offering';
	public static inline var SPICE:String = 'spice';
	public static inline var CASH:String = 'cash';
	
	public var ressources:ResourceDef;
	
	/**
	 * instance unique de la classe RessourceManager
	 */
	private static var instance: RessourceManager;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): RessourceManager {
		if (instance == null) instance = new RessourceManager();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
		subscribeEvents();
	}
	
	private function subscribeEvents () : Void {
		on(UPDATE_REQUEST_GOLD_VALUE, onUpdateGold);
		on(UPDATE_REQUEST_OFFERING_VALUE, onUpdateOffering);
		on(UPDATE_REQUEST_SPICE_VALUE, onUpdateSpice);
	}
	
	
	private function onUpdateSpice (params:Dynamic) : Void {
		ressources.spice = Users.infos.resources.spice;
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_PIMIENTOS_TEXT, ressources.spice);
	}
	
	private function onUpdateOffering (params:Dynamic) : Void {
		ressources.offering = Users.infos.resources.offering;
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_OFFERING_TEXT, ressources.offering);
	}
	
	private function onUpdateGold (params:Dynamic) : Void {
		ressources.gold = Users.infos.resources.gold;
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_PESOS_TEXT, ressources.gold);
	}
	
	public function start():Void {
		ressources = Users.infos.resources;
		updateRessourcesInHud(ressources);
	}
	
	/**
	 * Renvoie le nombre de ressource pour la ressource donnée en parametre
	 * @param	pRessource
	 */
	public function getRessources(pRessource:String):Int {
		return Reflect.field(ressources, pRessource);
	}
	
	/**
	 * Ajoute pNumber à pRessource
	 * @param	pRessource
	 * @param	pNumber
	 */
	public function addRessources(pRessource:String, number:Float):Void {
		Reflect.setField(ressources, pRessource, Std.int(Std.int(getRessources(pRessource)) + Std.int(number)));
		updateRessourcesInHud(ressources);
	}
	
	/**
	 * Retire pNumber à pRessource
	 * @param	pRessource
	 * @param	pNumber
	 */
	public function removeRessources(pRessource:String, pNumber:Float):Bool {
		if (getRessources(pRessource) - pNumber >= 0) {
			Reflect.setField(ressources, pRessource, getRessources(pRessource) - pNumber);
		} else {
			return false;
		}
		updateRessourcesInHud(ressources);
		return true;
	}
	
	public function updateRessourcesInHud(lResource:ResourceDef) {
		ressources = lResource;
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_PIMIENTOS_TEXT, ressources.spice);
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_PESOS_TEXT, ressources.gold);
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_OFFERING_TEXT, ressources.offering);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
	}

}