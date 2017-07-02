package com.isartdigital.services;

/**
 * Service Bancaire
 * @author Mathieu Anthoine
 */
class Bank
{
	
	/**
	 * donne accès au total des revenus générés
	 * @param	pCallback fonction appelée au retour de l'information
	 */
	public static function account (pCallback:Dynamic->Void=null): Void {
		var lRequest:HttpService = new HttpService(pCallback);
		lRequest.addParameter("account", "");
		lRequest.request(true);
	}
	
}