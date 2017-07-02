package com.isartdigital.builder.game.clipping;

import com.isartdigital.utils.events.EventType;
import pixi.core.math.Point;
import com.isartdigital.utils.game.iso.IsoManager;
import pixi.core.math.shapes.Rectangle;

@:access(com.isartdigital.builder.game.clipping.Clipping)
class ClippingGarbageCollector {
	private var clipping:Clipping;

	private var SCREEN_RECT_MARGE_COEF:Float = 0;
	private var garbageCollectorCounter:Int = 0;

	public function new(clipping:Clipping) {
		this.clipping = clipping;
		Main.getInstance().on(EventType.GAME_LOOP, increaseGarbageCollectorCounter);
	}

	public function cleanNotClippedModelsOutsideOfScreen():Void {
		var notInsideScreenModels:Array<Dynamic> = getModelDisplayedOutsideOfTheMap();
		var modelInGlobalMap:Dynamic;

		for (notInsideScreenModel in notInsideScreenModels) {
			notInsideScreenModel.reference.remove();
			notInsideScreenModel.reference = null;
			clipping.clippedModels.splice(clipping.clippedModels.indexOf(notInsideScreenModel), 1);
		}

		garbageCollectorCounter = 0;
	}

	public function canGarbage():Bool {
		return garbageCollectorCounter > 60;
	}

	private function getModelDisplayedOutsideOfTheMap():Array<Dynamic> {
		var elements:Array<Dynamic> = [];
		var modelIsoPosition:Point;
		var screenRect:Rectangle = GameManager.getInstance().getScreenRect().clone();
		screenRect = ClippingUtils.getScreenRectWithSafeMargeByCoefs(
			SCREEN_RECT_MARGE_COEF,
			ClippingUtils.SCREEN_RECT_SAFE_MARGE_DOWN_IN_PX,
			ClippingUtils.SCREEN_RECT_SAFE_MARGE_RIGHT_IN_PX
		);

		for (clippedModel in clipping.clippedModels) {
			modelIsoPosition = IsoManager.modelToIsoView(new Point(clippedModel.x, clippedModel.y));
			if (isElementIsOutsideOfTheScreen(modelIsoPosition, screenRect)) {
				elements.push(clippedModel);
			}
		}

		return elements;
	}

	private function isElementIsOutsideOfTheScreen(clippedModel:Dynamic, screenRect:Rectangle):Bool {
		return (
			clippedModel.x < screenRect.x ||
			clippedModel.x > screenRect.x + screenRect.width ||
			clippedModel.y < screenRect.y ||
			clippedModel.y > screenRect.y + screenRect.height
		);
	}

	private function increaseGarbageCollectorCounter(e):Void {
		garbageCollectorCounter++;
	}
}