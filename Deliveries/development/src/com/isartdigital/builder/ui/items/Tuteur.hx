package com.isartdigital.builder.ui.items;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;

/**
 * ...
 * @author Flavien
 */
class Tuteur extends StateGraphic
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		
		super();
		
		setState(DEFAULT_STATE);
	}
	
	public function gotoLabel(label:String) : Void {
		getFlumpMovie().gotoAndStop(getFlumpMovie().getLabelFrame(label));
	}	
}