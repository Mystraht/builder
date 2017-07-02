package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.game.sprites.Citizen;
import com.isartdigital.builder.ui.popin.ParadeConfirm;
import com.isartdigital.builder.ui.popin.ParadeReward;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import pathfinder.Coordinate;
import pathfinder.EHeuristic;
import pathfinder.Pathfinder;
import pixi.core.math.Point;

	
/**
 * ...
 * @author Thorcal
 */
class ParadeManager 
{
	
	public static var paradeArray:Array<Citizen> = new Array<Citizen>();
	private var paradeSize:Int = 5;
	private var listPos:Array<Point> = new Array<Point>();
	private var nextPosModel:Point = new Point();
	private var nextPosIso:Point = new Point();
	public var paradeDestination:Coordinate;
	private var minimumGain:Int;
	/**
	 * instance unique de la classe ParadeManager
	 */
	private static var instance: ParadeManager;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): ParadeManager {
		if (instance == null) instance = new ParadeManager();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	public function doActionNormal():Void {
		if (isParadeActive()) {
			checkParadeFinishement();
		}
	}

	private function isParadeActive():Bool {
		return paradeArray.length > 0;
	}
	
	public function buildParade(startX:Int, startY:Int, minGain:Int) {
		for (i in 0...paradeSize) {
			var lCitizen:Citizen = new Citizen();
			lCitizen.position.set(startX, startY);
			GameStage.getInstance().getGameContainer().addChild(lCitizen);
			lCitizen.start();
			paradeArray.push(lCitizen);
		}
		minimumGain = minGain;
		organizeParade(startX, startY);
	}
	
	public function organizeParade(startPosX:Int, startPosY:Int) {
		for (i in 0...paradeArray.length) {
			var newPos:Point = new Point(startPosX+ i*3, startPosY);
			paradeArray[i].position = IsoManager.modelToIsoView(newPos);
			trace (newPos);
		}
	}
	
	
	public function moveParade(pDest:Coordinate) {
		trace (pDest);
		for (lCitizen in paradeArray) {
			lCitizen.destination = pDest;
			lCitizen.setNextPos();
			lCitizen.startPathfinder();
			GameManager.getInstance().moveCitizen();
		}
	}
	
	
	public function checkParadeFinishement():Void {
		if (paradeArray[0].posInModel.x == 0 && paradeArray[0].posInModel.y == 0) {
			trace ("paradeArray debut : " + paradeArray);
			for (lCitizen in paradeArray) {
				GameStage.getInstance().getGameContainer().removeChild(lCitizen);
			}
			paradeArray.splice(0, ParadeManager.paradeArray.length);
			trace ("paradeArray fin : " + paradeArray);
			finishParade();
		}
	}
	
	public function finishParade() {
		UIManager.getInstance().openPopin(new ParadeReward(ParadeConfirm.getInstance().setDataParade().default_gain));
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}