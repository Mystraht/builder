package ;

import com.isartdigital.builder.game.sprites.buildings.BuildingBuilder;
import com.isartdigital.builder.game.sprites.buildings.childrens.Motel;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;


class BuildingBuilderTest
{
	
	
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
	}
	
	@After
	public function tearDown():Void
	{
	}
	
	@Test
	public function should_create_building():Void
	{
		var motel:Motel = cast(BuildingBuilder.createBuildingByName("Motel"));
		var isMotelClassType:Bool = Std.is(motel, Motel);
		
		Assert.isTrue(isMotelClassType);
	}
	
	@Test public function should_add_collectable_and_upgradable_components_to_motel():Void {
		var motel:Motel = cast(BuildingBuilder.createBuildingByName("Motel"));

		untyped Assert.isTrue(motel.collectableComponent != null);
		untyped Assert.isTrue(motel.upgradableComponent != null);
	}
}