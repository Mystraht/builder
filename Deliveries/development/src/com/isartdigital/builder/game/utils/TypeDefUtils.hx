package com.isartdigital.builder.game.utils;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;

/**
 * ...
 * @author Flavien
 */
class TypeDefUtils
{
	public static var tileSavedDef:TileSavedDef = { x:null, y:null, isBuildable:null };
	public static var buildingSavedDef:BuildingSavedDef = { name: null, x:null, y:null, buildingLevel:null };
	
	public function new() 
	{
		
	}
		
	/**
	 * 
	 * @param	pTypeDef
	 * @return
	 */
	public static function getValue(pTypeDef:Dynamic) : Dynamic
	{
		if (Reflect.hasField(pTypeDef, "x")) trace("he got");
		return null;
	}
	
	/**
	 * Test si deux typeDef sont identique ou non
	 * Note : faire la comparaison entre deux instance de typedef
	 * @param	pType1
	 * @param	pType2
	 * @return true si identique, sinon false
	 */
	public static function compare(pType1:Dynamic, pType2:Dynamic) :Bool
	{
		var lArray1:Array<String> = Reflect.fields(pType1);
		var lArray2:Array<String> = Reflect.fields(pType2);
		
		if (lArray1.length != lArray2.length) return false;
		
		for (lString in lArray1)
		{
			if (lArray2.indexOf(lString) < 0) return false;
		}
		
		return true;
	}
	
}