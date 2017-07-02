package com.isartdigital.builder.game.clipping;

import pixi.core.math.Point;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;

import pixi.core.math.shapes.Rectangle;

class ClippingUtils {
	public static inline var SCREEN_RECT_SAFE_MARGE_COEFICIENT:Float = 0.05;
	public static inline var SCREEN_RECT_SAFE_MARGE_DOWN_IN_PX:Float = 76 * 4;
	public static inline var SCREEN_RECT_SAFE_MARGE_RIGHT_IN_PX:Float = 152 * 2;

	private static inline var OTHER_SIDE_OF_THE_SCRENN:Int = -1;
	private static inline var ADDITIONAL_MODEL_COUNT_TO_GET_TO_HAVE_SAFE_MARGE:Int = 2;

	public static var LEFT:Point = new Point(0, 1);
	public static var RIGHT:Point = new Point(OTHER_SIDE_OF_THE_SCRENN, 1);
	public static var TOP:Point = new Point(1, 0);
	public static var DOWN:Point = new Point(1, OTHER_SIDE_OF_THE_SCRENN);

	private static var screenRect:Rectangle;

	public function new() {}

	public static function debugClipping(line:Point, offset:Float = 0):Void {
		var models:Array<Point> = getModelsPositionWithOffsetForBunchOf(line, offset);

		for (i in 0...models.length) {
			if (Tile.getTileAt(models[i]) != null) {
				Tile.getTileAt(models[i]).alpha = 1;
			}
		}
	}

	public static function getAllModelsInScreen():Array<Point> {
		updateScreenRect();
		var lineCount:Int = getModelCountFor(LEFT);
		return getModelsPositionWithOffsetForBunchOf(TOP, -lineCount);
	}

	public static function getModelsPositionWithOffsetForBunchOf(line:Point, offset:Float = 0):Array<Point> {
		updateScreenRect();
		var modelsPosition:Array<Point> = getModelsPositionWithOffsetFor(line, 0);
		var index:Int;

		for (i in 1...Std.int(Math.abs(offset))) {
			index = offset < 0 ? i * -1 : i;
			modelsPosition = modelsPosition.concat(getModelsPositionWithOffsetFor(line, index));
		}

		return modelsPosition;
	}

	public static function getScreenRectWithSafeMargeByCoefs(safeMargeCoef:Float, safeMargeDown:Float, safeMargeRight:Float):Rectangle {
		var screenRect:Rectangle = screenRect.clone();

		var safeMarge:Point = new Point(
			screenRect.width * safeMargeCoef,
			screenRect.height * safeMargeCoef
		);

		screenRect.x -= safeMarge.x;
		screenRect.y -= safeMarge.y;
		screenRect.width += safeMarge.x * 2;
		screenRect.height += safeMarge.y * 2;
		screenRect.width += safeMargeRight;
		screenRect.height += safeMargeDown;

		return screenRect;
	}

	private static function getModelsPositionWithOffsetFor(line:Point, offset:Float = 0):Array<Point> {
		var line:Point = line.clone();
		var modelsPosition:Array<Point> = [];
		var tilePosition:Point;
		var linePerpendicular:Point = perpendicular(line);
		var modelCount:Int = getModelCountFor(line);
		var perpendicularOffset:Int = getModelCountFor(linePerpendicular);
		var index:Float;
		var verticalSeparationCoef:Int;
		var horizontalSeparationCoef:Int;

		if (isAtOtherEdgeOfScreenFor(line)) {
			offset += perpendicularOffset;
		} else {
			offset *= -1;
		}

		offset += line.x == OTHER_SIDE_OF_THE_SCRENN ? perpendicularOffset : 0;

		transformNegativeToZeroFor(line);
		transformNegativeToZeroFor(linePerpendicular);

		verticalSeparationCoef = Std.int(line.x + 1);
		horizontalSeparationCoef = Std.int(line.y + 1);

		for	(i in 0...Std.int(modelCount * verticalSeparationCoef + ADDITIONAL_MODEL_COUNT_TO_GET_TO_HAVE_SAFE_MARGE)) {
			index = i / verticalSeparationCoef;
			tilePosition = new Point(
				screenRect.x + (index * Config.tileWidth * line.x) + (Config.tileWidth * (offset / horizontalSeparationCoef) * linePerpendicular.x),
				screenRect.y + (index * Config.tileHeight * line.y) + (Config.tileHeight * (offset / horizontalSeparationCoef) * linePerpendicular.y)
			);

			modelsPosition.push(IsoManager.isoToModelView(tilePosition));
		}

		return modelsPosition;
	}

	private static function updateScreenRect():Void {
		screenRect = GameManager.getInstance().getScreenRect().clone();
		screenRect = getScreenRectWithSafeMargeByCoefs(
			SCREEN_RECT_SAFE_MARGE_COEFICIENT,
			SCREEN_RECT_SAFE_MARGE_DOWN_IN_PX,
			SCREEN_RECT_SAFE_MARGE_RIGHT_IN_PX
		);
		truncateScreenRectByTileLength();
	}

	private static function truncateScreenRectByTileLength():Void {
		screenRect.x /= Config.tileWidth;
		screenRect.y /= Config.tileHeight;
		screenRect.x = Math.floor(screenRect.x);
		screenRect.y = Math.floor(screenRect.y);
		screenRect.x *= Config.tileWidth;
		screenRect.y *= Config.tileHeight;
	}

	private static function perpendicular(line:Point) {
		var lineCloned:Point = line.clone();
		lineCloned.x = line.y;
		lineCloned.y = line.x;
		return lineCloned;
	}

	private static function getModelCountFor(line:Point):Int {
		var line:Point = line.clone();
		line.x = line.x == OTHER_SIDE_OF_THE_SCRENN ? 0 : line.x;
		line.y = line.y == OTHER_SIDE_OF_THE_SCRENN ? 0 : line.y;

		var modelCount:Int = Math.round(
			(screenRect.width / Config.tileWidth) * line.x +
			(screenRect.height / Config.tileHeight) * line.y
		);

		return Std.int(Math.abs(modelCount));
	}

	private static function isAtOtherEdgeOfScreenFor(line:Point):Bool {
		return (
			line.x == OTHER_SIDE_OF_THE_SCRENN ||
			line.y == OTHER_SIDE_OF_THE_SCRENN
		);
	}

	private static function transformNegativeToZeroFor(point:Point):Void {
		point.x = point.x < 0 ? 0 : point.x;
		point.y = point.y < 0 ? 0 : point.y;
	}
}
