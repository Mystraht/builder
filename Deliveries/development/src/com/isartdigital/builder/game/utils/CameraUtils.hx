package com.isartdigital.builder.game.utils;

/**
 * Classe static d'utils pour récupérer les coordonnées de l'écran
 * @author Flavien
 */
class CameraUtils
{

	public function new() 
	{

	}
	
	public static function ScreenLeft():Float {
		return GameManager.getInstance().getScreenRect().x;
	}
	
	public static function ScreenRight():Float {
		return GameManager.getInstance().getScreenRect().x + GameManager.getInstance().getScreenRect().width;
	}
	
	public static function ScreenTop():Float {
		return GameManager.getInstance().getScreenRect().y;
	}
	
	public static function ScreenBottom():Float {
		return GameManager.getInstance().getScreenRect().y + GameManager.getInstance().getScreenRect().height;
	}
	
}