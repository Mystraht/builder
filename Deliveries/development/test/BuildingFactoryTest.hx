package ;

import com.isartdigital.builder.game.factory.BuildingFactory;
import com.isartdigital.builder.game.sprites.buildings.Motel;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;


class BuildingFactoryTest
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
		var motel:Motel = cast(BuildingFactory.create("Motel"));
		var isMotelClassType:Bool = Std.is(motel, Motel);
		
		Assert.isTrue(isMotelClassType);
	}
}