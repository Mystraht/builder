package game.sprites.buildings ;

import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.BuildingConstructor;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.math.Point;
import massive.munit.Assert;
import org.hamcrest.Matchers.*;

class BuildingTest 
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
	
	@AfterClass
	public function afterClass():Void
	{
	}
	
	@Before
	public function setup():Void
	{
		initMap();
		GMap.globalMap = globalMap;
		
		var buildingDefinition:BuildingModelDef = {
			type: ModelElementNames.BUILDING,
			name: 'city_hall',
			x: 5,
			y: 5,
			color: "A",
			buildingLevel: 1
		}
		
		untyped GameLoader.getContent = function () {
			return [
				{
					 "name":"city_hall",
					 "spriteName":"Building_CityHall",
					 "className":"CityHall",
					 "component": ["MOVABLE","ERASABLE","UPGRADABLE", "COLLECTABLE"],
					 "size":{
						"width":4,
						"height":4
					 }
				  }
			];
		}
		
		building = new Building();
		
		untyped building.addToStage = function () { };
		untyped building.buildingConstructor.updateBuildingSavedInServer = function () { };
		
		globalMap[buildingDefinition.x][buildingDefinition.y].push(buildingDefinition);
		
		building.init(buildingDefinition);
		
		untyped GameLoader.getContent = function () {
			return {
			   "city_hall":{
				  "1":{
					 "resource_price":"gold",
					 "price":50,
					 "resource_upgrade":"offering",
					 "upgrade_price":35,
					 "hard_price":5,
					 "contruction_time":3
				  },
				  "2":{
					 "contruction_time":5
				  },
				  "3":{
					 "contruction_time":8
				  }
			   }
			};
		}
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_set_tile_under_building_to_not_constructible_state_when_building_is_created():Void
	{
		Assert.isFalse(globalMap[3][5][1].isBuildable);
		Assert.isFalse(globalMap[4][5][1].isBuildable);
		Assert.isFalse(globalMap[5][5][1].isBuildable);
	}
	
	@Test
	public function should_throw_error_when_config_is_not_found():Void {
		var error:Bool = false;
		
		untyped GameLoader.getContent = function () { return { } };
		
		try {
			building.getConfig();
		} catch (e:String){
			error = true;
		}
		
		Assert.isTrue(error);
	}
	
	@Test
	public function should_get_correct_config_in_json():Void {
		var buildingConfig:Dynamic = building.getConfig();
		var contructionTime:Dynamic = Reflect.field(buildingConfig, 'contruction_time');
		
		assertThat(contructionTime, equalTo(5));
	}
}