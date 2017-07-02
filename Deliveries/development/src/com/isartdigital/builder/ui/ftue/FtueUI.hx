package com.isartdigital.builder.ui.ftue;

import pixi.core.math.shapes.Rectangle;
import Std;
import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.utils.events.EventType;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.Localization;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.utils.system.DeviceCapabilities;
import js.Browser;
import haxe.Timer;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.ui.buttons.NextFtueButton;
import com.isartdigital.builder.ui.buttons.OkFtueButton;
import com.isartdigital.builder.ui.items.Tutor;
import com.isartdigital.utils.ui.UIComponent;
import motion.Actuate;
import motion.easing.Cubic;
import motion.easing.Elastic;
import pixi.core.display.Container;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
@:access(com.isartdigital.builder.ui.ftue.FtueUIBuilder)
class FtueUI extends UIComponent {
	private var container:Container;
	private var textToDisplay:Array<String>;
	private var tutorPosture:String;
	private var startSide:String;
	private var endSide:String;
	private var sideApparition:String;
	private var timeToAppear:Int;
	private var timeToDesappear:Int;
	private var confirmButton:Bool;
	private var eventNameToCatchForDestroying:String;
	private var saveStepOnDestroy:Bool;
	private var onLastPageDisplayingCallback:Void->Void;
	private var onDestroyCallback:Void->Void;

	private var START_DIALOG_BOX_POSITION:Point = new Point(20 + 23, 525 + 10);
	private var END_DIALOG_BOX_POSITION:Point = new Point(652, 710);
	private var BASE_TEXT_POSITION:Point = new Point(46.2005, 542.6);
	private var DIALOG_BOX_SIZE:SizeDef;

	private static inline var TRANSITION_APPEAR_TIME:Float = 0.5;
	private static inline var TRANSITION_DISAPPEAR_TIME:Float = 0.5;

	private var dialogueTextList:Array<Text> = new Array<Text> ();
	private var tuteurs:Array<Tutor> = new Array<Tutor> ();
	private var okFtueButton:OkFtueButton;
	private var nextFtueButton:NextFtueButton;
	private var onDestroyCallbackCalled:Bool = false;

	private var textLineNumber:Int = 0;

	public function new(ftueUIBuilder:FtueUIBuilder) {
		super();
		build();

		DIALOG_BOX_SIZE = {
			width: Std.int(END_DIALOG_BOX_POSITION.x - START_DIALOG_BOX_POSITION.x),
			height: Std.int(END_DIALOG_BOX_POSITION.y - START_DIALOG_BOX_POSITION.y)
		};

		GameStage.getInstance().on(EventType.RESIZE, replace);
		
		container = ftueUIBuilder.container;
		textToDisplay = ftueUIBuilder.textToDisplay;
		tutorPosture = ftueUIBuilder.tutorPosture;
		startSide = ftueUIBuilder.startSide;
		endSide = ftueUIBuilder.endSide;
		sideApparition = ftueUIBuilder.sideApparition;
		timeToAppear = ftueUIBuilder.timeToAppear;
		timeToDesappear = ftueUIBuilder.timeToDesappear;
		confirmButton = ftueUIBuilder.confirmButton;
		eventNameToCatchForDestroying = ftueUIBuilder.eventNameToCatchForDestroying;
		saveStepOnDestroy = ftueUIBuilder.saveStepOnDestroy;
		onLastPageDisplayingCallback = ftueUIBuilder.onLastPageDisplayingCallback;
		onDestroyCallback = ftueUIBuilder.onDestroyCallback;

		interactive = true;

		if (textToDisplay == null) {
			Ftue.event.on(eventNameToCatchForDestroying, cast destroy);
			return;
		} else {
			Ftue.event.on(eventNameToCatchForDestroying, destroyWithFeedBack);
		}

		setMemberFromChild();
		setTextToDisplay(textToDisplay[textLineNumber]);
		setTuteursLabel(tutorPosture);
		attachTo(container);
		subscribeButtonsClick();

		okFtueButton.visible = false;

		if (!canShowNextButton()) {
			hideNextButton();
			onLastPageDisplayingCallback();
			if (confirmButton) {
				okFtueButton.visible = true;
			}
		} else {
			okFtueButton.visible = false;
		}

		// hotfix ATTENTION
		removeAllListeners();
	}
	
	private function replace(pEvent:EventTarget = null) {
		if (sideApparition == "left" || sideApparition == null) {
			x = getLeftPositionInScreen();
		} else if (sideApparition == "right") {
			var rect:Rectangle = DeviceCapabilities.getScreenRect(parent);
			x = (rect.x + rect.width) - width;
		}
	}
	
	private function getLeftPositionInScreen() : Float {
		return DeviceCapabilities.getScreenRect(parent).x;
	}
	
	public function show():Void {
		y += Hud.getInstance().getParadeButton().y - height;

		if (sideApparition == "left" || sideApparition == null) {
			x = getLeftPositionInScreen() - width;
			Timer.delay(function () {
				Actuate.tween(this, TRANSITION_APPEAR_TIME, { x : getLeftPositionInScreen() } ).ease(Elastic.easeOut);
			}, timeToAppear);
		} else if (sideApparition == "right") {
			var rect:Rectangle = DeviceCapabilities.getScreenRect(parent);
			x = (rect.x + rect.width) + width;

			Timer.delay(function () {
				Actuate.tween(
					this, TRANSITION_APPEAR_TIME, {
						x : (rect.x + rect.width) - width
					}
				).ease(Elastic.easeOut);
			}, timeToAppear);
		}
	}

	public function destroyWithFeedBack (e:Dynamic) : Void {
		if (saveStepOnDestroy) {
			saveStep();
		}
		callOnDestroyCallback();
		Timer.delay(function () {
			Actuate.tween(this, TRANSITION_DISAPPEAR_TIME, { y : parent.height, alpha : 0 } ).ease(Cubic.easeInOut).onComplete(destroy);
		}, timeToDesappear);
	}

	private function setMemberFromChild () : Void {
		setListFromChild("Dialogue_txt", cast(dialogueTextList));
		setListFromChild("Tutor", cast(tuteurs));
		okFtueButton = cast(getChildByName("OkFtueButton"), OkFtueButton);
		nextFtueButton = cast(getChildByName("NextFtueButton"), NextFtueButton);
	}

	private function showNextButton () : Void {
		nextFtueButton.visible = true;
	}
	
	private function hideNextButton () : Void {
		nextFtueButton.visible = false;
	}
	
	private function setTextToDisplay (text:String) : Void {
		for (dialogueText in dialogueTextList) {
			dialogueText.text = Localization.getText(text);
			setTextCentered(dialogueText);
		}
	}

	private function setTuteursLabel (label:String) : Void {
		for (tuteur in tuteurs) {
			tuteur.gotoLabel(label);
		}
	}

	private function setTextCentered(text:Text):Void {
		var xOffset:Float = (text.width - DIALOG_BOX_SIZE.width) / 2;
		var yOffset:Float = (text.height - DIALOG_BOX_SIZE.height) / 2;
		text.x = BASE_TEXT_POSITION.x;
		text.y = BASE_TEXT_POSITION.y;
		text.x -= xOffset + 11;
		text.y -= yOffset + 5;
	}

	private function attachTo(container:Container):Void {
		container.addChildAt(this, 0);
		x -= width;
	}

	private function saveStep():Void {
		Browser.getLocalStorage().setItem(Ftue.LOCALSTORAGE_STEP_KEY, Std.string(GameManager.getInstance().ftue.getCurrentStep()));
	}

	private function subscribeButtonsClick () : Void {
		okFtueButton.click = okFtueButton.tap = onOkFtueButtonClick;
		nextFtueButton.click = nextFtueButton.tap = onNextFtueButtonClick;
	}

	private function onNextFtueButtonClick (event:EventTarget) : Void {
		textLineNumber++;
		setTextToDisplay(textToDisplay[textLineNumber]);
		if (!canShowNextButton()) {
			hideNextButton();
			onLastPageDisplayingCallback();
			if (confirmButton) {
				okFtueButton.visible = true;
			}
		}
	}

	private function canShowNextButton():Bool {
		return textLineNumber + 1 < textToDisplay.length;
	}
	
	private function onOkFtueButtonClick (event:EventTarget) : Void {
		okFtueButton.click = okFtueButton.tap = null;
		Ftue.event.emit(FtueEvents.FTUEUI_OK);
	}

	private function callOnDestroyCallback():Void {
		if (onDestroyCallbackCalled) {
			return;
		}
		onDestroyCallbackCalled = true;
		onDestroyCallback();
	}

	override public function destroy():Void
	{
		Ftue.event.off(eventNameToCatchForDestroying, destroyWithFeedBack);
		Ftue.event.off(eventNameToCatchForDestroying, cast destroy);

		if (textToDisplay != null) {
			parent.removeChild(this);

			for (i in -(dialogueTextList.length-1)...0) {
				dialogueTextList.shift().destroy();
			}

			for (i in -(tuteurs.length-1)...0) {
				tuteurs.shift().destroy();
			}
		} else {
			callOnDestroyCallback();
		}
		
		super.destroy();
	}
}