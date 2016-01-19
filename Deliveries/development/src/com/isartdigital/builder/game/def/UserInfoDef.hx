package com.isartdigital.builder.game.def;

/**
 * @author Dorian
 */

typedef UserInfoDef =
{
	buildings:Array<Dynamic>;
	lanterns:Array<LanternDef>;
	resources:ResourceDef;
	gifts:Array<GiftDef>;
	username:String;
	parades:ParadeDef;
	dailyreward:String;
	experience:Int;
	ftue_complet:Bool;
}