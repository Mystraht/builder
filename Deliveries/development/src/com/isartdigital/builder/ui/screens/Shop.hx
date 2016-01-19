package com.isartdigital.builder.ui.screens;

import com.isartdigital.utils.ui.Screen;

	
/**
 * ...
 * @author Roman CHEVASSU
 */
class Shop extends Screen 
{
	
	/**
	 * instance unique de la classe Shop
	 */
	private static var instance: Shop;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Shop {
		if (instance == null) instance = new Shop();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
		build();
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}