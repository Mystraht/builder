package ;

import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.MapSavedDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.Main;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.loader.GameLoader;
import haxe.Json;
import js.Browser;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.math.Point;


class MapManagerTest 
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
		Building.list = new Array<Building>();
		IsoManager.init(Config.tileWidth, Config.tileHeight);
		
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
	public function should_return_true_if_building_is_contructible_or_false_if_it_is_not():Void
	{
		var lMapManager:MapManager = MapManager.getInstance();
		lMapManager.globalMap = globalMap;
		
		globalMap[5][5][1].isBuildable = false;
		
		var test1:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(2, 2), {width: 1, height: 1});
		var test2:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(4, 4), {width: 3, height: 3});
		var test3:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(7, 7), {width: 2, height: 2});
		var test4:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(5, 5), {width: 1, height: 1});
		var test5:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(7, 7), {width: 3, height: 3});
		var test6:Array<TileSavedDef> = lMapManager.getTilesArray(new Point(1, 1), {width: 3, height: 3}); // hors map
		
		Assert.isTrue(lMapManager.isBuildable(test1));
		Assert.isTrue(lMapManager.isBuildable(test2));
		Assert.isTrue(lMapManager.isBuildable(test3));
		Assert.isFalse(lMapManager.isBuildable(test4));
		Assert.isFalse(lMapManager.isBuildable(test5));
		Assert.isFalse(lMapManager.isBuildable(test6));
	}
	
	@Test
	public function should_modify_buildable_state_of_tile_array():Void {
		var lMapManager:MapManager = MapManager.getInstance();
		var tilesArray:Array<TileSavedDef> = [{
			x: 2,
			y: 3,
			isBuildable: true
		}, {
			x: 3,
			y: 3,
			isBuildable: true
		}, {
			x: 4,
			y: 3,
			isBuildable: true
		}];
		
		lMapManager.globalMap = globalMap;
		
		lMapManager.setTilesBuildable(tilesArray, false);
		
		Assert.isFalse(globalMap[2][3][1].isBuildable);
		Assert.isFalse(globalMap[3][3][1].isBuildable);
		Assert.isFalse(globalMap[4][3][1].isBuildable);
		
		lMapManager.setTilesBuildable(tilesArray, true);
		
		Assert.isTrue(globalMap[2][3][1].isBuildable);
		Assert.isTrue(globalMap[3][3][1].isBuildable);
		Assert.isTrue(globalMap[4][3][1].isBuildable);
	}
	
	@Test
	public function should_save_building_in_localStorage():Void {
		Browser.getLocalStorage().setItem("save", '');
		var lMapManager:MapManager = MapManager.getInstance();
		
		lMapManager.globalMap = globalMap;
		
		var buildingDefinition:BuildingSavedDef = {
			name: 'rocketfactory',
			x: 5,
			y: 5,
			color: "A",
			buildingLevel: 5
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
		
		MapManager.getInstance().saveMap();
		
		var save:MapSavedDef = cast(Json.parse(Browser.getLocalStorage().getItem("save")));
		
		Assert.isTrue(save.buildings[0].name == 'rocketfactory');
		Assert.isTrue(save.buildings[0].x == 5);
		Assert.isTrue(save.buildings[0].y == 5);
		Assert.isTrue(save.buildings[0].buildingLevel == 5);
	}
}