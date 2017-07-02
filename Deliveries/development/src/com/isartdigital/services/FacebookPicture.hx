package com.isartdigital.services;

import pixi.loaders.Loader;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.utils.events.LoadEventType;
import com.isartdigital.utils.game.GameStage;
import pixi.core.display.Container;
import pixi.core.sprites.Sprite;
import pixi.core.textures.Texture;
import pixi.filters.color.ColorMatrixFilter;

/**
 * Class qui permet de charger une image depuis un domaine externe
 * @author Dorian MILLIERE
 */
class FacebookPicture
{
	private static var picture:Sprite;
	private static var picturePath:String;
	
	public static var pictureIsLoad:Bool = false;
	
	public function new() 
	{
		
	}
	
	public static function load(path:String):Void {
		picturePath = path;
		var loader:Loader = new Loader();
		loader.add(picturePath);
		loader.once(LoadEventType.COMPLETE, onPictureLoaded);
		loader.load();
	}
	
	public static function onPictureLoaded():Void {
		fillPictureWithTexture();
		pictureIsLoad = true;
		//addBlackAndWhiteFilter();
		//movePictureIntoFrame();
	}
	
	private static function fillPictureWithTexture():Void {
		picture = new Sprite (Texture.fromImage(picturePath));
	}
	
	private static function addBlackAndWhiteFilter():Void {
		var filter:ColorMatrixFilter = new ColorMatrixFilter();
		filter.blackAndWhite(false);
        picture.filters = [filter];
	}
	
	public static function movePictureIntoFrame():Sprite {
		//var hudContainer:Container = GameStage.getInstance().getHudContainer();
		//var hud:Hud = Hud.getInstance();
		picture.height = 190;
		picture.width = 190;
		return picture;
		//hud.getLevelComponent().placePicture(picture);
	}
}