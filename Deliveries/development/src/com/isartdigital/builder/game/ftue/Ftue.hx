package com.isartdigital.builder.game.ftue;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.services.Users;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.ui.ftue.Arrow;
import haxe.Timer;
import Std;
import js.Browser;
import com.isartdigital.builder.game.ftue.def.FtueStepDef;
import com.isartdigital.builder.ui.ftue.FtueUIBuilder;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.ui.ftue.FtueUI;
import pixi.core.display.Container;
import eventemitter3.EventEmitter;

class Ftue {
	public static var event:EventEmitter = new EventEmitter();
	public inline static var LOCALSTORAGE_STEP_KEY:String = 'FTUE_STEP';

	public var isParadeStepDone:Bool = false;

	private static inline var TOTAL_STEP:Int = 27;
	private var ftueContainer:Container;
	private var ftueCamera:FtueCamera;
	private var ftueUI:FtueUI;
	private var eventToCatch:String;
	private var step:Int = 0;
	private var arrow:Arrow;
	
	
	public function new(ftueContainer:Container) {
		this.ftueContainer = ftueContainer;

		if (Browser.getLocalStorage().getItem(LOCALSTORAGE_STEP_KEY) != null) {
			step = Std.parseInt(Browser.getLocalStorage().getItem(LOCALSTORAGE_STEP_KEY)) + 1;
		} else {
			step = 0;
		}

		if (!Users.infos.ftue_complet) {
			goToStep(step);
		}

		event.once(FtueEvents.BAR_UPGRADED, cast function () {
			if (step > 15) {
				Api.user.dailyrewardUpdate(GameManager.getInstance().getDailyReward);
			}
		});
	}

	public function getCurrentStep():Int {
		return step;
	}

	public function goToStep(number:Int):Void {
		var stepConfig:FtueStepDef = Metadatas.ftue[number];
		eventToCatch = stepConfig.event;

		ftueUI = FtueUIBuilder.create()
							  .withContainerToAttach(ftueContainer)
							  .withTextToDisplay(stepConfig.textLabel)
							  .withTutorPosture(stepConfig.tutorPosture)
							  .withStartSide(stepConfig.startSide)
							  .withEndSide(stepConfig.endSide)
							  .withSideApparition(stepConfig.sideApparition)
							  .withTimeToAppear(stepConfig.timeToAppear)
							  .withTimeToDesappear(stepConfig.timeToDesappear)
							  .withConfirmButton(stepConfig.confirmButton)
							  .withEventNameToCatchForDestroying(stepConfig.event)
							  .withStepSavingOnDestroy(stepConfig.saveStep)
							  .withLastPageDisplayingCallback(showArrowAndMoveCamera(stepConfig))
							  .withDestroyCallback(goToNextStep)
							  .build();
		if (stepConfig.tutorPosture != null) {
			ftueUI.show();
		}
	}

	private function showArrowAndMoveCamera(ftueStep:FtueStepDef):Void->Void {
		return function () {
			if (ftueStep.camera != null) {
				FtueCamera.moveCameraTo(ftueStep.camera.target, ftueStep.camera.delayBeforeMoving);
			}

			if (ftueStep.arrow != null) {
				arrow = new Arrow ();
				Timer.delay(function() {
					if (arrow != null) {
						arrow.attachTo(FtueUtils.getInstanceOf(ftueStep.arrow));
					}
				}, 500);
			}
		}
	}

	private function goToNextStep ():Void {
		if (arrow != null) {
			arrow.destroyWithFeedBack();
			arrow = null;
		}
		step++;
		if (isFtueComplet()) {
			sendFtueCompletToServer();
		} else {
			goToStep(step);
		}
	}

	private function isFtueComplet():Bool {
		return step >= TOTAL_STEP;
	}

	private function sendFtueCompletToServer():Void {
		Api.user.ftueComplet(ApiUtils.handleError);
	}
}
