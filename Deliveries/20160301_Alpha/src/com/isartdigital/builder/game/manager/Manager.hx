package com.isartdigital.builder.game.manager;

	
/**
 * ...
 * @author Dorian
 */
class Manager 
{
	
	/**
	 * instance unique de la classe Manager
	 */
	private static var instance: Manager;
	
	public var list:Array<Dynamic>;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Manager {
		if (instance == null) instance = new Manager();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}