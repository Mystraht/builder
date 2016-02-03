package ;

import com.isartdigital.builder.game.GameManager;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.math.Point;


class BuildingPositionTest 
{
	
	
	public function new() 
	{
		
	}
	
	@BeforeClass
	public function beforeClass():Void
	{
		GameManager.getInstance().mousePosition = new Point(150, 150);
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
	public function should_get_building_position_under_mouse():Void
	{
		Assert.isTrue(false);
	}
}