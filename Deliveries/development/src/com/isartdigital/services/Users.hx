package com.isartdigital.services;
import com.isartdigital.builder.game.def.UserInfoDef;

/**
 * ...
 * @author Dorian MILLIERE
 */
class Users
{
	
	public static var infos(default, set):UserInfoDef;

	public function new() 
	{
		
	}
	
	
	function set_infos(infosSource:Dynamic) {
		var infosSource:UserInfoDef = typeUserInfos(infosSource);
		return infosSourceTyped;
	}
	
	
	private function typeUserInfos(userInfos:Dynamic):UserInfoDef {
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
	
	
	private function saveUserInfos(userInfos:UserInfoDef): Void {
		GameManager.getInstance().userInfo = userInfos;
		userInfoLoaded = true;
	}
}