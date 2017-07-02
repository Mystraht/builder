package game.sprites.buildings;

import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.map.GMapCreator;
import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.display.Container;
import pixi.display.FlumpMovie;
import org.hamcrest.Matchers.*;

class BuildingConstructorTest 
{
	var building:Building;
	var buildingConstructor:BuildingConstructor;
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
		
	}
	
	public function initMap():Void {
		GMap.globalMap = new Map<Int, Map<Int, Array<Dynamic>>> ();
		untyped GMapCreator.insertTilesInto(GMap.globalMap);
	}
	
	@AfterClass
	public function afterClass():Void
	{
	}
	
	@Before
	public function setup():Void
	{
		initMap();

		var buildingSaved:BuildingModelDef = {
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
		
		building= new Building();
		
		untyped building.addToStage = function () { };
		untyped building.buildingConstructor.updateBuildingSavedInServer = function () { };
		
		untyped Users.infos = { };
		untyped Users.infos.buildings = [{
			"name": buildingSaved.name,
			"x": buildingSaved.x,
			"y": buildingSaved.y,
			"construct_end_at": Date.now(),
			"color": buildingSaved.color,
		}];
	
		untyped GMapCreator.insertBuildingsInto(GMap.globalMap);
		building.init(buildingSaved);
		untyped buildingConstructor = building.buildingConstructor;
	}
	
	@After
	public function tearDown():Void
	{
	}
	

	@Test
	public function should_not_move_building_when_destination_tiles_is_not_constructible():Void {
		buildingConstructor.setDestination(new Point(10, 10));
		
		Assert.isFalse(buildingConstructor.canConstruct());
	}
	
	@Test
	public function should_move_building_when_destination_tiles_is_constructible():Void {
		buildingConstructor.setDestination(new Point(10, 10));
		
		GMap.getElementByTypeAt(new Point(10, 10), ModelElementNames.TILE).isBuildable = true;
		GMap.getElementByTypeAt(new Point(9, 10), ModelElementNames.TILE).isBuildable = true;
		GMap.getElementByTypeAt(new Point(8, 10), ModelElementNames.TILE).isBuildable = true;
		
		Assert.isTrue(buildingConstructor.canConstruct());
	}
	
	@Test
	public function should_set_tile_to_unconstructible_when_building_is_moved():Void {
		buildingConstructor.setDestination(new Point(10, 10));
		buildingConstructor.construct();
		
		Assert.isFalse(GMap.getElementByTypeAt(new Point(10, 10), ModelElementNames.TILE).isBuildable);
	}
	
	@Test
	public function should_remove_building_from_original_position_in_global_map_when_building_is_moved():Void {
		buildingConstructor.setDestination(new Point(10, 10));
		buildingConstructor.construct();

		Assert.isTrue(GMap.globalMap[5][5].length == 1);
		Assert.isTrue(GMap.globalMap[4][5].length == 1);
		Assert.isTrue(GMap.globalMap[3][5].length == 1);
	}
	
	@Test
	public function should_add_building_to_destination_position_in_global_map_when_building_is_moved():Void {
		buildingConstructor.setDestination(new Point(10, 10));
		buildingConstructor.construct();

		Assert.isTrue(GMap.globalMap[10][10].length == 2);
		Assert.isTrue(GMap.globalMap[9][10].length == 2);
		Assert.isTrue(GMap.globalMap[8][10].length == 2);
	}
	
	@Test
	public function should_add_building_ref_under_each_position_of_building():Void {
		var building:BuildingModelDef = GMap.getElementByTypeAt(new Point(4, 5), 'building');

		assertThat(Std.int(building.x), equalTo(5));
		assertThat(Std.int(building.y), equalTo(5));
	}
}