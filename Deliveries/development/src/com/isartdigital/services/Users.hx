package com.isartdigital.services;

import com.isartdigital.builder.api.UserDataDef;
import com.isartdigital.builder.game.def.UserInfoDef;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;

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

	public static function updateUserData(userData:UserDataDef) {
		updateExperience(userData.experience);
		updateGold(userData.gold);
		updateOffering(userData.offering);
		updateSpice(userData.spice);
	}
	
	public static function updateExperience (pExperience:Int) {
		infos.experience = pExperience;
		ExperienceManager.getInstance().emit(ExperienceManager.UPDATE_REQUEST_EXPERIENCE_VALUE);
	}
	
	public static function updateGold (pGold:Int) {
		infos.resources.gold = pGold;
		RessourceManager.getInstance().emit(RessourceManager.UPDATE_REQUEST_GOLD_VALUE);
	}
	
	public static function updateOffering (pOffering:Int) {
		infos.resources.offering = pOffering;
		RessourceManager.getInstance().emit(RessourceManager.UPDATE_REQUEST_OFFERING_VALUE);
	}
	
	public static function updateSpice (pSpice:Int) {
		infos.resources.spice = pSpice;
		RessourceManager.getInstance().emit(RessourceManager.UPDATE_REQUEST_SPICE_VALUE);
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
	
	public static function getMainBuildingLevel () : Int {
		return BuildingUtils.getBuildingsModel(BuildingNames.CITY_HALL)[0].lvl + 1;
	}

	public static function getTotalIlluminatedLanterns():Int {
		return infos.lanterns.length;
	}
}