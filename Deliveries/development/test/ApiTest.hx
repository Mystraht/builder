package ;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import massive.munit.util.Timer;
import massive.munit.Assert;
import massive.munit.async.AsyncFactory;
import pixi.core.display.Container;
import pixi.display.FlumpMovie;


class ApiTest 
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
	public function should_format_path_with_params_object_to_query_format():Void
	{
		var formattedPath:String;
		
		formattedPath = Api.formatPath("http://google.com", { token: "AZERTY123456", x: 5, y: 10 } );
		
		Assert.isTrue(formattedPath == "http://google.com?token=AZERTY123456&x=5&y=10");
	}
}