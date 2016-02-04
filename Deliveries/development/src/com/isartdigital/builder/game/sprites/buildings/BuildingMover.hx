package com.isartdigital.builder.game.sprites.buildings;
import pixi.core.math.Point;

/**
 * ...
 * @author Dorian MILLIERE
 */
class BuildingMover
{
	private var building:Building;
	private var destination:Point;
	
	public function new(building:Building) 
	{
		this.building = building;
	}
	
	public function setDestination(destination:Point):Void {
		this.destination = destination;
	}
	
	public function getDestination():Point {
		if (destination == null) {
			throw 'No destination has been setted';
		}
		
		return destination;
	}
}