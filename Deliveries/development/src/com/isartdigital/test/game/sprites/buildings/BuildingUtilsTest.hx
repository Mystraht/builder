package game.sprites.buildings ;

import com.isartdigital.builder.game.map.GMapCreator;
import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.BuildingUtils;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.services.Users;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;
import massive.munit.Assert;


class BuildingUtilsTest
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
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_throw_an_error_if_there_is_no_building_at_position_passed_in_argument():Void {
		var isError:Bool = false;
		
		try {
			BuildingUtils.isBuildingOriginInGlobalMapAt(new Point(10, 10));
		} catch (e:String) {
			isError = true;
		}
		
		Assert.isTrue(isError);
	}
	
	@Test
	public function should_tell_is_origin_of_a_building():Void {
		var result:Bool = BuildingUtils.isBuildingOriginInGlobalMapAt(new Point(5, 5));
		
		Assert.isTrue(result);
	}
	
	@Test
	public function should_tell_is_not_origin_of_a_building():Void {
		var result:Bool = BuildingUtils.isBuildingOriginInGlobalMapAt(new Point(4, 5));
		
		Assert.isFalse(result);
	}
}