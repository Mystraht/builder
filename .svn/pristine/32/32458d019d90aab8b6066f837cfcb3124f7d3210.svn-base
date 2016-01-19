package ;

import com.isartdigital.builder.game.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.Building;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.display.Container;
import pixi.display.FlumpMovie;


class BuildingTest 
{
	var globalMap:Map<Int, Map<Int, Array<Dynamic>>>;
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
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
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_set_tile_under_building_to_not_constructible_state_when_building_is_created():Void
	{
		var lMapManager:MapManager = MapManager.getInstance();
		lMapManager.globalMap = globalMap;
		
		var buildingDefinition:BuildingSavedDef = {
			name: 'rocketfactory',
			x: 5,
			y: 5,
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
		
		var building:Building = new Building();
		
		untyped building.addToStage = function () { };
		building.init(buildingDefinition);
		
		Assert.isFalse(globalMap[3][5][1].isBuildable);
		Assert.isFalse(globalMap[4][5][1].isBuildable);
		Assert.isFalse(globalMap[5][5][1].isBuildable);
	}
}