package com.isartdigital.builder.api;
import com.isartdigital.utils.Debug;
import js.Browser;

	
/**
 * ...
 * @author Dorian
 */
class Utils 
{
	
	/**
	 * instance unique de la classe Utils
	 */
	private static var instance: Utils;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Utils {
		if (instance == null) instance = new Utils();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	/**
	 * Permet d'afficher le message d'erreur & opération spécifique à l'erreur
	 * @param	errorCode code d'erreur du message
	 * 		1: Bad token
	 * 		2: Model incorrect
	 * @param	errorMessage
	 */
	public static function errorHandler(errorCode:Int, errorMessage:String):Void {
		if (errorCode == 1) {
			Browser.getLocalStorage().setItem("token", '');
			Browser.location.href = '../';
		}
		
		Debug.error(errorMessage);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}