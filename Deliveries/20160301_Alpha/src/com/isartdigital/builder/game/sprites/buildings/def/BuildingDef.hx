package com.isartdigital.builder.game.sprites.buildings.def;
import com.isartdigital.builder.game.def.SizeDef;

/**
 * @author Dorian
 */
typedef BuildingDef =
{
	var name:String;
	var spriteName:String;
	var className:String;
	var component:Array<String>;
	var size:SizeDef;
}