package com.isartdigital.builder.game.ftue;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.parade.BonusParade;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.ui.hud.BaseBuildingHUD;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.items.ItemBuilding;
import com.isartdigital.builder.ui.popin.ParadeConfirm;
import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.builder.ui.UIManager;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class FtueUtils {
	public static inline var BAR:String = "BAR";
	public static inline var UPGRADE_BUTTON:String = "UPGRADE_BUTTON";
	public static inline var HARD_BUILD_BUTTON:String = "HARD_BUILD_BUTTON";
	public static inline var CITY_HALL:String = "CITY_HALL";
	public static inline var LANTERN:String = "LANTERN";
	public static inline var SHOP_BUTTON:String = "SHOP_BUTTON";
	public static inline var SHOP_BUY_SOFT_BUTTON_LEFT:String = "SHOP_BUY_SOFT_BUTTON_LEFT";
	public static inline var SHOP_BUY_SOFT_BUTTON_RIGHT:String = "SHOP_BUY_SOFT_BUTTON_RIGHT";
	public static inline var PARADE_BUTTON:String = "PARADE_BUTTON";
	public static inline var PARADE_BUY_SOFT_BUTTON:String = "PARADE_BUY_SOFT_BUTTON";
	public static inline var BONUS_PARADE:String = "BONUS_PARADE";

	private static inline var LANTERN_POSITION_FTUE_X:Int = 51;
	private static inline var LANTERN_POSITION_FTUE_Y:Int = 59;

	public static function getInstanceOf(target:String) : DisplayObject {
		var instance:DisplayObject = null;
		
		switch (target) {
			case CITY_HALL : {
				instance = cast(BuildingUtils.getBuildingsModel(BuildingNames.CITY_HALL)[0].reference);
			}
			case BAR : {
				instance = cast(BuildingUtils.getBuildingsModel(BuildingNames.BAR)[0].reference);
			}
			case LANTERN : {
				instance = getLanternInstance();
			}
			case SHOP_BUTTON : {
				instance = cast(Hud.getInstance().getShopButton());
			}
			case SHOP_BUY_SOFT_BUTTON_LEFT : {
				instance = cast(
					cast(
						cast(UIManager.getInstance().getPopins()[0], Shop)
							.getBuildingShop().getLeftItemBuilding(), ItemBuilding)
							.getSoftButton()
				);
			}
			case SHOP_BUY_SOFT_BUTTON_RIGHT : {
				instance = cast(
					cast(
						cast(UIManager.getInstance().getPopins()[0], Shop)
							.getBuildingShop().getRightItem(), ItemBuilding)
							.getSoftButton()
				);

			}
			case PARADE_BUTTON : {
				instance = cast (Hud.getInstance().getParadeButton());
			}
			case PARADE_BUY_SOFT_BUTTON : {
				instance = cast(cast(UIManager.getInstance().getPopins()[0], ParadeConfirm).getSoftButton());
			}
			case BONUS_PARADE : {
				for (bonus in BonusParade.list) {
					var position:Point = IsoManager.isoToModelView(bonus.position);
					if (position.x == 55 && position.y == 47) {
						instance = cast(bonus);
					}
				}
			}
			case UPGRADE_BUTTON : {
				instance = cast(BaseBuildingHUD.getInstance().upgradeButton);
			}
			case HARD_BUILD_BUTTON : {
				instance = cast(BaseBuildingHUD.getInstance().hardBuildButton);
			}
			default : {
				throw 'FtueUtils getInstanceOf : target has wrong value';
				instance = null;
			}
		}
		
		return instance;
	}

	private static function getLanternInstance () : DisplayObject {
		return cast(GMap.getElementByTypeAt(
			new Point(LANTERN_POSITION_FTUE_X, LANTERN_POSITION_FTUE_Y),
			ModelElementNames.BUILDING
		).reference, DisplayObject);
	}
}