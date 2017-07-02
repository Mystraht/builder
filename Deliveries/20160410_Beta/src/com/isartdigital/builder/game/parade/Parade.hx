package com.isartdigital.builder.game.parade;

import com.isartdigital.builder.game.animation.AnimationNames;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.animation.AnimationHarvestBuilder;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.manager.Settings;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.sprites.Citizen;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.hud.HudParade;
import com.isartdigital.builder.ui.items.ResourcesView;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import com.isartdigital.utils.PointUtils;
import eventemitter3.EventEmitter;
import motion.Actuate;
import motion.easing.Cubic;
import motion.easing.Expo;
import motion.easing.Linear;
import pathfinder.Coordinate;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class Parade extends EventEmitter
{
	/*
	 * Componenent de bonus Generator
	 */
	public var paradeBonusGenerator:ParadeBonusGenerator;
	
	/**
	 * Componenent de la procession
	 */
	public var paradeProcession:ParadeProcession;
	
	/**
	 * Component du controlleur de la parade
	 */
	public var paradeController:ParadeController;
	
	private var pesosGain:Float = 0;
	private var pimientosGain:Float = 0;
	private var offeringGain:Float = 0;
	
	private var active:Bool = false;
	
	private var timeLeft:Float;
	private var currentTime:Float;
	private var timeEnd:Float;
	
	private var bonusPimientosCollected:Int = 0;
	private var bonusPesosCollected:Int = 0;
	private var bonusOfferingCollected:Int = 0;
	private var hardPurchase:Bool;
	private var useHardInParade:Bool = false;
	
	public var hasEndScenario:Bool = false;
	
	public function new() 
	{
		super();
		
		paradeBonusGenerator = new ParadeBonusGenerator(this);
		paradeController = new ParadeController(this);
		paradeProcession = new ParadeProcession(this);
	}
	
	public function start (hardPurchase:Bool) : Void {
		GameManager.USE_MAP_WITH_OBSTACLE = false;
		
		this.hardPurchase = hardPurchase;
				
		openHudParade();
		setHudStartValue();
		active = true;
		
		paradeProcession.constructParade();
		paradeBonusGenerator.generateBonusScenario();
		
		var positionForCameraFocus:Point = IsoManager.modelToIsoView(paradeProcession.endPositionScenario);
		Actuate.tween(Camera.getInstance().cameraFocus.position, 2, { x: positionForCameraFocus.x, y : positionForCameraFocus.y } ).ease(Linear.easeNone);
	}
	
	public function startParadeForUser () : Void {
		GameManager.USE_MAP_WITH_OBSTACLE = true;
		paradeProcession.setParadeFullAlpha();
		
		hasEndScenario = true;

		startTimer();

		paradeBonusGenerator.generateBonus();
		paradeController.start();


	}
	
	private function getBonusRessourceGain (bonusType:String) : String {
		switch (bonusType) {
			case BonusType.BONUS_PESOS:
				return RessourceManager.GOLD;
			case BonusType.BONUS_OFFERING:
				return RessourceManager.OFFERING;
			case BonusType.BONUS_PIMIENTOS:
				return RessourceManager.SPICE;
			default:
				throw 'Parade: bonusType value in getBonusRessourceGain is incorrect';
		}
		
		return null;
	}
	
	public function addBonusGain (bonusType:String) : Void {
		if (bonusType == BonusType.BONUS_PIMIENTOS) {
			bonusPimientosCollected++;
		}
		if (bonusType == BonusType.BONUS_PESOS) {
			bonusPesosCollected++;
		}
		if (bonusType == BonusType.BONUS_OFFERING) {
			bonusOfferingCollected++;
		}
	}
	
	private function closeHudParade () : Void {
		UIManager.getInstance().closeHudParade();
		UIManager.getInstance().openHud();
		ExperienceManager.getInstance().updateLevelAndXp();
	}
	
	private function openHudParade () : Void {
		UIManager.getInstance().closeHud();
		UIManager.getInstance().openHudParade();
	}
	
	private function refreshResourceValue () : Void {
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_OFFERING_VIEW, offeringGain);
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_PESOS_VIEW, pesosGain);
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_PIMIENTOS_VIEW, pimientosGain);
	}
	
	private function setHudStartValue () : Void {
		refreshResourceValue();
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_TIMER, Settings.paradeDetails.get(Std.string(mainBuildingLvl)).time);
	}
	
	private function startTimer () : Void {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		timeLeft = Settings.paradeDetails.get(Std.string(mainBuildingLvl)).time;
		//timeLeft = 5;
		currentTime = Date.now().getTime() / 1000;
		timeEnd = currentTime + timeLeft;
	}
	
	private function updateTimer () : Void {
		currentTime = Date.now().getTime() / 1000;
		timeLeft = timeEnd - currentTime;
		updateTimerInHud();
	}
	
	public function doActionParade():Void {
		if (!active) return;
		
		checkIfParadeHitBonus();
		
		paradeProcession.update();
		
		if (hasEndScenario) {
			updateTimer();
			checkForParadeEnd();
		} else if (paradeProcession.paradeHasReachLastScenrioPosition()) {
			startParadeForUser();
		}
	}
	
	private function checkIfParadeHitBonus () : Void {
		for (positionCitizen in paradeProcession.getParadePositionInModel()) {
			for (bonus in BonusParade.list) {
				if (PointUtils.isEqual(positionCitizen, bonus.positionInModel)) {
					addBonusGain(bonus.getBonusType());
					
					createAnimationFeedback(getBonusRessourceGain(bonus.getBonusType()), Std.int(bonus.getBonusValue()));
					
					bonus.destroy();
					
					break;
				}	
			}
		}
	}
	
	private function createAnimationFeedback(ressourceType:String, amoutRessource:Int):Void {
		AnimationHarvestBuilder.create()
							   .withStartAnimationPosition(getHeadParadePositionInHud)
							   .withEndAnimationPosition(getRessourcePositionInHud(ressourceType))
							   .withAmountOfCoinToGenerate(amoutRessource)
							   .withCallbackWhenCoinIsArrivedAtDestination(getFunctionToAddRessource(ressourceType))
							   .withAnimationName(getAnimationNames(ressourceType))
							   .withContainer(HudParade.getInstance())
							   .build()
							   .animate();
	}
	
	private function getAnimationNames (ressourceType:String) : String {
		
		if (ressourceType == RessourceManager.GOLD) return AnimationNames.ANIM_GOLD;
		if (ressourceType == RessourceManager.OFFERING) return AnimationNames.ANIM_OFFERING;
		if (ressourceType == RessourceManager.SPICE) return AnimationNames.ANIM_SPICE;
		
		return null;
	}

	private function getRessourcePositionInHud(ressource:String):Void->Point {
		return function () {
			return new Point (
				HudParade.getInstance().getRessourceView().position.x + ResourcesView.middleResourceOffsetX.get(ressource),
				HudParade.getInstance().getRessourceView().position.y + ResourcesView.MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y
			);
		}
	}
	
	private function getFunctionToAddRessource (ressource:String) : Void->Void {
		switch (ressource) {
			case RessourceManager.GOLD:
				return addPesosBonus;
			case RessourceManager.OFFERING:
				return addOfferingBonus;
			case RessourceManager.SPICE:
				return addPimientosBonus;
			default:
				throw 'Parade: ressource value in getFunctionToFindPositionInHud is incorrect';
		}
	}
	
	private function addPesosBonus () : Void {
		pesosGain++;
		refreshResourceValue();
	}
	
	private function addOfferingBonus () : Void {
		offeringGain++;
		refreshResourceValue();
	}
	
	private function addPimientosBonus () : Void {
		pimientosGain++;
		refreshResourceValue();
	}
	
	private function getHeadParadePositionInHud () : Point {
		return IsoManager.modelToHudView(paradeProcession.getHeadOfParade().getPositionInModel());
	}
	
	private function checkForParadeEnd () : Void {
		if (timeLeft < 0) {
			timeLeft = 0;
			updateTimerInHud();
			if (useHardInParade) end();
			else firestEnd();
		}
	}
	
	private function updateTimerInHud () : Void {
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_TIMER, timeLeft);
	}
	
	public function addTime (time:Float) : Void {
		//to do : get additional time
		
		timeLeft = time;
		timeEnd = Date.now().getTime() / 1000 + timeLeft;
		
		updateTimer();
		useHardInParade = true;
		
		resume();
	}
	
	private function stop() : Void {
		paradeController.stop();
		active = false;
	}
	
	private function resume () : Void {
		paradeController.start();
		active = true;
	}
	
	private function firestEnd () : Void {
		stop();
		RessourceManager.getInstance().addRessources(RessourceManager.SPICE, pimientosGain);
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADECONTINUE);
	}
	
	public function end() {
		stop();
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADEREWARD, [offeringGain, pesosGain, pimientosGain]);
	}
	
	public function destroy () : Void {
		GameManager.USE_MAP_WITH_OBSTACLE = false;
		
		closeHudParade();

		Api.user.getParadeUpdate(bonusPesosCollected, bonusPimientosCollected, bonusOfferingCollected, useHardInParade, hardPurchase);
		
		paradeBonusGenerator.clean();
		paradeBonusGenerator = null;
		
		paradeController.clean();
		paradeController = null;
		
		paradeProcession.clean();
		paradeProcession = null;
	}
}