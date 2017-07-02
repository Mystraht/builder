package com.isartdigital.builder.game.parade;

import com.isartdigital.builder.game.def.PointDef;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingNames;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.sprites.citizen.Citizen;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.services.Users;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import eventemitter3.EventEmitter;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class ParadeProcession extends EventEmitter
{
	public static inline var distanceBetweenStartPositionAndFirstIlluminatedTile:Int = 5;
	
	public var startPositionScenario:Point = new Point();
	public var endPositionScenario:Point = new Point();
	
	private var citizensInProcession:Array<Citizen> = new Array<Citizen> ();
	
	private var parade:Parade;
	
	private var targetDestination:Point = null;
	
	private var headOfProcession:Citizen;
	
	private var processionPattern:Array<Point> = new Array<Point> ();
	
	private var feedbackPointList:Array<Graphics> = new Array<Graphics> ();
	
	private var numberOfCitizenForTheParade:Int;
	
	public function new(parade:Parade) 
	{
		super();
		
		this.parade = parade;
		
		for (i in 0...Metadatas.paradePattern.numberCitizenInParade[getParadeLevel()]) {
			var position:PointDef = Metadatas.paradePattern.positionCitizen[i];
			processionPattern.push(new Point(position.x, position.y));
		}
	}
	
	private function getParadeLevel () : Int {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 5));
		var paradeLevel:Int = Math.round(mainBuildingLvl / 4);
		return --paradeLevel;
	}
	
	public function getCitizenInProcecession () : Array<Citizen> {
		return citizensInProcession;
	}
	
	public function constructParade () : Void {
		for (i in 0...processionPattern.length) {
			if (i == 0) headOfProcession = createCitizen(getStartPositionParade(), Citizen.HEAD_OF_PARADE_ASSET_NAME);
			else {
				createCitizen(new Point(startPositionScenario.x - processionPattern[i].x,
					startPositionScenario.y - processionPattern[i].y));
			}
			
		}
		
		changeDestination(getEndPositionScenario());
				
		//Actuate.tween(Camera.getInstance().cameraFocus, 1, { x: getStartPositionParadeInIso().x, y: getStartPositionParadeInIso().y } );

	}
	
	private function getStartPositionParade () : Point {
		var positionMainSquare:Point = getEndPositionScenario();
		var startPosition:Point = new Point(positionMainSquare.x, positionMainSquare.y);
		
		while (GMap.getElementByTypeAt(startPosition, ModelElementNames.TILE).isIlluminated) {
			startPosition.y--;
		}
		
		startPosition.y -= distanceBetweenStartPositionAndFirstIlluminatedTile;
		
		startPositionScenario = startPosition;
		
		return startPosition;
	}
	
	private function getEndPositionScenario () : Point {
		var mainSquareDef:BuildingModelDef = BuildingUtils.getBuildingsModel(BuildingNames.MAIN_SQUARE)[0];
		endPositionScenario = new Point(mainSquareDef.x, mainSquareDef.y);
		endPositionScenario.x += 1;
		endPositionScenario.y += 1;
		return endPositionScenario;
	}
	
	public function paradeHasReachLastScenrioPosition () : Bool {
		return headOfProcession.hasReachEndPositionOfPath();
	}
	
	public function setParadeFullAlpha () : Void {
		for (citizen in citizensInProcession) {
			citizen.setNoTransparency();
		}
	}
	
	public function getParadePositionInModel () : Array<Point> {
		var positionsProcession:Array<Point> = new Array<Point> ();
		
		for (citizen in citizensInProcession) {
			positionsProcession.push(citizen.getPositionInModel());
		}
		
		return positionsProcession;
	}
	
	public function getHeadOfParade() : Citizen{
		return headOfProcession;
	}
	
	public function changeDestination (positionDestination:Point) {
		targetDestination = positionDestination;
		setProcessionPath();
	}
	
	private function setProcessionPath () : Void {
		for (i in 0...citizensInProcession.length) {
			var positionFromPattern:Point = new Point(targetDestination.x - processionPattern[i].x,
			targetDestination.y - processionPattern[i].y);
			
			if (GMap.getElementByTypeAt(positionFromPattern, ModelElementNames.TILE).isBuildable)
				citizensInProcession[i].setPath(positionFromPattern);
			else citizensInProcession[i].setPath(targetDestination);
		}
		
		refreshFeedbackPath(headOfProcession.getPathToFollow());
	}
	
	public function update () : Void {
		refreshFeedbackPath(headOfProcession.getPathToFollow());
	}
	
	private function refreshFeedbackPath (pathParade:Array<Point>) : Void {
		removeAllFeedBackPoint();
		for (i in 0...pathParade.length) {
			addFeedbackPointAt(new Point(pathParade[i].x, pathParade[i].y - Config.tileHeight / 2));
		}
	}
	
	private function createCitizen (startPosition:Point, ?assetName:String = null) : Citizen {
		var citizen:Citizen = new Citizen(assetName);
		citizensInProcession.push(citizen);
		citizen.position = IsoManager.modelToIsoView(startPosition);
		GameStage.getInstance().getBuildingsContainer().addChild(citizen);
		citizen.start();
		return citizen;
	}
	
	private function addFeedbackPointAt(position:Point):Void {
		var feedbackPoint = new TargetAsset(position);
		feedbackPointList.push(feedbackPoint);
	}
	
	private function removeAllFeedBackPoint () : Void {
		while (feedbackPointList.length != 0) {
			
			feedbackPointList[0].parent.removeChild(feedbackPointList[0]);
			feedbackPointList[0].destroy();
			feedbackPointList.splice(0, 1);
			
		}
	}
	
	public function clean () : Void {
		removeAllFeedBackPoint();
		while (citizensInProcession.length != 0) {
			citizensInProcession.shift().disappear();
		}
	}
	
}