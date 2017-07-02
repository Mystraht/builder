package com.isartdigital.builder.game.sprites.buildings.interactionStrategy;

import com.isartdigital.services.Users;
import com.isartdigital.builder.game.manager.RessourceManager;
import Std;
import pixi.core.math.Point;
import haxe.Json;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.Main;
import com.isartdigital.builder.ui.popin.LanternConfirm;
import com.isartdigital.builder.ui.UIManager;

class LanternStrategy extends Building {
	private var lantern:Building;
	private var lanternPopin:LanternConfirm;

	public function new(building:Building) {
		super();
		this.lantern = building;
	}

	public function lanternInteraction() {
		var lanternPopin:LanternConfirm;

		if (isLanternAlreadyIlluminated()) {
			return;
		}

		lanternPopin = new LanternConfirm();

		UIManager.getInstance().openPopin(lanternPopin);
		listenBuyEvent();
	}

	private function isLanternAlreadyIlluminated():Bool {
		return lantern.buildingLevel == 1;
	}

	private function listenBuyEvent():Void {
		Main.getInstance().on(LanternConfirm.BUYSOFT, onBuySoft);
		Main.getInstance().on(LanternConfirm.BUYHARD, onBuyHard);
	}

	private function forgetBuyEvent():Void {
		Main.getInstance().off(LanternConfirm.BUYSOFT, onBuySoft);
		Main.getInstance().off(LanternConfirm.BUYHARD, onBuyHard);
	}

	private function onBuyHard(e:Dynamic):Void {
		buyWith('hard');
	}

	private function onBuySoft(e:Dynamic):Void {
		buyWith('soft');
	}

	private function buyWith(currency:String) {
		var lanternConfig = lantern.getConfig();
		var buildingPosition:Point = lantern.positionToModel(true);
		var isHardPurchasing:Bool = currency == 'hard';
		var lanternCost:Float = lanternConfig.hard_price * getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
		var ressourceTypeToSpend:String;
		var ressourceAmountToSpend:Float;

		if (isHardPurchasing) {
			ressourceTypeToSpend = RessourceManager.SPICE;
			ressourceAmountToSpend = lanternConfig.hard_price * getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
		} else {
			ressourceTypeToSpend = RessourceManager.GOLD;
			ressourceAmountToSpend = lanternConfig.price * getTotalIlluminatedLanterns() + lanternConfig.base_price;
		}

		if (RessourceManager.getInstance().getRessources(ressourceTypeToSpend) > ressourceAmountToSpend) {
			lantern.upgradeBuilding();
			lantern.setUnselectedGraphicState();
			Tile.illumineTileInRadiusAt(buildingPosition, Tile.getLanternActionRadius());
			RessourceManager.getInstance().removeRessources(ressourceTypeToSpend, ressourceAmountToSpend);
			Api.lanterns.create(Std.int(buildingPosition.x), Std.int(buildingPosition.y), isHardPurchasing, cbOnLanternBought);
		} else {
			// todo:
			// msg pas assez de ressource (popin?)
		}

		forgetBuyEvent();
	}

	private function getTotalIlluminatedLanterns():Int {
		return Users.infos.lanterns.length;
	}

	private function cbOnLanternBought(results:String):Void {
		var results:DataDef = cast(Json.parse(results));

		if (results.error) {
			Utils.errorHandler(results.errorCode, results.errorMessage);
			return;
		}
	}
}
