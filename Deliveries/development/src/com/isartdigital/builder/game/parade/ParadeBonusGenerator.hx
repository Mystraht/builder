package com.isartdigital.builder.game.parade;

import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import eventemitter3.EventEmitter;
import motion.Actuate;
import motion.easing.Linear;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class ParadeBonusGenerator extends EventEmitter
{
	private static inline var PERCENT_BONUS_TO_GENERATE:Float = 0.05;
	
	
	private var positionValid:Array<Point> = new Array<Point> ();
	
	private var parade:Parade;
	
	public function new(parade:Parade) 
	{
		super();
		
		this.parade = parade;
	}
	
	public function generateBonus () : Void {
		var bonusToGenerateCount:Int = getBonusToGenerateCount();
		positionValid = getAvailablePositions();
		positionValid.sort(randomSort);
		
		for (i in 0...bonusToGenerateCount) {
			var bonus:BonusParade = new BonusParade(Math.random() * 100, positionValid.pop());
			GameStage.getInstance().getBuildingsContainer().addChild(bonus);	
		}

		if (!Users.infos.ftue_complet) {
			// todo : remove après la presentation
			var bonus:BonusParade = new BonusParade(50, new Point(55, 47));
			GameStage.getInstance().getBuildingsContainer().addChild(bonus);
		}
		
		IsoManager.sortAll();
	}
	
	public function generateBonusScenario () : Void {
		var bonus:BonusParade = new BonusParade(5, getBonusScenarioPosition(), getDefaultGain());
		GameStage.getInstance().getBuildingsContainer().addChild(bonus);	
	}
	
	private function getDefaultGain () : Int {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		return Metadatas.paradeDetails.get(Std.string(mainBuildingLvl)).default_gain;
	}
	
	private function getBonusScenarioPosition () : Point {
		return new Point(
			parade.paradeProcession.endPositionScenario.x, 
			parade.paradeProcession.endPositionScenario.y 
		);
	}
	
	private function getBonusToGenerateCount () : Int {
		return Std.int(Math.ceil((Tile.getBuildableTiles().length * PERCENT_BONUS_TO_GENERATE)));
	}
	
	private function randomSort (objectA:Point, objectB:Point) {
		return 1 * (Math.random() > 0.5 ? -1 : 1);
	}
	
	private function getAvailablePositions () : Array<Point> {
		var tilePositions:Array<Point> = new Array<Point> ();
		
		for (tile in Tile.getBuildableTiles()) {
			tilePositions.push(new Point (tile.x, tile.y));
		}
		
		return tilePositions;
	}
	
	public function clean() : Void {
		positionValid = null;
		
		for (bonus in BonusParade.list) {
			Actuate.tween(bonus, BonusParade.TIME_TO_DISAPPEAR, { alpha : 0 } ).ease(Linear.easeNone).onComplete(bonus.destroy);
		}
	}
}