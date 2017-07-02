package com.isartdigital.utils.ui;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import pixi.core.textures.Texture;
import pixi.core.sprites.Sprite;
import com.isartdigital.utils.events.TouchEventType;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.StateGraphic;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * Classe de base des boutons
 * @author Mathieu ANTHOINE
 */
class Button extends StateGraphic
{
	public static var buttonWasJustClicked:Bool = false;

	private static inline var DELAY_TO_PASS_BUTTON_WAS_JUST_CLIKED_TO_FALSE:Int = 15;
	private static inline var UP:Int = 0;
	private static inline var OVER:Int = 1;
	private static inline var DOWN:Int = 2;

	private var txt:Text;
	
	private var upStyle:TextStyle;
	private var overStyle:TextStyle;
	private var downStyle:TextStyle;
	
	public function new() 
	{
		
		super();
		boxType = BoxType.SELF;
		interactive = true;
		buttonMode = true;
		defaultCursor = 'url(cursor.png)';

		on(MouseEventType.MOUSE_OVER, _mouseOver);
		on(MouseEventType.MOUSE_DOWN, _mouseDown);
		on(MouseEventType.CLICK, _click);
		on(MouseEventType.MOUSE_OUT, _mouseOut);
		on(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		on(TouchEventType.TOUCH_END, _click);
		on(TouchEventType.TOUCH_START, _mouseDown);

		createText();
		start();
	}

	public static function setButtonWasJustClickedToTrue():Void {
		setButtonWasJustClickedTo(true);
		setButtonWasJustClickedToFalseAfterDelay();
	}

	private static function setButtonWasJustClickedToFalseAfterDelay():Void {
		haxe.Timer.delay(function () {
			setButtonWasJustClickedTo(false);
		}, DELAY_TO_PASS_BUTTON_WAS_JUST_CLIKED_TO_FALSE);
	}

	private static function setButtonWasJustClickedTo(state:Bool) {
		buttonWasJustClicked = state;
	}
	
	private function createText ():Void {
		upStyle={ font: "80px Arial", fill: "#000000", align:"center"};
		overStyle={ font: "80px Arial", fill: "#AAAAAA", align:"center"};
		downStyle = { font: "80px Arial", fill: "#FFFFFF", align:"center" };
		txt = new Text("",upStyle);
		txt.anchor.set(0.5, 0.5);
	}
	
	public function setText(pText:String):Void {
		txt.text=pText;
	}
	
	override private function setModeNormal ():Void {
		setState(DEFAULT_STATE);		
		untyped anim.gotoAndStop(UP);
		addChild(txt);
		super.setModeNormal();
	}
	
	private function _mouseVoid ():Void {}

	private function _click (pEvent:EventTarget): Void {
		setButtonWasJustClickedToTrue();
		untyped anim.gotoAndStop(UP);
		SoundManager.playSFX(SoundNames.BUTTON_PRESS);
		txt.style=upStyle;
	}	
	
	private function _mouseDown (pEvent:EventTarget): Void {
		untyped anim.gotoAndStop(DOWN);
		txt.style=downStyle;
	}
	
	private function _mouseOver (pEvent:EventTarget): Void {
		untyped anim.gotoAndStop(OVER);
		txt.style=overStyle;
	}
	
	private function _mouseOut (pEvent:EventTarget): Void {
		untyped anim.gotoAndStop(UP);
		txt.style = upStyle;
	}
	
	override public function destroy ():Void {
		off(MouseEventType.MOUSE_OVER, _mouseOver);
		off(MouseEventType.MOUSE_DOWN, _mouseDown);
		off(MouseEventType.CLICK, _click);
		off(MouseEventType.MOUSE_OUT, _mouseOut);
		off(MouseEventType.MOUSE_UP_OUTSIDE, _mouseOut);
		super.destroy();
	}
}