package com.isartdigital.builder.api;
import com.isartdigital.services.Users;
import haxe.Json;
import com.isartdigital.utils.Debug;
import js.Browser;

	
/**
 * ...
 * @author Dorian
 */
class ApiUtils 
{
	
	/**
	 * instance unique de la classe ApiUtils
	 */
	private static var instance: ApiUtils;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): ApiUtils {
		if (instance == null) instance = new ApiUtils();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() {}


	/**
	 * Affiche une erreur si il y en a une
	 * @param data Donnée recu par la requête
	 */
	public static function handleError(data:String) {
		if (ApiUtils.isErrorInto(data)) {
			ApiUtils.parseAndHandleErrorData(data);
			return;
		}
	}

	/**
	 * Parse le résultat d’une requête
	 * @param donné renvoyé par la requête
	 * @return resultat de la requête
	 */
	public static function getParsedResultOf(data:Dynamic):Dynamic {
		var results:ResponseDef = cast(Json.parse(data));
		return results.data;
	}

	/**
	 * Permet de savoir si il y a une erreur dans les donnée entré en paramètre
	 * @param data donné à check
	 * @return bool
     */
	public static function isErrorInto(data:Dynamic):Bool {
		var results:ResponseDef = cast(Json.parse(data));

		if (results.error) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Permet d'afficher le message d'erreur & opération spécifique à l'erreur en plus de parser les données
     */
	public static function parseAndHandleErrorData(data:Dynamic):Void {
		var results:ResponseDef = cast(Json.parse(data));
		displayError(results.errorCode, results.errorMessage);
	}

	/**
	 * Permet d'afficher le message d'erreur & opération spécifique à l'erreur
	 * @param	errorCode code d'erreur du message
	 * 		1: Bad token
	 * 		2: Model incorrect
	 * @param	errorMessage
	 */
	public static function displayError(errorCode:Int, errorMessage:String):Void {
		if (errorCode == 1) {
			Browser.getLocalStorage().setItem("token", '');
			Browser.location.href = '/';
		}
		
		Debug.error(errorMessage);
	}
	
	/**
	 * Permet de mettre des paramètre dans un lien HTTP (avec un object)
	 * @param	path Adresse du lien
	 * @param	params Paramètre GET à passer
	 */
	public static function formatPath(path:String, params:Dynamic):String {
		var paramsStringFormatted:String = path + "?";
		var paramKeys:Array<String> = Reflect.fields(params);
		
		for (i in 0...paramKeys.length) {
			paramsStringFormatted += paramKeys[i] + "=" + cast(Reflect.field(params, paramKeys[i])) + "&";
		}
		
		paramsStringFormatted = paramsStringFormatted.substring(0, paramsStringFormatted.length - 1);
		
		return paramsStringFormatted;
	}
	
	public static function updateUserDataWithRequestResult(pData:String) {
		if (ApiUtils.isErrorInto(pData)) {
			ApiUtils.parseAndHandleErrorData(pData);
			return;
		}
		
		Users.updateUserData(cast(ApiUtils.getParsedResultOf(pData)));
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}