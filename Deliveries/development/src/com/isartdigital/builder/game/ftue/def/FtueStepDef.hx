package com.isartdigital.builder.game.ftue.def;

/**
 * @author Flavien
 */

typedef FtueStepDef =
{		
	var event:String;
	var textLabel:Array<String>;
	var tutorPosture:String;
	var startSide:String;
	var endSide:String;
	var sideApparition:String;
	var timeToAppear:Int;
	var timeToDesappear:Int;
	var confirmButton:Bool;
	var saveStep:Bool;
	var arrow:String;
	var camera:FtueCameraDef;
}