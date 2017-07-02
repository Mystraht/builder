package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ParadeButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		click = tap = onClick;
		
		//cast(getChildByName("ParadeHUDButton_txt"), Text).style.strokeThickness = 4;
		//cast(getChildByName("ParadeHUDButton_txt"), Text).style.stroke = "#6B3C17";
	}
	
	private function onClick(pEvent:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_PARADECONFIRM);
		
	}
	
}