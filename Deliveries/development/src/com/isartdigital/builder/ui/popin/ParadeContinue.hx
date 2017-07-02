package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.buttons.AdButton;
import com.isartdigital.builder.ui.buttons.ContinueHardButton;
import com.isartdigital.services.Ads;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ParadeContinue extends Popin
{
	private var adButton:AdButton;
	private var continueHardButton:ContinueHardButton;
	
	private var isOnlyClose = true;
	
	public function new() 
	{
		super();
		build();
		
		setVariablesFromChild();
		subscribeEvent();
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	private function setVariablesFromChild () : Void {
		adButton = cast(getChildByName("AdButton"), AdButton);
		continueHardButton = cast(getChildByName("ContinueHardButton"), ContinueHardButton);
	}
	
	private function subscribeEvent () : Void {
		adButton.click = adButton.tap = onAdButton;
		continueHardButton.click = continueHardButton.tap = onHardButton;
	}
	
	private function onAdButton (event:EventTarget) : Void {
		if (DeviceCapabilities.isCocoonJS) {
			if (!Ads.getImage(onAdsMovieEnd)) return;
		}
		if (!Ads.getMovie(onAdsMovieEnd)) return;
	}
	
	private function onAdsMovieEnd (params:Dynamic) : Void {
		if (params == null) {
			trace("Erreur Ads API");
			return;
		}
		else if (params.error != null) {
			trace (params.error);
			return;
		}
		else {
			trace(params);
			closeThisPopinWithoutCloseButton();
			GameManager.getInstance().continueParade();
		};
	}
	
	private function getMoreTimeParadePrice () : Int {
		return 2;
	}
	
	private function onHardButton (event:EventTarget) : Void {
		if (!RessourceManager.getInstance().removeRessources(RessourceManager.SPICE, getMoreTimeParadePrice())) {
			//UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_NOMONEY);
			return;
		}
		
		closeThisPopinWithoutCloseButton();
		GameManager.getInstance().continueParade();
	}
	
	private function closeThisPopinWithoutCloseButton () : Void {
		isOnlyClose = false;
		UIManager.getInstance().closeCurrentPopin();
	}
	
	private function onCloseWithCloseButton () : Void {
		GameManager.getInstance().dontContinueParade();
	}
	
	override public function destroy():Void 
	{
		if (isOnlyClose) onCloseWithCloseButton();
		
		
		super.destroy();
	}
	
}