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
class BuildingInShop extends StateGraphic
{

	public function new() 
	{
		factory = new FlumpMovieAnimFactory();
		super();
		
		boxType = BoxType.SELF;
		
		start();
	}
	
	override private function setModeNormal ():Void {
		setState(DEFAULT_STATE);
		super.setModeNormal();
	}
	
	public function setAsset (pAssetName:String) : Void {
		
		var frame:UInt = cast(anim, FlumpMovie).getLabelFrame(pAssetName);
		cast(anim, FlumpMovie).gotoAndStop(frame);
	}
	
}