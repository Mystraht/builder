package com.isartdigital.builder.ui.ftue;

import com.isartdigital.builder.game.ftue.Ftue;
import Array;
import pixi.core.display.Container;
class FtueUIBuilder {
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

	private function new() {}

	public static function create():FtueUIBuilder {
		return new FtueUIBuilder();
	}

	public function withContainerToAttach(container:Container):FtueUIBuilder {
		this.container = container;
		return this;
	}

	public function withTextToDisplay(textToDisplay:Array<String>):FtueUIBuilder {
		this.textToDisplay = textToDisplay;
		return this;
	}

	public function withTutorPosture(tutorPosture:String):FtueUIBuilder {
		this.tutorPosture = tutorPosture;
		return this;
	}

	public function withStartSide(startSide:String):FtueUIBuilder {
		this.startSide = startSide;
		return this;
	}

	public function withEndSide(endSide:String):FtueUIBuilder {
		this.endSide = endSide;
		return this;
	}

	public function withSideApparition(side:String):FtueUIBuilder {
		this.sideApparition = side;
		return this;
	}

	public function withTimeToAppear(timeToAppear:Int):FtueUIBuilder {
		this.timeToAppear = timeToAppear;
		return this;
	}

	public function withTimeToDesappear(timeToDesappear:Int):FtueUIBuilder {
		this.timeToDesappear = timeToDesappear;
		return this;
	}

	public function withConfirmButton(confirmButton:Bool):FtueUIBuilder {
		this.confirmButton = confirmButton;
		return this;
	}

	public function withEventNameToCatchForDestroying(eventNameToCatchForDestroying:String):FtueUIBuilder {
		this.eventNameToCatchForDestroying = eventNameToCatchForDestroying;
		return this;
	}

	public function withStepSavingOnDestroy(saveStepOnDestroy:Bool):FtueUIBuilder {
		this.saveStepOnDestroy = saveStepOnDestroy;
		return this;
	}

	public function withLastPageDisplayingCallback(onLastPageDisplayingCallback:Void->Void):FtueUIBuilder {
		this.onLastPageDisplayingCallback = onLastPageDisplayingCallback;
		return this;
	}

	public function withDestroyCallback(onDestroyCallback:Void->Void):FtueUIBuilder {
		this.onDestroyCallback = onDestroyCallback;
		return this;
	}

	public function build():FtueUI {
		return new FtueUI(this);
	}
}
