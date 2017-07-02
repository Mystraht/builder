package com.isartdigital.builder.ui.items;

import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;

/**
 * ...
 * @author Flavien
 */
class RessourceInShop extends ItemAssetInShop
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
	}
	
}