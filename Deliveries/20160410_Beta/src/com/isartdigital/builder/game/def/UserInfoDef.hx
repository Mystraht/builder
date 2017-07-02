package com.isartdigital.builder.game.def;

/**
 * @author Dorian
 */

typedef UserInfoDef =
{
	var buildings:Array<Dynamic>;
	var lanterns:Array<LanternDef>;
	var resources:ResourceDef;
	var gifts:Array<GiftDef>;
	var username:String;
	var parades:ParadeDef;
	var dailyreward:Date;
	var experience:Int;
	var ftue_complet:Bool;
}