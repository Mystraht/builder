package com.isartdigital.builder.game.utils;

import com.isartdigital.builder.game.def.metadatas.GiftsDef;
import com.isartdigital.builder.game.def.metadatas.BuildingSettingsDef;
import com.isartdigital.builder.game.ftue.def.FtueStepDef;
import com.isartdigital.builder.game.def.metadatas.LevelRewardDef;
import com.isartdigital.builder.game.def.metadatas.ParadePaternDef;
import com.isartdigital.builder.game.def.metadatas.ParadeSettingsDef;
import com.isartdigital.builder.game.def.metadatas.ParadeSettingsDetailDef;
import com.isartdigital.builder.game.def.metadatas.ShopItemDef;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.loader.GameLoader;

/**
 * ...
 * @author Flavien
 */
class Metadatas
{
	public static var levelReward:Array<LevelRewardDef>;
	public static var parade:ParadeSettingsDef;
	public static var paradeDetails:Map<String, ParadeSettingsDetailDef> = new Map<String, ParadeSettingsDetailDef> ();
	public static var paradePattern:ParadePaternDef;
	public static var shopItem:ShopItemDef;
	public static var buildingSettings:BuildingSettingsDef;
	public static var ftue:Array<FtueStepDef>;
	public static var gifts:Array<GiftsDef>;

	public static function init () : Void {
		loadDatas();
		initParadeDetails();
		setBonusQualityInParadeSettings();
	}

	private static function loadDatas():Void {
		levelReward = cast(GameLoader.getContent(JsonNames.LEVEL_REWARD_SETTINGS));
		parade = cast(GameLoader.getContent(JsonNames.PARADE_SETTINGS));
		paradePattern = cast(GameLoader.getContent(JsonNames.PARADE_PATERN));
		shopItem = cast(GameLoader.getContent(JsonNames.SHOP_ITEM));
		buildingSettings = cast(GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS));
		ftue = cast(GameLoader.getContent(JsonNames.FTUE));
		gifts = cast(GameLoader.getContent(JsonNames.GIFTS_SETTINGS));
	}

	private static function initParadeDetails():Void {
		for (data in Reflect.fields(parade.main_building)) {
			paradeDetails.set(data, Reflect.field(parade.main_building, data));
		}
	}

	private static function setBonusQualityInParadeSettings():Void {
		var bonusQuality:Dynamic = Reflect.field(GameLoader.getContent(JsonNames.PARADE_SETTINGS), "bonus_quality");
		parade.bonus_quality = new Map<String, Float> ();
		for (data in Reflect.fields(bonusQuality)) {
			parade.bonus_quality.set(data, Reflect.field(bonusQuality, data));
		}
	}
	
}