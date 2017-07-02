package com.isartdigital.builder.ui.items;

import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.display.DisplayObject;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class MissionItem extends UIComponent
{
	private static var missionNames:Array<String> = new Array<String> (); 
	
	private var missionText:Text;

	public function new() 
	{	
		missionNames.push("Piété");
		missionNames.push("Curieux");
		missionNames.push("Barbare");
		missionNames.push("Haussman");
		missionNames.push("Attila");
		missionNames.push("Débauche");
		
		super();
		build();	
		
		missionText = cast(getChildByName("Mission_txt"), Text);
		
		missionText.text = missionNames[Math.floor(Math.random() * missionNames.length)];
	}	
}