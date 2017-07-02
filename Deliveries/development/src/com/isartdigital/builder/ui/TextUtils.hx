package com.isartdigital.builder.ui;
import com.isartdigital.utils.game.Filter;
import pixi.core.math.Point;
import pixi.core.text.Text;
class TextUtils {
	public function new() {
	}

	public static function centerText(text:Text):Void {
		var offset:Point = new Point(
			(text.parent.width - text.width) / 2,
			(text.parent.width - text.width) / 2
		);
		text.x = offset.x;
		text.y = offset.y;
		text.parent.filters = cast Filter.getRed();
	}
}
