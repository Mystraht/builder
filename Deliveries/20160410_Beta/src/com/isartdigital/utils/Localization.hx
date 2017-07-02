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
	public static inline var LANG_EN = "en";
	public static inline var LANG_FR = "fr";
	
	private static var dictionary:Dynamic;
	
	
	public static function setDataLocalization () : Void {
		dictionary = cast(GameLoader.getContent("json/" + Config.language + ".json"));
	}
	
	public static function getText(pLabel:String):String {
		var text:String = Reflect.field(dictionary, pLabel);
		if (text == null) return pLabel;
		
		return text;
	}

}