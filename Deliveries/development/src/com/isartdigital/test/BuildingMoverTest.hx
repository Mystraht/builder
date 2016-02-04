package ;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.BuildingMover;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
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
	public function should_set_correct_destination():Void
	{
		var buildingMover:BuildingMover;
		var destination:Point;
		
		GameManager.getInstance().mousePosition = new Point(150, 150);
		
		buildingMover = new BuildingMover(building);
		buildingMover.setDestination(new Point(5, 7));
		
		destination = buildingMover.getDestination();
		
		Assert.isTrue(destination.x == 5);
		Assert.isTrue(destination.y == 7);
	}
	
	@Test
	public function should_throw_error_if_no_destination_setted():Void {
		var buildingMover:BuildingMover;
		var thereIsError:Bool;
		
		buildingMover = new BuildingMover(building);
		
		try {
			buildingMover.getDestination();
			thereIsError = false;
		} catch (e:String) {
			thereIsError = true;
		}
		
		Assert.isTrue(thereIsError);
	}
	
	@Test
	public function should_move_building_at_correct_destination():Void {
		
	}
}