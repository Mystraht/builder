package api;

import massive.munit.Assert;


class Utils 
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
		
		formattedPath = Utils.formatPath("http://google.com", { token: "AZERTY123456", x: 5, y: 10 } );
		
		Assert.isTrue(formattedPath == "http://google.com?token=AZERTY123456&x=5&y=10");
	}
}