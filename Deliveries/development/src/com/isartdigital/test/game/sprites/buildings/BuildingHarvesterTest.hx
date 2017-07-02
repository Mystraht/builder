package game.sprites.buildings ;

import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingHarvester;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.Assert;
import pixi.core.math.Point;
import org.hamcrest.Matchers.*;

/**
 * ...
 * @author Dorian MILLIERE
 */

class BuildingHarvesterTest 
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
	}
	
	public function initBuildingByLevelAndLastRecoltDate(level:Int, last_recolt_at:String) {
		var buildingDefinition:BuildingModelDef = {
			type: ModelElementNames.BUILDING,
			name: 'city_hall',
			x: 5,
			y: 5,
			color: "A",
			buildingLevel: level,
			last_recolt_at: last_recolt_at//"2016-02-17 18:42:36"
		}
		
		GMap.globalMap[5][5].push(buildingDefinition);
		
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
					 "resource_production":"gold",
					 "production":250,
					 "capacity":375
				  },
				  "2":{
					 "resource_production":"gold",
					 "production":400,
					 "capacity":600
				  },
				  "3":{
					 "resource_production":"gold",
					 "production":600,
					 "capacity":900
				  }
			   }
			};
		}
		
		RessourceManager.getInstance().ressources = {
			gold: 500,
			offering: 500,
			spice: 500
		}
		untyped RessourceManager.getInstance().updateRessourcesInHud = function () {};
	}
	
	public function getDateNowWithAdded(milliseconds:Int):String {
		return Date.fromTime((Date.now().getTime() - milliseconds)).toString();
	}
	
	public function hour(n:Int) {
		return n * 3600 * 1000;
	}
	
	@After
	public function tearDown():Void
	{
		GMap.globalMap[5][5].pop();
	}
	
	@Test
	public function should_tell_if_building_is_harvester():Void {
		initBuildingByLevelAndLastRecoltDate(0, getDateNowWithAdded(hour(1)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		Assert.isTrue(buildingHarvester.isBuildingHasHarvestFunctionality());
	}
	
	@Test
	public function should_get_percent_of_filled_resource_when_building_is_not_full():Void {
		initBuildingByLevelAndLastRecoltDate(0, getDateNowWithAdded(hour(1)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		assertThat(buildingHarvester.getPercentFilled(), closeTo(0.66, 0.01));
	}
	
	@Test
	public function should_get_percent_of_filled_resource_when_building_is_full():Void {
		initBuildingByLevelAndLastRecoltDate(0, getDateNowWithAdded(hour(2)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		assertThat(buildingHarvester.getPercentFilled(), equalTo(1));
	}
	
	@Test
	public function should_harvest_building_when_is_it_not_full():Void {
		initBuildingByLevelAndLastRecoltDate(0, getDateNowWithAdded(hour(1)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		buildingHarvester.harvest();
		
		var currentGold:Int = RessourceManager.getInstance().getRessources(RessourceManager.GOLD);
		assertThat(currentGold, closeTo(750, 10));
	}
	
	@Test
	public function should_harvest_building_when_building_is_full():Void {
		initBuildingByLevelAndLastRecoltDate(0, getDateNowWithAdded(hour(2)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		buildingHarvester.harvest();
		
		var currentGold:Int = RessourceManager.getInstance().getRessources(RessourceManager.GOLD);
		assertThat(currentGold, closeTo(875, 10));
	}
	
	@Test
	public function should_harvest_building_when_building_is_level_two():Void {
		initBuildingByLevelAndLastRecoltDate(1, getDateNowWithAdded(hour(1)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		
		buildingHarvester.harvest();
		
		var currentGold:Int = RessourceManager.getInstance().getRessources(RessourceManager.GOLD);
		assertThat(currentGold, closeTo(900, 10));
	}
	
	@Test
	public function should_update_global_map_after_harverting():Void {
		initBuildingByLevelAndLastRecoltDate(1, getDateNowWithAdded(hour(1)));
		var buildingHarvester:BuildingHarvester = new BuildingHarvester(building);
		var buildingModel:BuildingModelDef = GMap.globalMap[5][5][GMap.globalMap[5][5].length - 1];
		
		buildingHarvester.harvest();
		
		var dateInGlobalMap:Float = Date.fromString(buildingModel.last_recolt_at).getTime();
		
		assertThat(dateInGlobalMap, closeTo(Date.now().getTime(), 10000));
	}
}