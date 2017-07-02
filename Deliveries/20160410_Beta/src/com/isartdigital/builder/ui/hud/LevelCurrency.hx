package com.isartdigital.builder.ui.hud;

import com.isartdigital.utils.ui.UIComponent;
import motion.Actuate;
import motion.easing.Expo;
import pixi.core.display.DisplayObject;
import pixi.core.sprites.Sprite;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class LevelCurrency extends UIComponent
{
	private var originPositionProgressBar:Float;
	private var widthProgressBar:Float;
	
	private var progressBar:DisplayObject;
	private var lvlText:Text;
	
	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
		
		originPositionProgressBar = progressBar.x;
		widthProgressBar = progressBar.getLocalBounds().width;
		
		
		lvlText.text = "1";
		
		setProgressBar(0, false);
	}
	
	/**
	 * Change le niveau afficher dans le HUD
	 * @param	pLevel
	 */
	public function setLevel (pLevel:Int) : Void {
		lvlText.text = pLevel + "";
	}
	
	/**
	 * Change la position de la progressBar
	 * @param	pPercent : Pourcentage de complession du niveau
	 * @param	pFeedBack : joue une animation
	 */
	public function setProgressBar (pPercent:Float, ?pFeedBack:Bool = true) {
		if (pPercent >= 100) pPercent = 100;
		
		var newPosition:Float = originPositionProgressBar - (100 - pPercent) * widthProgressBar / 100;
		
		if (!pFeedBack)
			progressBar.x = newPosition;
		else {
			Actuate.tween(progressBar, 2, { x : newPosition} ).ease(Expo.easeOut);
		}
	}
	
	public function placePicture (pPicture:Sprite) : Void {
		addChild(pPicture);
		setChildIndex(pPicture, getChildIndex(progressBar) + 1);
		pPicture.position.set(55, 30);
	}
	
	private function setVariableFromChild () : Void {
		lvlText = cast(getChildByName("Level_txt"), Text);
		progressBar = getChildByName("LevelBarAsset");
	}
	
}