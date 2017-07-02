package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Resources;
import com.isartdigital.builder.api.User;
import com.isartdigital.services.Users;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.builder.game.def.ResourceDef;
import com.isartdigital.builder.ui.hud.SpiceCurrency;
import haxe.Json;

	
/**
 * ...
 * @author Thorcal
 */
class RessourceManager extends Manager 
{
	public static inline var GOLD:String = 'gold';
	public static inline var OFFERING:String = 'offering';
	public static inline var SPICE:String = 'spice';
	
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
	public function addRessources(pRessource:String, pNumber:Float):Void {
		Reflect.setField(ressources, pRessource, getRessources(pRessource) + pNumber);
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
		}else {
			return false;
		}
		updateRessourcesInHud(ressources);
		return true;
	}
	
	public var updateSpice:Int->Void;
	public var updateGold:Int->Void;
	public var updateOfferings:Int->Void;
	
	public function updateRessourcesInHud(lResource:ResourceDef) {
		ressources = lResource;
		updateGold(lResource.gold);
		updateSpice(lResource.spice);
		updateOfferings(lResource.offering);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
	}

}