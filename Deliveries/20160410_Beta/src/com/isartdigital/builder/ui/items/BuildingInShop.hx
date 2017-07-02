package com.isartdigital.builder.ui.items;

import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.Button;
import com.isartdigital.utils.ui.UIComponent;
import pixi.display.FlumpMovie;

/**
 * ...
 * @author Flavien
 */
class BuildingInShop extends ItemAssetInShop
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
	
	
}