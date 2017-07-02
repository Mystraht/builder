package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.parade.Parade;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.ui.popin.HardBuildConfirm;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingComponents;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.Main;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.utils.game.Camera;
import pixi.core.math.Point;
import com.isartdigital.builder.game.sprites.buildings.BuildingPosition;
import com.isartdigital.builder.game.sprites.buildings.BuildingDefinition;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingEventDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IZSortable;
import pixi.display.FlumpMovie;

/**
 * Class des buildings
 * @author Dorian
 */
class Building extends SpriteObject implements IZSortable
{
	public static var buildingsModel:Array<BuildingModelDef> = new Array();
	public static var list:Array<Building> = new Array();

	public var type:String = ModelElementNames.BUILDING;
	public var definition:BuildingDef;
	public var buildingLevel:Int;
	public var interactionAction:Dynamic;

	private static inline var MOUSE_OVER_BRIGHTNESS:Float = 0.65;
	private static inline var ALPHA_WHEN_BUILDING_IS_MOVING:Float = 0.3;
	private static inline var ALPHA_WHEN_BUILDING_IS_NOT_MOVING:Float = 1;

	private var isSelected:Bool = false;
	private var isMoving:Bool = false;
	private var hasHarvestableFunctionality:Bool;
	private var canTriggerMouseUpEvent = true;

	private var buildingInitialisator:BuildingInitialisator;
	private var buildingConstructor:BuildingConstructor;
	private var buildingDestructor:BuildingDestructor;
	private var buildingHarvester:BuildingHarvester;
	private var buildingUpgrader:BuildingUpgrader;
	private var buildingPosition:BuildingPosition;
	private var buildingTimebase:BuildingTimebase;
	private var buildingMover:BuildingMover;
	private var buildingTile:BuildingTile;

	public function new()
	{
		super();
		factory = new FlumpMovieAnimFactory();
	}

	override public function init(buildingModelDef:BuildingModelDef):Void
	{
		buildingInitialisator = new BuildingInitialisator(this);
		buildingConstructor = new BuildingConstructor(this);
		buildingDestructor = new BuildingDestructor(this);
		buildingHarvester = new BuildingHarvester(this);
		buildingUpgrader = new BuildingUpgrader(this);
		buildingPosition = new BuildingPosition(this);
		buildingTimebase = new BuildingTimebase(this);
		buildingMover = new BuildingMover(this);
		buildingTile = new BuildingTile(this);

		buildingInitialisator.initialisate(buildingModelDef);
	}

	/**
	 * Récupère l'état du model du building dans la global map
	 * @return
	 */
	public function getModelInGlobalMap():BuildingModelDef {
		return BuildingDefinition.getBuildingModelInGlobalMapAt(positionToModel(true));
	}
	
	/**
	 * Récupère la configuration dans le json du building
	 * @return
	 */
	public function getConfig():Dynamic {
		return BuildingUtils.getConfigByName(definition.name, buildingLevel);
	}

	/**
	 * TODO : Bouger dans un component d'ugrade
	 * @return
	 */
	public function isUpgradableBuilding():Bool {
		return BuildingUtils.isUpgradableBuilding(definition.name);
	}
	
	public function isHarvestable():Bool {
		return hasHarvestableFunctionality;
	}

	public function select():Void {
		BuildingUtils.unselectBuildingSelected();
		setBuildingSelected();
	}

	public function setMoveState():Void {
		setMouseToBuildingPosition();
		buildingTile.setTileUnderBuildingBuildable();
		startMove();
		emitUnselectEvent();
		Camera.desactivateCamera();
	}

	private function setMouseToBuildingPosition():Void {
		GameManager.getInstance().mousePosition = new Point(
			x - buildingPosition.getBuildingCenterOffsetInPixel().x,
			y - buildingPosition.getBuildingCenterOffsetInPixel().y
		);
	}
	
	override private function doActionNormal():Void {
		super.doActionNormal();
		var onCursorPosition:Point;

		updateTimebaseAnimation();
		updateHarvestIconState();

		if (canInteract() && !isSelected) {
			filters = cast Filter.getBrightness(MOUSE_OVER_BRIGHTNESS);
		} else {
			filters = cast Filter.EMPTY_FILTER;
		}

		if (isMoving) {
			onCursorPosition = buildingPosition.getPositionOnCursorWithBuildingCenterOffset();
			buildingMover.setMousePosition(onCursorPosition);
			buildingMover.move();
			applyFilterByConstructibleState();
		}
	}

	private function updateTimebaseAnimation():Void {
		if (!isMoving) {
			buildingTimebase.updateAnimation();
		} else {
			buildingTimebase.hideAnimation();
		}
	}

	private function updateHarvestIconState():Void {
		if (isHarvestable() && !isSelected && !isMoving) {
			checkIfHarvestingMustBeDesctivatedOrActivated();
			buildingHarvester.updateHarvestIconState();
		}
	}

	private function checkIfHarvestingMustBeDesctivatedOrActivated() {
		if (buildingTimebase.isConstructingOrUpgradingState() || GameManager.getInstance().isParadeActive()) {
			buildingHarvester.desactiveHarversting();
		} else {
			buildingHarvester.activeHarversting();
		}
	}

	private function applyFilterByConstructibleState():Void {
		var position:Point = buildingPosition.getPositionOnCursorWithBuildingCenterOffset();
		buildingConstructor.setDestination(position);
		if (buildingConstructor.canConstruct()) {
			filters = cast Filter.EMPTY_FILTER;
		} else {
			filters = cast Filter.getRed();
		}
	}

	private function upgradeLantern():Void {
		getModelInGlobalMap().lvl++;
		buildingLevel++;
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2 + 1);
	}

	private function onInteractionEvent(position:Point):Void {
		var buildingModelPosition:Point = positionToModel(true);
		position = IsoManager.isoToModelView(position);
		position.x = Math.floor(position.x);
		position.y = Math.floor(position.y);

		canTriggerMouseUpEvent = true;

		if (canInteract()) {
			interactionAction();
		}
	}

	private function canInteract():Bool {
		return (
			UIManager.mouseIsNotInteractingWithUI() &&
			!GameManager.getInstance().isParadeActive() &&
			visible && (
				buildingPosition.isCursorOverBuilding() ||
				isSelected
			)
		);
	}
	
	private function subscribeHudEvent():Void {
		Main.getInstance().on(BaseBuildingHUDEvent.DELETE_BUTTON, onErasable);
		Main.getInstance().on(BaseBuildingHUDEvent.MOVE_BUTTON, onMove);
		Main.getInstance().on(BaseBuildingHUDEvent.UPGRADE_BUTTON, onUpgrade);
		Main.getInstance().on(BaseBuildingHUDEvent.HARDBUILD_BUTTON, onHardBuildRequest);
	}
	
	private function forgetHudEvent():Void {
		Main.getInstance().off(BaseBuildingHUDEvent.DELETE_BUTTON, onErasable);
		Main.getInstance().off(BaseBuildingHUDEvent.MOVE_BUTTON, onMove);
		Main.getInstance().off(BaseBuildingHUDEvent.UPGRADE_BUTTON, onUpgrade);
		Main.getInstance().off(BaseBuildingHUDEvent.HARDBUILD_BUTTON, onHardBuildRequest);
	}

	private function onErasable(event:Dynamic):Void {
		buildingDestructor.destruct();
	}
	
	private function onMove(event:Dynamic):Void {
		setMoveState();
	}
	
	private function onHardBuildRequest(event:Dynamic):Void {
		Ftue.event.emit(FtueEvents.CITYHALL_HARD_BUILD_REQUEST);
		setBuildingUnselected();
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_HARDBUILDCONFIRM, buildingTimebase.getHardBuildPrice());
		UIManager.getInstance().on(HardBuildConfirm.CONFIRM_BUTTON_CLICK, onHardBuildConfirm);
	}

	private function onHardBuildConfirm(hardbuild:Dynamic):Void {
		Ftue.event.emit(FtueEvents.CITYHALL_HARD_BUILD);
		var buildingPosition:Point = positionToModel(true);
		UIManager.getInstance().off(HardBuildConfirm.CONFIRM_BUTTON_CLICK, onHardBuildConfirm);
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, hardbuild.price)) {
			UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_NOMONEY);
			return;
		}
		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
		Api.buildings.hardBuild(Std.int(buildingPosition.x), Std.int(buildingPosition.y));
		getModelInGlobalMap().construct_end_at = Date.now().toString();
	}
	
	private function onUpgrade(event:Dynamic):Void {
		if (buildingUpgrader.canUpgrade()) {
			buildingUpgrader.upgrade();
			setBuildingUnselected();
		}
	}
	
	private function startMove():Void {
		isMoving = true;
		alpha = ALPHA_WHEN_BUILDING_IS_MOVING;
	}
	
	private function stopMove():Void {
		isMoving = false;
		alpha = ALPHA_WHEN_BUILDING_IS_NOT_MOVING;
	}
	
	private function setBuildingSelected():Void {
		setSelectedGraphicState();
		emitSelectEvent();
		subscribeHudEvent();
		isSelected = true;
		Ftue.event.emit(FtueEvents.BUILDING_SELECTED, { buildingName: definition.name });
	}

	private function setBuildingUnselected():Void {
		setUnselectedGraphicState();
		emitUnselectEvent();
		forgetHudEvent();
		isSelected = false;
	}
	
	private function emitSelectEvent():Void {
		emitSelectionEvent(BuildingEvents.SELECTED);
	}
	
	private function emitUnselectEvent():Void {
		emitSelectionEvent(BuildingEvents.UNSELECTED);
	}
	
	private function emitSelectionEvent(eventType:String):Void {
		var buildingEvent:BuildingEventDef = {
			ref: this,
			type: getBuildingActionComponents()
		}
		
		Main.getInstance().emit(eventType, buildingEvent);
	}

	private function getBuildingActionComponents():Array<String> {
		var actionComponent:Array<String>;

		if (buildingTimebase.isNotConstructingOrUpgradingState()) {
			actionComponent = definition.component;
		} else {
			actionComponent = [
				BuildingComponents.MOVABLE,
				BuildingComponents.ERASABLE,
				BuildingComponents.HARDBUILD
			];
		}

		if (!buildingUpgrader.hasNextLevel()) {
			actionComponent = BuildingUtils.removeActionComponent(actionComponent, BuildingComponents.UPGRADABLE);
		}

		return actionComponent;
	}
	
	private function setSelectedGraphicState():Void {
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2 + 1);
	}
	
	private function setUnselectedGraphicState():Void {
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2);
	}

	private function removeEventSubscription():Void {
		Main.getInstance().off(GameManager.EVENT_INTERACTION, onInteractionEvent);
	}
	
	override public function remove() :Bool {
		cleanObject();
		if (!super.remove()) {
			destroy();
			return true;
		}
		
		return true;
	}
	
	private function cleanObject():Void {
		if (isSelected) {
			setBuildingUnselected();
		};

		buildingHarvester.cleanObject();
		buildingConstructor.cleanObject();
		buildingTimebase.cleanObject();

		removeEventSubscription();
		GameStage.getInstance().getBuildingsContainer().removeChild(this);
		list.splice(list.indexOf(this), 1);
	}
	
	override public function destroy():Void {
		super.destroy();
	}
}
