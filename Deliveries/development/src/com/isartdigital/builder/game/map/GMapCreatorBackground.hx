package com.isartdigital.builder.game.map;

import pixi.core.math.Point;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.Config;
import com.isartdigital.builder.game.sprites.Background;
import com.isartdigital.builder.game.def.BackgroundModelDef;

class GMapCreatorBackground {
	public function new() {
	}

	/**
	 * Insert les backgrounds dans la map passé en paramètre
	 * @param	map<Map<Int<Array<Dynamic>>>
	 */
	public static function insertBackgroundsInto(map:Map<Int, Map<Int, Array<Dynamic>>>):Void {
		var backgroundModel:BackgroundModelDef;

		for (y in 0...Config.mapSize) {
			for (x in 0...Config.mapSize) {
				if (canAddBackgroundAt(new Point(x, y))) {
					backgroundModel = {
						type: ModelElementNames.BACKGROUND,
						x: Std.int(x),
						y: Std.int(y)
					};

					if (!GMap.isPositionExistAt(new Point(x, y), map)) {
						if (!map.exists(y)) {
							map[y] = new Map<Int, Array<Dynamic>> ();
						}
						map[y][x] = new Array<Dynamic>();
					}

					map[y][x].push(backgroundModel);
				}
			}
		}
	}

	private static function canAddBackgroundAt(position:Point) {
		return (
			Std.int(position.x) % Background.BACKGROUND_WIDTH == 0 &&
			Std.int(position.y) % Background.BACKGROUND_HEIGHT == 0
		);
	}
}
