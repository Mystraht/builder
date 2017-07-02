package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.game.def.settings.LevelRewardDef;
import com.isartdigital.builder.game.def.settings.ParadePaternDef;
import com.isartdigital.builder.game.def.settings.ParadeSettingsDef;
import com.isartdigital.builder.game.def.settings.ParadeSettingsDetailDef;
import com.isartdigital.builder.game.def.settings.RessourceItemDef;
import com.isartdigital.builder.game.def.settings.ShopItemDef;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.loader.GameLoader;

/**
 * ...
 * @author Flavien
 */
class Settings
{
	public static var levelReward:Array<LevelRewardDef>;
	public static var parade:ParadeSettingsDef;
	public static var paradeDetails:Map<String, ParadeSettingsDetailDef> = new Map<String, ParadeSettingsDetailDef> ();
	public static var paradePatern:ParadePaternDef;
	public static var shopItem:ShopItemDef;
	
	public static function init () : Void {
		levelReward = cast(GameLoader.getContent(JsonNames.LEVEL_REWARD_SETTINGS));
		parade = cast(GameLoader.getContent(JsonNames.PARADE_SETTINGS));
		paradePatern = cast(GameLoader.getContent(JsonNames.PARADE_PATERN));
		
		shopItem = cast(GameLoader.getContent(JsonNames.SHOP_ITEM));
		
		for (data in Reflect.fields(parade.main_building)) {
			paradeDetails.set(data, Reflect.field(parade.main_building, data));
		}
		
		var bonusQuality:Dynamic = Reflect.field(GameLoader.getContent(JsonNames.PARADE_SETTINGS), "bonus_quality");
		parade.bonus_quality = new Map<String, Float> ();
		for (data in Reflect.fields(bonusQuality)) {
			parade.bonus_quality.set(data, Reflect.field(bonusQuality, data));
		}
	}
	
}