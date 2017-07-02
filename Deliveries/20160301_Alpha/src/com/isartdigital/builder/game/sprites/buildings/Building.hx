package com.isartdigital.builder.game.sprites.buildings;

import com.isartdigital.builder.game.sprites.buildings.interactionStrategy.NormalStrategy;
import com.isartdigital.builder.game.sprites.buildings.interactionStrategy.LanternStrategy;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.BuildingDefinition;
import com.isartdigital.builder.game.sprites.buildings.BuildingPosition;
import com.isartdigital.builder.game.sprites.buildings.const.BuildingEvents;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingEventDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.sprites.buildings.exceptions.BuildingException.BuildingExceptions;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.hud.BaseBuildingHUDEvent;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.Filter;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;
import pixi.display.FlumpMovie;

/**
 * ...
 * @author Dorian
 */
class Building extends SpriteObject implements IZSortable
{
	public static var list:Array<Building> = new Array();
	
	public var definition:BuildingDef;
	public var buildingLevel:Int = 0;
	
	private var isSelected:Bool = false;
	private var isFollowingCursor:Bool = false;
	private var hasHarvestableFunctionality:Bool;
	private var canTriggerMouseUpEvent = true;
	private var interactionAction:Dynamic;

	private var buildingConstructor:BuildingConstructor;
	private var buildingDestructor:BuildingDestructor;
	private var buildingHarvester:BuildingHarvester;
	private var buildingPosition:BuildingPosition;
	private var buildingMover:BuildingMover;
	private var buildingTile:BuildingTile;
	
	public function new()
	{
		super();
		factory = new FlumpMovieAnimFactory();
		boxType = BoxType.NONE;
		interactive = true;


	}

	override public function init(buildingModelDef:Dynamic):Void
	{
		var buildingModelPosition:Point = new Point(buildingModelDef.x, buildingModelDef.y);

		buildingConstructor = new BuildingConstructor(this);
		buildingDestructor = new BuildingDestructor(this);
		buildingHarvester = new BuildingHarvester(this);
		buildingPosition = new BuildingPosition(this);
		buildingMover = new BuildingMover(this);
		buildingTile = new BuildingTile(this);

		list.push(this);
		setBuildingConfigurationWith(buildingModelDef);
		setInteractionStrategy();
		buildingConstructor.setDestination(buildingModelPosition);
		buildingConstructor.construct();
		hasHarvestableFunctionality = buildingHarvester.isBuildingHasHarvestFunctionality();
		createZSortableConfiguration();
		addEventSubscription();
		hideIfInFog();
		addToStage();
	}
	
	private function setBuildingConfigurationWith(buildingModelDef:Dynamic):Void {
		var buildingIsoPosition:Point = IsoManager.modelToIsoView(new Point(buildingModelDef.x, buildingModelDef.y));
		
		definition = BuildingDefinition.getByName(buildingModelDef.name);
		assetName = definition.spriteName;
		changeAsset(definition.spriteName);
		
		x = Math.floor(buildingIsoPosition.x);
		y = Math.floor(buildingIsoPosition.y);
		
		buildingLevel = buildingModelDef.buildingLevel;
	}

	private function setInteractionStrategy():Void {
		var lanternStrategy:LanternStrategy = new LanternStrategy(this);
		var normalStrategy:NormalStrategy = new NormalStrategy(this);

		if (isBuildingLantern()) {
			interactionAction = lanternStrategy.lanternInteraction;
		} else {
			interactionAction = normalStrategy.normalInteraction;
		}
	}

	private function isBuildingLantern():Bool {
		return definition.name == 'lanterns';
	}
	
	private function createZSortableConfiguration():Void {
		var position:Point = positionToModel(true);
		
		colMin = Std.int(position.y);
		colMax = Std.int(position.y) + definition.size.height;
		rowMin = Std.int(position.x);
		rowMax = Std.int(position.x) + definition.size.width;
	}
	
	private function addToStage():Void {
		setState(DEFAULT_STATE);
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2);
		cast(anim, FlumpMovie).animationSpeed = 0.80;
		GameStage.getInstance().getBuildingsContainer().addChild(this);
		start();

		if (hasHarvestableFunctionality) {
			buildingHarvester.setHarvestResourceType();
		}
	}
	
	private function hideIfInFog():Void {
		var positionModel:Point = positionToModel(true);
		var tileUnderBuilding:TileModelDef = GMap.getElementByTypeAt(positionModel, 'tile');
		visible = tileUnderBuilding.isIlluminated;
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
		var buildingsSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		var buildingSetting:Dynamic = Reflect.field(buildingsSettings, definition.name);

		if (buildingSetting == null) {
			throw BuildingExceptions.configNotFound + ' | Building name : ' + definition.name;
		}

		if (isUpgradableBuilding()) {
			buildingSetting = Reflect.field(buildingSetting, '' + (buildingLevel + 1));
		}

		return buildingSetting;
	}
	
	/**
	 * TODO : Bouger dans un component d'ugrade
	 * @return
	 */
	public function isUpgradableBuilding():Bool {
		var buildingsSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		var buildingSetting:Dynamic = Reflect.field(buildingsSettings, definition.name);
		
		if (buildingSetting == null) {
			throw BuildingExceptions.configNotFound;
		}

		return Reflect.field(buildingSetting, '1') != null;
	}
	
	public function isHarvestable():Bool {
		return hasHarvestableFunctionality;
	}

	public function select():Void {
		BuildingUtils.unselectBuildingSelected();
		selectBuildingAndListenHudEvent();
	}

	public function setMoveState():Void {
		buildingTile.setTileUnderBuildingBuildable();
		startFollowCursor();
	}

	private function selectBuildingAndListenHudEvent():Void {
		setBuildingSelected();
		listenHudEvent();
	}
	
	override private function doActionNormal():Void {
		super.doActionNormal();
		var onCursorPosition:Point;

		if (isHarvestable() && !isSelected) {
			buildingHarvester.updateHarvestIconState();
		}

		if (isFollowingCursor) {
			onCursorPosition = buildingPosition.getPositionOnCursor();
			buildingMover.setMousePosition(onCursorPosition);
			buildingMover.move();
			applyFilterByConstructibleState();
		}
	}
	
	private function applyFilterByConstructibleState():Void {
		var position:Point = buildingPosition.getPositionOnCursor();
		buildingConstructor.setDestination(position);
		if (buildingConstructor.canConstruct()) {
			filters = Filter.getBrightness(1.5);
		} else {
			filters = Filter.getRed();
		}
	}

	private function upgradeBuilding():Void {
		buildingLevel++;
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2 + 1);
	}
	
	private function addEventSubscription():Void {
		Main.getInstance().on(GameManager.EVENT_MOUSE_UP, onMouseUpEvent);
	}

	private function onMouseUpEvent(position:Point):Void {
		var buildingModelPosition:Point = positionToModel(true);
		position = IsoManager.isoViewToModel(position);
		position.x = Math.floor(position.x);
		position.y = Math.floor(position.y);

		if (!canTriggerMouseUpEvent) {
			canTriggerMouseUpEvent = true;
			return;
		}
		
		
		if (isSelected) {
			interactionAction();
			return;
		}

		if (GMap.isElementTypeAt(position, ModelElementNames.BUILDING)) {
			var building:BuildingModelDef = GMap.getElementByTypeAt(position, ModelElementNames.BUILDING);

			if (building.x == buildingModelPosition.x && building.y == buildingModelPosition.y) {
				interactionAction();
			}
		}
	}
	
	private function listenHudEvent():Void {
		Main.getInstance().on(BaseBuildingHUDEvent.DELETE_BUTTON, onErasable);
		Main.getInstance().on(BaseBuildingHUDEvent.MOVE_BUTTON, onMove);
		Main.getInstance().on(BaseBuildingHUDEvent.PAINT_BUTTON, onPaint);
		Main.getInstance().on(BaseBuildingHUDEvent.UPGRADE_BUTTON, onUpgrade);
	}
	
	private function forgetHudEvent():Void {
		Main.getInstance().off(BaseBuildingHUDEvent.DELETE_BUTTON, onErasable);
		Main.getInstance().off(BaseBuildingHUDEvent.MOVE_BUTTON, onMove);
		Main.getInstance().off(BaseBuildingHUDEvent.PAINT_BUTTON, onPaint);
		Main.getInstance().off(BaseBuildingHUDEvent.UPGRADE_BUTTON, onUpgrade);
	}
	
	private function onErasable(event:Dynamic):Void {
		canTriggerMouseUpEvent = false;
		buildingDestructor.destruct();
	}
	
	private function onMove(event:Dynamic):Void {
		canTriggerMouseUpEvent = false;
		buildingTile.setTileUnderBuildingBuildable();
		startFollowCursor();
	}
	
	private function onPaint(event:Dynamic):Void {
		canTriggerMouseUpEvent = false;
		trace('Ouvre le paneau de peinture');
	}
	
	private function onUpgrade(event:Dynamic):Void {
		canTriggerMouseUpEvent = false;
		upgradeBuilding();
	}
	
	private function startFollowCursor():Void {
		isFollowingCursor = true;
	}
	
	private function stopFollowCursor():Void {
		isFollowingCursor = false;
	}
	
	private function setBuildingSelected():Void {
		setSelectedGraphicState();
		emitSelectEvent();
		isSelected = true;
	}
	
	private function setBuildingUnselected():Void {
		setUnselectedGraphicState();
		emitUnselectEvent();
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
			type: definition.component
		}
		
		Main.getInstance().emit(eventType, buildingEvent);
	}
	
	private function setSelectedGraphicState():Void {
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2 + 1);
	}
	
	private function setUnselectedGraphicState():Void {
		cast(anim, FlumpMovie).gotoAndStop(buildingLevel * 2);
	}

	private function removeEventSubscription():Void {
		Main.getInstance().off(GameManager.EVENT_MOUSE_UP, onMouseUpEvent);
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

		removeEventSubscription();
		forgetHudEvent();
		GameStage.getInstance().getBuildingsContainer().removeChild(this);
		list.splice(list.indexOf(this), 1);
	}
	
	override public function destroy():Void {
		super.destroy();
	}
}

