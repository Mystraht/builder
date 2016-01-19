package com.isartdigital.utils;
import com.isartdigital.builder.game.def.LocalizationDef;
import com.isartdigital.utils.loader.GameLoader;
import haxe.Json;
import haxe.macro.Expr.Var;

	
/**
 * ...
 * @author Thorcal
 */
class Localization 
{
	
	private var myJson:Map<String,String>;
	/**
	 * instance unique de la classe Localization
	 */
	private static var instance: Localization;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Localization {
		if (instance == null) instance = new Localization();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	public function selectJson(pLang:String):Void {
		var json:String = cast (GameLoader.getContent("../localization/" + pLang +".json"));
		myJson = Json.parse(json);
		trace (myJson);
	}
	
	public function getText(pLabel:String):Void {
		trace(myJson[pLabel]);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}