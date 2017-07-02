package com.isartdigital.builder.ui.items;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.StateGraphic;
import pixi.display.FlumpMovie;

/**
 * ...
 * @author Flavien
 */
class ItemAssetInShop extends StateGraphic
{
	public function new() 
	{
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
	
	override public function destroy():Void 
	{
		interactive = false;
		
		super.destroy();
	}
	
}