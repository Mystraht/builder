package com.isartdigital.services;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.utils.events.LoadEventType;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.loader.GameLoader;
import pixi.core.display.Container;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import pixi.filters.color.ColorMatrixFilter;
import pixi.filters.gray.GrayFilter;

/**
 * Class qui permet de charger une image depuis un domaine externe
 * @author Dorian MILLIERE
 */
class FacebookPicture
{
	private static var picture:Sprite;
	private static var picturePath:String;
	
	public function new() 
	{
		
	}
	
	public static function load(path:String):Void {
		picturePath = path;
		var loader:GameLoader = new GameLoader();
		loader.addAssetFile(picturePath);
		loader.once(LoadEventType.COMPLETE, onPictureLoaded);
		loader.load();
	}
	
	public static function onPictureLoaded():Void {
		fillPictureWithTexture();
		addBlackAndWhiteFilter();
		movePictureIntoFrame();
	}
	
	private static function fillPictureWithTexture():Void {
		picture = new Sprite (Texture.fromImage(picturePath));
	}
	
	private static function addBlackAndWhiteFilter():Void {
		var filter:ColorMatrixFilter = new ColorMatrixFilter();
		filter.blackAndWhite(false);
        picture.filters = [filter];
	}
	
	private static function movePictureIntoFrame():Void {
		var hudContainer:Container = GameStage.getInstance().getHudContainer();
		var hud:Hud = Hud.getInstance();
		picture.x = hud.levelComponent.x - 330;
		picture.y = hud.levelComponent.y - 190;
		picture.height = 190;
		picture.width = 190;
		hudContainer.addChild(picture);
		hudContainer.children.unshift(hudContainer.children.pop());
	}
}