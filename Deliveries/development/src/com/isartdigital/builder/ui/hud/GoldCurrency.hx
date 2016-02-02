package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.game.manager.RessourceManager;

/**
 * ...
 * @author Flavien
 */
class GoldCurrency extends CurrencyAsset
{

	public function new() 
	{
		super();
		RessourceManager.getInstance().updateGold = changeCount;
	}
	
	override public function changeCount(pNumber:Int, pName:String) 
	{
		super.changeCount(pNumber, "Gold_txt");
	}
}