package com.isartdigital.builder.game.clipping;

import Math;
import pixi.core.math.Point;
import Array;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.sprites.SpriteObject;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.GameObject;
import com.isartdigital.utils.game.Camera;

class Clipping {
	private var clippingGarbageCollector:ClippingGarbageCollector;
	private var clippedModels:Array<Dynamic> = [];
	private var elementsToDisplay:Array<String> = [];
	private var cameraPositionSinceLastClip:Point;

	public function new() {
	}

	public function initialise(elementsToClip:Array<String>):Void {
		clippingGarbageCollector = new ClippingGarbageCollector(this);
		this.elementsToDisplay = elementsToClip;
		var cameraFocus:GameObject = Camera.getInstance().cameraFocus;
		cameraPositionSinceLastClip = new Point(cameraFocus.x, cameraFocus.y);
		displayAllModelsContainedInScreen();
	}

	public function update():Void {
		displayAndRemoveElements();
		updateCameraOffsetByLineToClip();
	}

	private function displayAndRemoveElements():Void {
		var lineToClip:Point = getLineToClipCountTruncated();

		var baseModelToClipFront:Int = 2;
		var baseModelToClipBack:Int = 4;
		var modelToRemoveCount:Int = 2;

		if (lineToClip.x != 0 || lineToClip.y != 0) {
			if (clippingGarbageCollector.canGarbage()) {
				clippingGarbageCollector.cleanNotClippedModelsOutsideOfScreen();
			}
		}

		if (lineToClip.x < 0) {
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.LEFT, baseModelToClipFront * Math.abs(lineToClip.x)));
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.LEFT, -baseModelToClipBack * Math.abs(lineToClip.x)));
			removeElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.RIGHT, modelToRemoveCount * Math.abs(lineToClip.x)));
		} else if (lineToClip.x > 0) {
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.RIGHT, baseModelToClipFront * Math.abs(lineToClip.x)));
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.RIGHT, -baseModelToClipBack * Math.abs(lineToClip.x)));
			removeElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.LEFT, modelToRemoveCount * Math.abs(lineToClip.x)));
		}

		if (lineToClip.y < 0) {
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.TOP, baseModelToClipFront * Math.abs(lineToClip.y)));
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.TOP, -baseModelToClipBack * Math.abs(lineToClip.y)));
			removeElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.DOWN, modelToRemoveCount * Math.abs(lineToClip.y)));
		} else if (lineToClip.y > 0) {
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.DOWN, baseModelToClipFront * Math.abs(lineToClip.y)));
			displayElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.DOWN, -baseModelToClipBack * Math.abs(lineToClip.y)));
			removeElementsIfExistByPositions(ClippingUtils.getModelsPositionWithOffsetForBunchOf(ClippingUtils.TOP, modelToRemoveCount * Math.abs(lineToClip.y)));
		}

	}

	private function displayAllModelsContainedInScreen():Void {
		var modelsPosition:Array<Point> = ClippingUtils.getAllModelsInScreen();

		for (modelPosition in modelsPosition) {
			createElementsIfExistAt(modelPosition);
		}
	}

	private function displayElementsIfExistByPositions(positions:Array<Point>):Void {
		for (position in positions) {
			createElementsIfExistAt(position);
		}
	}

	private function removeElementsIfExistByPositions(positions:Array<Point>):Void {
		for (position in positions) {
			removeElementsIfExistAt(position);
		}
	}

	private function createElementsIfExistAt(position:Point):Void {
		for (elementType in elementsToDisplay) {
			createNewElementIfExistByTypeAt(position, elementType);
		}
	}

	private function removeElementsIfExistAt(position:Point):Void {
		var modelToRemove:Dynamic;

		for (elementType in elementsToDisplay) {
			if (GMap.isElementTypeAt(position, elementType)) {
				modelToRemove = GMap.getElementByTypeAt(position, elementType);
				if (GMap.isModelElementOriginInGlobalMapAt(position, elementType)) {
					removeSpriteObjectByModel(modelToRemove);
				}
			}
		}
	}

	private function createNewElementIfExistByTypeAt(position:Point, type:String):Void {
		var modelToInit:Dynamic;
		var modelClassType:Dynamic;
		var modelClass:IPoolObject;

		if (GMap.isElementTypeAt(position, type)) {
			modelToInit = GMap.getElementByTypeAt(position, type);

			if (!GMap.isModelElementOriginInGlobalMapAt(position, type)) {
				modelToInit = GMap.getElementByTypeAt(new Point(modelToInit.x, modelToInit.y), type);
			}

			if (modelToInit.reference == null) {
				modelClassType = SpriteObject.getSpriteObjectByName(type);
				modelClass = PoolObject.create(modelClassType);
				modelClass.init(modelToInit);
				modelToInit.reference = modelClass;
				clippedModels.push(modelToInit);
			}
		}
	}

	private function removeSpriteObjectByModel(model:Dynamic) {
		if (model.reference != null) {
			clippedModels.splice(clippedModels.indexOf(model), 1);
			model.reference.remove();
			model.reference = null;
		}
	}

	private function updateCameraOffsetByLineToClip():Void {
		var lineToClip:Point = getLineToClipCountTruncated();
		cameraPositionSinceLastClip.x += (lineToClip.x * Config.tileWidth);
		cameraPositionSinceLastClip.y += (lineToClip.y * Config.tileHeight);
	}

	private function getLineToClipCountTruncated():Point {
		var lineToClip:Point = getLineToClipCount();
		var lineToClipTruncated:Point = new Point(
			(lineToClip.x > 0 ? Math.floor(lineToClip.x) : Math.ceil(lineToClip.x)),
			(lineToClip.y > 0 ? Math.floor(lineToClip.y) : Math.ceil(lineToClip.y))
		);
		return lineToClipTruncated;
	}

	private function getLineToClipCount():Point {
		var lastCameraOffset:Point = getCameraOffsetByLastCameraPositionSinceLastClip();
		var lineToClip:Point = new Point(
			lastCameraOffset.x / Config.tileWidth,
			lastCameraOffset.y / Config.tileHeight
		);
		return lineToClip;
	}

	private function getCameraOffsetByLastCameraPositionSinceLastClip():Point {
		var cameraFocus:GameObject = Camera.getInstance().cameraFocus;
		var offset:Point = new Point();
		offset.x = cameraFocus.x - cameraPositionSinceLastClip.x;
		offset.y = cameraFocus.y - cameraPositionSinceLastClip.y;
		return offset;
	}
}
