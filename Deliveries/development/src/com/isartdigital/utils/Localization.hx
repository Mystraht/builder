package com.isartdigital.utils;
import com.isartdigital.utils.loader.GameLoader;
import haxe.Json;


/**
 * ...
 * @author Thorcal
 */
class Localization 
{
	public static inline var LANG_EN = "en";
	public static inline var LANG_FR = "fr";
	
	private static var dictionary:Dynamic;
	
	
	public static function setDataLocalization(lang:String) : Void {
		try {
			dictionary = cast(GameLoader.getContent("json/" + lang + ".json"));
		} catch(e:String) {
			dictionary = cast(GameLoader.getContent("json/en.json"));
		}
	}
	
	public static function getText(pLabel:String):String {
		var text:String = Reflect.field(dictionary, pLabel);
		if (text == null) return pLabel;
		
		return text;
	}

}