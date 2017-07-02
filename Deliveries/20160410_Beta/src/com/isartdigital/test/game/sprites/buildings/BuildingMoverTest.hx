package game.sprites.buildings ;

import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingMover;
import com.isartdigital.builder.game.sprites.buildings.BuildingPosition;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.math.Point;


class BuildingMoverTest 
{
	var building:Building;
	var globalMap:Map<Int, Map<Int, Array<Dynamic>>>;
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
	}
	
	@AfterClass
	public function afterClass():Void
	{
	}
	
	public function initMap():Void {
		var tile:TileModelDef;
		var lPosition:String;
		globalMap = new Map<Int, Map<Int, Array<Dynamic>>> ();
		
		for (i in 0...20) {
			for (j in 0...20) {
				tile = {
					type: ModelElementNames.TILE,
					x: i,
					y: j,
					isBuildable: true,
					isIlluminated: false,
					alpha: 1
				}
				
				if (!GMap.isPositionExistAt(new Point(i, j), globalMap)) {
					if (!globalMap.exists(i)) {
						globalMap[i] = new Map<Int, Array<Dynamic>> ();
					}
					globalMap[i][j] = new Array<Dynamic>();
				}
				
				globalMap[i][j].push("");
				globalMap[i][j].push(tile);
				globalMap[i][j].push(123);
			}
		}
		
	}
	
	@Before
	public function setup():Void
	{
		initMap();
		GMap.globalMap = globalMap;
		
		var buildingDefinition:BuildingModelDef = {
			type: ModelElementNames.BUILDING,
			name: 'rocketfactory',
			x: 5,
			y: 5,
			color: "A",
			buildingLevel: 0
		}
		
		untyped GameLoader.getContent = function () {
			return [
				{
					"name":"rocketfactory",
					"spriteName":"Building_3x1",
					"className":"RocketFactory",
					"size":{
						"width":3,
						"height":1
					}
				}
			];
		}
		
		building = new Building();
		
		untyped building.addToStage = function () { };
		untyped building.buildingConstructor.updateBuildingSavedInServer = function () { };
		
		globalMap[buildingDefinition.x][buildingDefinition.y].push(buildingDefinition);
		
		building.init(buildingDefinition);
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_move_building_under_mouse():Void {
		var buildingMover:BuildingMover = new BuildingMover(building);
		var buildingPosition:BuildingPosition = new BuildingPosition(building);
		
		GameManager.getInstance().mousePosition = new Point(10, 750);

		buildingMover.setMousePosition(buildingPosition.getPositionOnCursorWithBuildingCenterOffset());
		buildingMover.move();
		
		Assert.isTrue(building.position.x == 76);
		Assert.isTrue(building.position.y == 798);
	}
}