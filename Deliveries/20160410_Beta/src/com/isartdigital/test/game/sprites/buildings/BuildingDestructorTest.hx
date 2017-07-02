package game.sprites.buildings ;

import pixi.core.math.Point;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingDestructor;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.Assert;
import org.hamcrest.Matchers.*;

class BuildingDestructorTest
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
		
		globalMap[buildingSaved.x][buildingSaved.y].push(buildingSaved);
		building.init(buildingSaved);
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_call_building_destruct_api():Void {
		var buildingDestructor:BuildingDestructor = new BuildingDestructor(building);
		var buildingDestructApiSpy = 0;
		
		Api.getInstance();
		
		untyped Api.buildings.destroy = function (x, y, callback) {
			buildingDestructApiSpy++;
			callback('{ error: false }');
		}
		
		untyped buildingDestructor.cbTryToDestroy = function (s:String) {}
		
		buildingDestructor.destruct();
		
		Assert.isTrue(buildingDestructApiSpy == 1);
	}
	
	@Test
	public function should_call_building_destroy():Void {
		var buildingDestructor:BuildingDestructor = new BuildingDestructor(building);
		var buildingDestroySpy = 0;
		
		Api.getInstance();
		
		untyped building.cleanObject = function () { };
		untyped building.destroy = function () { buildingDestroySpy++; };
		untyped Api.buildings.destroy = function (x, y, callback) {
			callback('{"data":"","error":false,"errorCode":-1,"errorMessage":""}');
		}
		
		buildingDestructor.destruct();
		
		Assert.isTrue(buildingDestroySpy == 1);
	}
	
	@Test
	public function should_remove_building_from_global_map():Void {
		var buildingDestructor:BuildingDestructor = new BuildingDestructor(building);
		
		Api.getInstance();
		
		untyped Api.buildings.destroy = function (x, y, callback) {
			callback('{ error: false }');
		}
		
		untyped buildingDestructor.cbTryToDestroy = function (s:String) {}
		
		buildingDestructor.destruct();
		
		assertThat(globalMap[5][5], hasSize(3));
	}
}