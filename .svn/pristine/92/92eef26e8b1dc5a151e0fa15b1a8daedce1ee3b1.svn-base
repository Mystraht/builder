package com.isartdigital.builder.api;
import com.isartdigital.builder.api.Lanterns;
import js.Browser;
import js.html.CreateFileOptions;

	
/**
 * ...
 * @author Flavien
 */
class Api 
{	
	//public static var domain:String = "https://fbgame.isartdigital.com/2017_builder/builder2/api/index.php/v1";
	public static var domain:String = "https://localhostbuilder.com/";
	
	public static var pathApi:String = "api/v1/";
	
	public static var token:String;
	
	public static var user:User;
	public static var gifts:Gifts;
	public static var resources:Resources;	
	public static var buildings:Buildings;
	public static var lanterns:Lanterns;
	
		/**
	 * instance unique de la classe Resources
	 */
	private static var instance: Api;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Api {
		if (instance == null) instance = new Api();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		instance = this;
		
		token = Browser.getLocalStorage().getItem("token");
		
		user = User.getInstance();
		resources = Resources.getInstance();
		buildings = Buildings.getInstance();
		lanterns = Lanterns.getInstance();
		gifts = Gifts.getInstance();
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
}