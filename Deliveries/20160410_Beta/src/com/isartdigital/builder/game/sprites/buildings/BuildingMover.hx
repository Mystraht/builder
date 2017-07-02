package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.Point;

/**
 * Component du building
 * @author Dorian MILLIERE
 */
class BuildingMover
{
	private var building:StateGraphic;
	private var mousePosition:Point;

	public function new(sprite:StateGraphic)
	{
		this.building = sprite;
	}

	/**
	 * Permet de bouger le building à la position set par "setMousePosition"
	 */
	public function move():Void {
		var centerOfBuildingModel:Point;

		throwErrorIfMousePositionIsNull();

		centerOfBuildingModel = mousePosition;
		centerOfBuildingModel.x = Math.round(centerOfBuildingModel.x);
		centerOfBuildingModel.y = Math.round(centerOfBuildingModel.y);

		building.position = IsoManager.modelToIsoView(centerOfBuildingModel);
	}

	/**
	 * Permet de donner une position pour move()
	 * @param	mousePosition
	 */
	public function setMousePosition(mousePosition:Point):Void {
		this.mousePosition = mousePosition;
	}

	private function throwErrorIfMousePositionIsNull():Void {
		if (mousePosition == null) {
			mousePositionNullException();
		}
	}

	private function mousePositionNullException() {
		throw BuildingExceptions.mousePositionNotSet;
	}
}