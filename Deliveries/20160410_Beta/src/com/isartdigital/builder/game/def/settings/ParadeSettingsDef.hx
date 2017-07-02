package com.isartdigital.builder.game.def.settings;

/**
 * @author Flavien
 */

typedef ParadeSettingsDef =
{
	var main_building:Dynamic;
	var spawn_rate:ParadeResourceDef;
	var base_value:ParadeResourceDef;
	var bonus_quality:Map<String, Float>;
}