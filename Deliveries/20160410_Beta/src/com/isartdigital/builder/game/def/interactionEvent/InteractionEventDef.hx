package com.isartdigital.builder.game.def.interactionEvent;

/**
 * @author Dorian
 */
typedef InteractionEventDef =
{
	var screenX:Int;
	var screenY:Int;
	var clientX:Int;
	var clientY:Int;
	var ctrlKey:Bool;
	var shiftKey:Bool;
	var altKey:Bool;
	var metaKey:Bool;
	var button:Int;
	var buttons:Int;
	var region:String;
	var movementX:Int;
	var movementY:Int;
	var target:Dynamic;
	@:optional var changedTouches:Array<TouchesDef>;
}