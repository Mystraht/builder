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
		return GameManager.getInstance().get_ScreenRect().x;
	}
	
	public static function ScreenRight():Float {
		return GameManager.getInstance().get_ScreenRect().x + GameManager.getInstance().get_ScreenRect().width;
	}
	
	public static function ScreenTop():Float {
		return GameManager.getInstance().get_ScreenRect().y;
	}
	
	public static function ScreenBottom():Float {
		return GameManager.getInstance().get_ScreenRect().y + GameManager.getInstance().get_ScreenRect().height;
	}
	
}