package com.isartdigital.builder.ui.buttons;

import com.isartdigital.builder.ui.popin.Shop;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class OfferingButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		click = tap = onClick;
	}
	
	private function onClick (pEvent:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_SHOP_RESOURCE);
	}
}