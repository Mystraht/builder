package com.isartdigital.builder.game.parade;

import com.isartdigital.utils.facebook.Facebook;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.ftue.FtueCamera;
import com.isartdigital.utils.sounds.SoundManager;
import haxe.Timer;
import com.isartdigital.builder.game.animation.fireworks.FireworksAmbiance;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.animation.harvest.AnimationHarvest;
import com.isartdigital.builder.game.animation.AnimationNames;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.animation.harvest.AnimationHarvestBuilder;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.sprites.citizen.Citizen;
import com.isartdigital.builder.ui.hud.HudParade;
import com.isartdigital.builder.ui.items.ResourcesView;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.Camera;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import com.isartdigital.utils.PointUtils;
import eventemitter3.EventEmitter;
import motion.Actuate;
import motion.easing.Linear;
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
		GameManager.pathfindingWithObstacle = false;
		BuildingUtils.unselectBuildingSelected();
		
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
		Ftue.event.emit(FtueEvents.PARADE_SCENARIO_END);

		GameManager.pathfindingWithObstacle = true;
		paradeProcession.setParadeFullAlpha();
		
		hasEndScenario = true;
		paradeBonusGenerator.generateBonus();
		paradeController.start();
		
		if (isParadeForFtue()) {
			stop();
			paradeController.start();
			Ftue.event.once(FtueEvents.PARADE_MOVED, onFtueParadeMoved);
		} else {
			startTimer();
		}
	}
	
	private function onFtueParadeMoved(params:Dynamic) : Void {
		resume();
		startTimer();
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
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_TIMER, Metadatas.paradeDetails.get(Std.string(mainBuildingLvl)).time);
	}
	
	private function startTimer () : Void {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		timeLeft = Metadatas.paradeDetails.get(Std.string(mainBuildingLvl)).time;
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

		FireworksAmbiance.update();
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
							   .withCoinAmountToGenerate(Math.ceil(amoutRessource))
							   .withCallbackWhenCoinReachDestination(getFunctionToAddRessource(ressourceType))
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
		pesosGain += AnimationHarvest.RESOURCE_GAIN_PER_COIN;
		refreshResourceValue();
	}
	
	private function addOfferingBonus () : Void {
		offeringGain += AnimationHarvest.RESOURCE_GAIN_PER_COIN;
		refreshResourceValue();
	}
	
	private function addPimientosBonus () : Void {
		pimientosGain += AnimationHarvest.RESOURCE_GAIN_PER_COIN;
		refreshResourceValue();
	}
	
	private function getHeadParadePositionInHud () : Point {
		return IsoManager.modelToHudView(paradeProcession.getHeadOfParade().getPositionInModel());
	}
	
	private function checkForParadeEnd () : Void {
		if (timeLeft < 0) {
			timeLeft = 0;
			updateTimerInHud();
			if (useHardInParade || isParadeForFtue()) end();
			else firstEnd();
		}
	}
	
	private function isParadeForFtue () : Bool {
		if (!Users.infos.ftue_complet) 
			if (!GameManager.getInstance().ftue.isParadeStepDone) 
				return true;
		return false;
	}
	
	private function updateTimerInHud () : Void {
		HudParade.getInstance().emit(HudParade.UPDATE_REQUEST_TIMER, timeLeft);
	}
	
	public function addTime (time:Float) : Void {
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
	
	private function firstEnd () : Void {
		stop();
		RessourceManager.getInstance().addRessources(RessourceManager.SPICE, pimientosGain);
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADECONTINUE);
	}
	
	public function end() {
		stop();
		var facebookWallMessage:String = ("Wow, les parades dans Fiesta Ultima ça rapporte pas mal quand même !\n
		J'ai gagné " + offeringGain + " offrandes, " + pesosGain + " pesos et " + pimientosGain + " piments !!");
		Facebook.shareOnWall({message: facebookWallMessage, link: Facebook.FACEBOOK_APP_LINK} );
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADEREWARD, [offeringGain, pesosGain, pimientosGain]);
	}
	
	public function destroy () : Void {
		GameManager.pathfindingWithObstacle = false;
		
		closeHudParade();

		Api.user.getParadeUpdate(bonusPesosCollected, bonusPimientosCollected, bonusOfferingCollected, useHardInParade, hardPurchase);
		
		paradeBonusGenerator.clean();
		paradeBonusGenerator = null;
		
		paradeController.clean();
		paradeController = null;
		
		paradeProcession.clean();
		paradeProcession = null;
		
		GameManager.pathfindingWithObstacle = true;
	}
}