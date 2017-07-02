package game.sprites.buildings ;

import com.isartdigital.builder.game.sprites.buildings.BuildingDefinition;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.utils.loader.GameLoader;
import massive.munit.Assert;


class BuildingDefinitionTest 
{
	
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
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
	public function should_return_definition_by_name():Void
	{
		var buildingDefinition:BuildingDef;
		
		buildingDefinition = BuildingDefinition.getByName("rocketfactory");
		
		Assert.isTrue(buildingDefinition.className == "RocketFactory");
		Assert.isTrue(buildingDefinition.spriteName == "Building_3x1");
		Assert.isTrue(buildingDefinition.size.width == 3);
		Assert.isTrue(buildingDefinition.size.height == 1);
	}
	
	@Test
	public function should_throw_an_error_if_definition_name_dont_exist():Void {
		var thereIsAnError:Bool;
		
		try {
			BuildingDefinition.getByName("inexistantBuildingName");
			thereIsAnError = false;
		} catch (e:String) {
			thereIsAnError = true;
		}
		
		Assert.isTrue(thereIsAnError);
	}
}