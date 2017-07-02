package com.isartdigital.builder.game.sprites.buildings.def;

/**
 * @author Dorian
 */

typedef BuildingModelDef =
{
	var type:String;
	var name:String;
	var x:Int;
	var y:Int;
	var color:String;
	var buildingLevel:Int;
	@:optional var reference:Building;
	@:optional var last_recolt_at:String;
}