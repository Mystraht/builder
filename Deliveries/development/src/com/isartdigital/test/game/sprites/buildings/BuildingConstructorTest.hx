package game.sprites.buildings ;

import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.display.Container;
import pixi.display.FlumpMovie;


class BuildingConstructorTest 
{
	var globalMap:Map<Int, Map<Int, Array<Dynamic>>>;
	var building:Building;
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
		
	}
	
	public function initMap():Void {
		var tile:TileSavedDef;
		var lPosition:String;
		globalMap = new Map<Int, Map<Int, Array<Dynamic>>> ();
		
		for (i in 0...20) {
			for (j in 0...20) {
				tile = {
					x: i,
					y: j,
					isBuildable: true
				}
				
				if (!MapManager.getInstance().isElementAtPositionInMap(globalMap, i, j)) {
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
	
	@AfterClass
	public function afterClass():Void
	{
	}
	
	@Before
	public function setup():Void
	{
		var lMapManager:MapManager = MapManager.getInstance();
		initMap();
		lMapManager.globalMap = globalMap;
		
		var buildingDefinition:BuildingSavedDef = {
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
		
		building= new Building();
		
		untyped building.addToStage = function () { };
		building.init(buildingDefinition);
	}
	
	@After
	public function tearDown():Void
	{
	}
	

	@Test
	public function should_not_move_building_when_destination_tiles_is_not_constructible():Void {
		var buildingMover:BuildingConstructor = new BuildingConstructor(building, new Point(5, 5));
		
		buildingMover.setDestination(10, 10);
		
		globalMap[10][10][1].isBuildable = false;
		
		Assert.isFalse(buildingMover.tilesAtDestinationIsBuildable());
	}
	
	@Test
	public function should_move_building_when_destination_tiles_is_constructible():Void {
		var buildingMover:BuildingConstructor = new BuildingConstructor(building, new Point(5, 5));
		
		buildingMover.setDestination(10, 10);
		
		Assert.isTrue(buildingMover.tilesAtDestinationIsBuildable());
	}
	
	@Test
	public function should_set_tile_to_unconstructible_when_building_is_moved():Void {
		var buildingMover:BuildingConstructor = new BuildingConstructor(building, new Point(5, 5));
		
		buildingMover.setDestination(10, 10);
		buildingMover.construct();
		
		Assert.isFalse(globalMap[10][10][1].isBuildable);
	}
	
	@Test
	public function should_remove_building_from_original_position_in_global_map_when_building_is_moved():Void {
		var buildingMover:BuildingConstructor = new BuildingConstructor(building, new Point(5, 5));
		
		buildingMover.setDestination(10, 10);
		buildingMover.construct();

		Assert.isTrue(globalMap[5][5].length == 3);
	}
	
	@Test
	public function should_add_building_to_destination_position_in_global_map_when_building_is_moved():Void {
		var buildingMover:BuildingConstructor = new BuildingConstructor(building, new Point(5, 5));
		
		buildingMover.setDestination(10, 10);
		buildingMover.construct();

		Assert.isTrue(globalMap[10][10].length == 4);
	}
}