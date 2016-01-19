package com.isartdigital.builder.game.manager;

	
/**
 * ...
 * @author Thorcal
 */
class RessourceManager extends Manager 
{
	
	private var warehousesNb:Int = 1;
	
	//max stock per ressource
	public var maxStock:Int;
	
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
			Ressources.DIAMONDS => 0,
			Ressources.GOLD => 0,
			Ressources.WOOD => 0
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
		if (ressources[pRessource] < countMaxStock(pRessource)) {
			ressources[pRessource] += pNumber;
		}else {
			trace ("Nombre de ressources maximal atteint");
		}
	}
	
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
	
	/**
	 * Renvoie le nombre maximum de ressource capable d'être stocké pour pRessource
	 * @param	pRessource
	 */
	private function countMaxStock(pRessource:Ressources):Int {
		if (pRessource != Ressources.DIAMONDS) {
			maxStock = 100 + (100 * warehousesNb);
			return maxStock;
		}else {
			maxStock = -1;
			return maxStock;
		}
	}
	
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
	}

}