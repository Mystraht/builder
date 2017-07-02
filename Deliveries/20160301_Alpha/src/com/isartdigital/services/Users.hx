package com.isartdigital.services;
import com.isartdigital.builder.game.def.UserInfoDef;
import haxe.Json;

/**
 * ...
 * @author Dorian MILLIERE
 */
class Users
{
	
	public static var infos:UserInfoDef;

	public static function setInfos(infosSource:Dynamic) {
		var infosSourceTyped:UserInfoDef = typeUserInfos(infosSource);
		return infos = infosSourceTyped;
	}	
	
	private static function typeUserInfos(userInfos:Dynamic):UserInfoDef {
		for (i in 0...userInfos.lanterns.length) {
			userInfos.lanterns[i].x = Std.int(userInfos.lanterns[i].x);
			userInfos.lanterns[i].y = Std.int(userInfos.lanterns[i].y);
		}
		
		userInfos.dailyreward = Date.fromString(userInfos.dailyreward);
		userInfos.experience = Std.int(userInfos.experience);
		userInfos.ftue_complet = userInfos.ftue_complet == 1;
		userInfos.parade = Date.fromString(userInfos.parade);
		userInfos.resources.gold = Std.int(userInfos.resources.gold);
		userInfos.resources.offering = Std.int(userInfos.resources.offering);
		userInfos.resources.spice = Std.int(userInfos.resources.spice);
		
		return userInfos;
	}
}