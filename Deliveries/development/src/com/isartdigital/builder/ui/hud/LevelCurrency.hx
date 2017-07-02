package com.isartdigital.builder.ui.hud;

import com.isartdigital.services.FacebookPicture;
import com.isartdigital.utils.Localization;
import com.isartdigital.utils.ui.UIComponent;
import haxe.Timer;
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
	private var xpInfo:Text;
	private var leveltTile:Text;
	
	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
		
		originPositionProgressBar = progressBar.x;
		widthProgressBar = progressBar.getLocalBounds().width;
		
		createXpInfo();
		lvlText.text = "1";
		
		leveltTile.text = "";
		leveltTile.style.strokeThickness = 12;
		leveltTile.style.stroke = "#6B3C17";

		//trace("level TIlte font " + leveltTile.style.font);
		
		setProgressBar(0, false);
		if (FacebookPicture.pictureIsLoad)
			placePicture(FacebookPicture.movePictureIntoFrame());
		else {
			Timer.delay(pastePictureWithDelay, 2500);
		}
	}
	
	private function pastePictureWithDelay() : Void {
		placePicture(FacebookPicture.movePictureIntoFrame());
	}
	
	private function createXpInfo () : Void {
		var style:TextStyle = { };
		style.font = "bold 50px Blissful Thinking";
		style.fill = "#f3f3a8";
		//style.wordWrap = true;
		//style.wordWrapWidth = uiStyle.width;
		xpInfo = new Text("0 %", style);
		xpInfo.position.set(450, 65);
		addChild(xpInfo);
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
		
		if (!pFeedBack) {	
			progressBar.x = newPosition;
			xpInfo.text = pPercent + " %";
		}
		else {
			Actuate.tween(progressBar, 2, { x : newPosition} ).ease(Expo.easeOut).onUpdate(updateXpInfoText);
		}
		
		leveltTile.text = Localization.getText("label_level");
	}
	
	private function updateXpInfoText () : Void {
		var newPercentToDisplay:Float = (originPositionProgressBar + progressBar.x) / (widthProgressBar + originPositionProgressBar);
		newPercentToDisplay *= 100;
		newPercentToDisplay = Math.ceil(newPercentToDisplay) - 1;
		xpInfo.text = newPercentToDisplay + " %";
	}
	
	public function placePicture (pPicture:Sprite) : Void {
		addChild(pPicture);
		setChildIndex(pPicture, getChildIndex(getChildByName("AvatarDefaultAsset")) + 1);
		pPicture.position.set(55, 30);
	}
	
	private function setVariableFromChild () : Void {
		leveltTile = cast(getChildByName("LevelTitle_txt"), Text);
		lvlText = cast(getChildByName("Level_txt"), Text);
		progressBar = getChildByName("LevelBarAsset");
	}
	
}