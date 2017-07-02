package ;

import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.builder.game.map.GMapCreator;
import pixi.core.math.Point;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;
import massive.munit.Assert;
import org.hamcrest.Matchers.*;

class GMapTest
{
	var globalMap:Map<Int, Map<Int, Array<Dynamic>>>;
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
		var tile:TileModelDef;
		var lPosition:String;
		Building.list = new Array<Building>();
		IsoManager.init(Config.tileWidth, Config.tileHeight);
		
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
		GMap.globalMap = globalMap;
		
		globalMap[5][5][1].isBuildable = false;
		
		var test1:Array<TileModelDef> = Tile.getTilesArray(new Point(2, 2), {width: 1, height: 1});
		var test2:Array<TileModelDef> = Tile.getTilesArray(new Point(4, 4), {width: 3, height: 3});
		var test3:Array<TileModelDef> = Tile.getTilesArray(new Point(7, 7), {width: 2, height: 2});
		var test4:Array<TileModelDef> = Tile.getTilesArray(new Point(5, 5), {width: 1, height: 1});
		var test5:Array<TileModelDef> = Tile.getTilesArray(new Point(7, 7), {width: 3, height: 3});
		var test6:Array<TileModelDef> = Tile.getTilesArray(new Point(1, 1), {width: 3, height: 3}); // hors map
		
		Assert.isTrue(Tile.isTilesBuildable(test1));
		Assert.isTrue(Tile.isTilesBuildable(test2));
		Assert.isTrue(Tile.isTilesBuildable(test3));
		Assert.isFalse(Tile.isTilesBuildable(test4));
		Assert.isFalse(Tile.isTilesBuildable(test5));
		Assert.isFalse(Tile.isTilesBuildable(test6));
	}
	
	@Test
	public function should_modify_buildable_state_of_tile_array():Void {
		var tilesArray:Array<TileModelDef> = [ {
			type: ModelElementNames.TILE,	
			x: 2,
			y: 3,
			isBuildable: true,
			isIlluminated: false,
			alpha: 1
		}, {
			type: ModelElementNames.TILE,
			x: 3,
			y: 3,
			isBuildable: true,
			isIlluminated: false,
			alpha: 1
		}, {
			type: ModelElementNames.TILE,
			x: 4,
			y: 3,
			isBuildable: true,
			isIlluminated: false,
			alpha: 1
		}];
		
		GMap.globalMap = globalMap;
		
		Tile.changeTilesBuildableState(tilesArray, false);
		
		Assert.isFalse(globalMap[2][3][1].isBuildable);
		Assert.isFalse(globalMap[3][3][1].isBuildable);
		Assert.isFalse(globalMap[4][3][1].isBuildable);
		
		Tile.changeTilesBuildableState(tilesArray, true);
		
		Assert.isTrue(globalMap[2][3][1].isBuildable);
		Assert.isTrue(globalMap[3][3][1].isBuildable);
		Assert.isTrue(globalMap[4][3][1].isBuildable);
	}
	
	function addFakeElementBySizeInGlobalMap():Void {
		GMap.globalMap = new Map<Int, Map<Int, Array<Dynamic>>> ();
		untyped GMapCreator.insertTilesInto(GMap.globalMap);
		
		var size:SizeDef = getFakeSizeDef();
		
		var fakeBuilding:BuildingModelDef = {
			type: "building",
			name: "rocket_factory",
			x: 5,
			y: 5,
			color: 'A',
			buildingLevel: 0
		};
		
		GMap.addElementsBySizeAt(new Point(5, 5), size, fakeBuilding);
	}
	
	function getFakeSizeDef():Dynamic {
		return {
			width: 2,
			height: 2
		};
	}
	
	@Test
	public function should_add_bunch_off_elements_in_global_map():Void {
		var isError:Bool;
		addFakeElementBySizeInGlobalMap();
		
		assertThat(GMap.getElementByTypeAt(new Point(5, 5), 'building').x, equalTo(5));
		assertThat(GMap.getElementByTypeAt(new Point(5, 5), 'building').y, equalTo(5));
		
		assertThat(GMap.getElementByTypeAt(new Point(4, 4), 'building').x, equalTo(5));
		assertThat(GMap.getElementByTypeAt(new Point(4, 4), 'building').y, equalTo(5));
		
		assertThat(GMap.getElementByTypeAt(new Point(5, 4), 'building').x, equalTo(5));
		assertThat(GMap.getElementByTypeAt(new Point(5, 4), 'building').y, equalTo(5));
		
		assertThat(GMap.getElementByTypeAt(new Point(4, 5), 'building').x, equalTo(5));
		assertThat(GMap.getElementByTypeAt(new Point(4, 5), 'building').y, equalTo(5));
	}
	
	@Test
	public function should_remove_bunch_off_elements_in_global_map():Void {
		var size:SizeDef = getFakeSizeDef();
		
		addFakeElementBySizeInGlobalMap();
		
		GMap.removeElementsBySizeAndTypeAt(new Point(5, 5), size, 'building');
		
		assertThat(GMap.globalMap[5][5], hasSize(1));
		assertThat(GMap.globalMap[4][4], hasSize(1));
		assertThat(GMap.globalMap[5][4], hasSize(1));
		assertThat(GMap.globalMap[4][5], hasSize(1));
	}
}