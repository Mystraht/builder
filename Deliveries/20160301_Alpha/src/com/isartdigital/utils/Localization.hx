package com.isartdigital.utils;
import com.isartdigital.builder.game.def.LocalizationDef;
import com.isartdigital.builder.Main;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.ui.UIBuilder;
import flump.json.FlumpJSON;
import haxe.Json;
import haxe.macro.Expr.Var;
import pixi.loaders.Loader;

	
/**
 * ...
 * @author Thorcal
 */
class Localization 
{
	
	public var myJson:Map<String,String> = new Map <String, String>();
	public var json:Json;
	public var stringJson:String;
	public static inline var LANG_EN = "en";
	public static inline var LANG_FR = "fr";
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
	
	
	public function setDataLocalization (pData : String) : Void {
		for (label in Reflect.fields(pData)) {
			myJson.set(label, Reflect.field(pData, label));
		}
	}
	
	public function getText(pLabel:String):String {
		return myJson.get(pLabel);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}