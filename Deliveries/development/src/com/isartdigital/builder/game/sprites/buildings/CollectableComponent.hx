package com.isartdigital.builder.game.sprites.buildings;

/**
 * ...
 * @author Dorian MILLIERE
 */
class CollectableComponent
{
	public var lastRecoltAt:Date;
	
	public function new() 
	{
		
	}
	
	public function collect():Void {
		trace('collecté');
	}
}