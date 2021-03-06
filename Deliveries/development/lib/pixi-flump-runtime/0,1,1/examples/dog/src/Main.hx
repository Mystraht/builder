package;
	
import flump.library.FlumpLibrary;
import pixi.display.FlumpMovie;
import pixi.display.FlumpSprite;
import pixi.plugins.app.Application;
import pixi.loaders.FlumpParser;
import pixi.interaction.InteractionManager;
import pixi.core.graphics.Graphics;
import pixi.loaders.Loader;


class Main extends Application{

	

	public static function main():Void {
		new Main();
	}


	public function new(){
		super();
		super.start();

		var loader = new Loader();
		loader.after(FlumpParser.flumpParser);
		loader.add("DogLibrary", "./flump-assets/dog/library.json");
		loader.once("complete", begin);
		loader.load();
	}


	public function begin(){
		var movie = new FlumpMovie("TestScene");	
		movie.loop = true;	
		movie.animationSpeed = 1;
		movie.gotoAndPlay(0);
		stage.addChild(movie);

		/*
		var dog = movie.getChildMovie("DogRunning");
		var placeholder = movie.getLayer("Placeholder");
		var graphics = MapManagerTest Graphics();
		graphics.lineColor = 0x990000;
		graphics.beginFill(0x009900);
		graphics.drawCircle(100, 100, 100);
		placeholder.addChild(graphics);
		*/
		
	}


}