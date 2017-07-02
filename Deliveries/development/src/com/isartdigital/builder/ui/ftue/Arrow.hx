package com.isartdigital.builder.ui.ftue;

import pixi.core.math.Point;
import haxe.Timer;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.parade.BonusParade;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import motion.Actuate;
import motion.easing.Cubic;
import motion.easing.Quad;
import pixi.core.display.DisplayObject;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class Arrow extends StateGraphic
{
	private static inline var BLINK_FREQUENCY:Int = 500;
	private static inline var BRIGHTNESS_INTENSITY:Float = 1.3;

	private static inline var ARROW_ASSET_NAME:String = "Arrow";
	private static inline var TIME_TO_APPEAR:Float = 1;
	private static inline var TIME_TO_DEASAPPEAR:Float = 1;
	
	private var directionAnimation:Float = 1;
	private var target:DisplayObject;
	
	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		boxType = BoxType.NONE;
		super(ARROW_ASSET_NAME);
	}
	
	public function attachTo (target:DisplayObject) : Void {
		this.target = target;
		resizeToMatchWith(target);
		if (isBuildingTarget(cast target)) {
			attachToArrowContainer();
		} else {
			attachToContainerOf(target);
		}
		setPositionAbove(target);
		moveAnimation();
		appearAnimation();
	}
	
	public function destroyWithFeedBack () : Void {
		Actuate.tween(this, TIME_TO_DEASAPPEAR, { alpha : 0 } ).ease(Cubic.easeOut).onComplete(destroy);
	}
	
	public function destroyWhenClick () : Void {
		subscribeClickOrTapOf(target);
	}
	
	private function resizeToMatchWith(target:DisplayObject) : Void {
		if (width < target.getLocalBounds().width) return;
		
		var ratio:Float = target.getLocalBounds().width / width;
		scale.set(ratio, ratio);
	}
	
	private function subscribeClickOrTapOf (target:DisplayObject) : Void {
		target.click = target.tap = onClickOrTapEvent;
	}
	
	private function onClickOrTapEvent (event:EventTarget) : Void {
		destroyWithFeedBack();
	}
	
	private function appearAnimation () : Void {
		alpha = 0;
		Actuate.tween(this, TIME_TO_APPEAR, { alpha : 1} ).ease(Cubic.easeIn);
	}
	
	private function moveAnimation () : Void {
		Actuate.tween(this, 1, { y : y + (this.height / 2) * directionAnimation } ).ease(Quad.easeInOut).onComplete(moveAnimation);
		directionAnimation *= -1;
	}
	
	private function setPositionAbove (target:DisplayObject) : Void {
		toggleBlink();
		position.set(target.x, target.y - (this.height / 2 + target.getLocalBounds().height));
		if (isBuildingTarget(cast target)) {
			var buildingVecticalOffset:Float = 250;
			x -= getLocalBounds().width / 2;
			y -= buildingVecticalOffset;
		}
		if (isBonusTarget(cast target)) {
			var bonusVerticalOffset:Float = 170;
			x -= getLocalBounds().width / 3;
			y -= bonusVerticalOffset;
		}
		if (isPopinButton(cast target)) {
			var offset:Point = new Point(150, -130);
			x += offset.x;
			y += offset.y;
		}
	}

	private function attachToArrowContainer():Void {
		GameStage.getInstance().getArrowContainer().addChild(this);
	}

	private function attachToContainerOf (target:DisplayObject) : Void {
		target.parent.addChild(this);
	}

	private function isBuildingTarget(target:Building):Bool {
		return cast target.type == ModelElementNames.BUILDING;
	}

	private function isBonusTarget(target:BonusParade):Bool {
		return cast target.type == ModelElementNames.BONUS_PARADE;
	}

	private function isPopinButton(target:BonusParade):Bool {
		return (
			target.assetName == "ShopBuySoftButton" ||
			target.assetName == "BuyPesosButton"
		);
	}

	private function toggleBlink():Void {
		if (target != null) {
			target.filters = target.filters == null ? cast Filter.getBrightness(BRIGHTNESS_INTENSITY) : null;
			Timer.delay(toggleBlink, BLINK_FREQUENCY);
		}
	}
	
	override public function destroy():Void 
	{
		target.filters = Filter.EMPTY_FILTER;
		target = null;
		Actuate.stop(this, ["y"], false, false);
		if (parent != null) {
			parent.removeChild(this);
		}
		super.destroy();
	}
	
}