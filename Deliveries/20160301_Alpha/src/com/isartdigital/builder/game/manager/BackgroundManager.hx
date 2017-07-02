package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.game.sprites.Background;
import com.isartdigital.builder.game.utils.CameraUtils;
import com.isartdigital.utils.game.GameStage;

	
/**
 * ...
 * @author Flavien
 */
class BackgroundManager 
{
	/**
	 * instance unique de la classe BackgroundManager
	 */
	private static var instance: BackgroundManager;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): BackgroundManager {
		if (instance == null) instance = new BackgroundManager();
		return instance;
	}
	
	private var list:Array<Background> = new Array<Background> ();
	
	private static inline var numberBackground:Int = 15;
	private static inline var widthBackground:Int = 1024;
	private static inline var heightBackground:Int = 683;
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		fillList();
	}
	
	private function fillList () : Void {
		for (i in 0...numberBackground) 
		{
			for (j in 0...numberBackground) {
				var lBackground:Background = new Background();
				lBackground.start();
				GameStage.getInstance().getBackgroundContainer().addChild(lBackground);
			
				lBackground.x = - 7600 + j * widthBackground;
				lBackground.y = i * heightBackground;					
				
				list.push(lBackground);				
			}
		}
	}
	
	public function manage () {
		
	}
	
	private function getBackgroundOutOfScreen () : Array<Background> {
		var lArray:Array<Background> = new Array <Background> ();
		for (lBackground in list) {
			if (lBackground.x > CameraUtils.ScreenRight()) lArray.push(lBackground);
			else if (lBackground.y > CameraUtils.ScreenBottom()) lArray.push(lBackground);
			else if (lBackground.y + heightBackground < CameraUtils.ScreenTop()) lArray.push(lBackground);
			else if (lBackground.x + widthBackground < CameraUtils.ScreenLeft()) lArray.push(lBackground);
		}
		return lArray;
	}
	
	public function scrollBackground():Void {
		for (lBackground in getBackgroundOutOfScreen()) {
			list[list.indexOf(lBackground)].destroy();
			list.splice(list.indexOf(lBackground), 1);
		}
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}

}