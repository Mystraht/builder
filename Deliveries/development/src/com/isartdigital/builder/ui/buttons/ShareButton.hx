package com.isartdigital.builder.ui.buttons;

import com.isartdigital.utils.facebook.Facebook;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.ui.Button;

/**
 * ...
 * @author Flavien
 */
class ShareButton extends Button
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		click = tap = shareContent;
	}

	private function shareContent(event:Dynamic):Void {
		Facebook.ui({
			method: 'share',
			href: 'https://fbgame.isartdigital.com/2017_builder/builder2',
			quote: "Mon batiment viens de monter d'un niveau dans Fiesta Ultima !!"
		}, function(response){});
	}
	
}