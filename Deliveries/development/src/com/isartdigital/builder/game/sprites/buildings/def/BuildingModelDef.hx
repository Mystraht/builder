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
	@:optional var lvl:Int;
	@:optional var reference:Building;
	@:optional var construct_end_at:String;
	@:optional var last_recolt_at:String;
}