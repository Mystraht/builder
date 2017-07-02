package com.isartdigital.builder.game.sprites.buildings.interactionStrategy;

import com.isartdigital.services.Users;
import com.isartdigital.builder.game.manager.RessourceManager;
import Std;
import pixi.core.math.Point;
import haxe.Json;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.Main;
import com.isartdigital.builder.ui.popin.LanternConfirm;
import com.isartdigital.builder.ui.UIManager;

class LanternStrategy extends Building {
	private var lantern:Building;

	private var ressourceTypeToSpend:String;
	private var ressourceAmountToSpend:Float;

	public function new(building:Building) {
		super();
		this.lantern = building;
	}

	public function lanternInteraction() {
		if (isLanternAlreadyIlluminated() || BuildingUtils.thereIsOtherBuildingMovingThan(lantern) || UIManager.mouseIsOverUI) {
			return;
		}
		
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_LANTERNCONFIRM);
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
		var buildingPosition:Point = lantern.positionToModel(true);
		var isHardPurchasing:Bool = currency == 'hard';

		if (isHardPurchasing) {
			setHardAmountToSpend();
		} else {
			setNormalAmountToSpend();
		}

		if (thereIsEnoughtResources()) {
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

	private function setHardAmountToSpend():Void {
		var lanternConfig = lantern.getConfig();
		ressourceTypeToSpend = RessourceManager.SPICE;
		ressourceAmountToSpend = lanternConfig.hard_price * getTotalIlluminatedLanterns() + lanternConfig.base_hard_price;
	}

	private function setNormalAmountToSpend():Void {
		var lanternConfig = lantern.getConfig();
		ressourceTypeToSpend = RessourceManager.GOLD;
		ressourceAmountToSpend = lanternConfig.price * getTotalIlluminatedLanterns() + lanternConfig.base_price;
	}

	private function thereIsEnoughtResources():Bool {
		return RessourceManager.getInstance().getRessources(ressourceTypeToSpend) > ressourceAmountToSpend;
	}

	private function cbOnLanternBought(results:String):Void {
		var results:ResponseDef = cast(Json.parse(results));

		if (results.error) {
			ApiUtils.displayError(results.errorCode, results.errorMessage);
			return;
		}
	}
}
