package game.sprites.buildings ;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingMover;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.math.Point;


class BuildingMoverTest 
{
	var building:Building;
	
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
	
	@Before
	public function setup():Void
	{
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
		
		building = new Building();
		
		untyped building.addToStage = function () { };
		building.init(buildingDefinition);
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_move_building_under_mouse():Void {
		var buildingMover:BuildingMover = new BuildingMover(building);
		
		GameManager.getInstance().mousePosition = new Point(10, 750);
		
		buildingMover.moveUnderMouse();
		
		Assert.isTrue(building.position.x == Config.tileWidth * 11);
		Assert.isTrue(building.position.y == Config.tileWidth * 10);
	}
}