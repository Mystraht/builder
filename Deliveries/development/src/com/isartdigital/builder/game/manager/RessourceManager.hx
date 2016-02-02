package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Resources;
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
	
	public var ressources:Map<Ressources,Int> = new Map<Ressources, Int>();
	
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
		ressources = [
			Ressources.SPICE => 15,
			Ressources.GOLD => 0,
			Ressources.OFFERINGS => 0
		];
	}
	
	/**
	 * Renvoie le nombre de ressource pour la ressource donnée en parametre
	 * @param	pRessource
	 */
	public function getRessources(pRessource:Ressources):Int {
		return ressources[pRessource];
	}
	
	/**
	 * Ajoute pNumber à pRessource
	 * @param	pRessource
	 * @param	pNumber
	 */
	public function addRessources(pRessource:Ressources, pNumber:Int):Void {
		ressources[pRessource] += pNumber;
	}
	
	//TO DO
	//Faire un fonction avec parametre l'objet Ressources, et update avec cet objet la map ressources
	
	/**
	 * Retire pNumber à pRessource
	 * @param	pRessource
	 * @param	pNumber
	 */
	public function removeRessources(pRessource:Ressources, pNumber:Int):Void {
		if (ressources[pRessource] > 0) {
			ressources[pRessource] -= pNumber;
		}else {
			trace ("Plus de ressources");
		}
	}	
	
	public var updateSpice:Int->Void;
	public var updateGold:Int->Void;
	public var updateOfferings:Int->Void;
	
	public function updateRessources() {
		Api.resources.get(cbOnResourcesCall);
	
	}
	
	
	private function cbOnResourcesCall(pData:String):Void {
		var lData:DataDef = cast(Json.parse(pData));
		
		if (lData.error) {
			Utils.errorHandler(lData.errorCode, lData.errorMessage);
			return;
		}
		var lResource:ResourceDef = cast(lData.data);
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