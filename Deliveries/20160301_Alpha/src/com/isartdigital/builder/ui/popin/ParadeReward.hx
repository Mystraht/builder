package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.uimodule.RewardButton;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ParadeReward extends Popin
{
	private var title:Text;
	private var offering:Text;
	private var pimientos:Text;
	private var pesos:Text;
	
	private var gainGold:Float;
	private var gainSpice:Float;
	private var gainOffering:Float;
	
	private var button:RewardButton;

	public function new(pGainOffering:Float, ?pGainGold:Float = 0, ?pGainSpice:Float = 0) 
	{
		super();
		build();
		
		button = cast(getChildByName("RewardButton"));
		
		button.click = button.tap = onButtonClick;
		
		title = cast(getChildByName("ParadeRewardTitle_txt"));
		offering = cast(getChildByName("ParadeRewardOffering_txt"));
		pimientos = cast(getChildByName("ParadeRewardPimientos_txt"));
		pesos = cast(getChildByName("ParadeRewardPesos_txt"));
		
		pesos.text = cast(pGainGold);
		pimientos.text = cast (pGainSpice);
		offering.text = cast (pGainOffering);
		
		gainGold = pGainGold;
		gainSpice = pGainSpice;
		gainOffering = pGainOffering;
	}
	
	private function onButtonClick (pEvent:EventTarget) : Void {
		//TO DO add ressources to the player
		RessourceManager.getInstance().addRessources(RessourceManager.GOLD, Std.int(gainGold));
		RessourceManager.getInstance().addRessources(RessourceManager.SPICE, Std.int(gainSpice));
		RessourceManager.getInstance().addRessources(RessourceManager.OFFERING, Std.int(gainOffering));
		UIManager.getInstance().closeCurrentPopin();
	}
	
	override public function destroy():Void 
	{
		button.destroy();
		pesos.destroy();
		offering.destroy();
		pimientos.destroy();
		title.destroy();
		super.destroy();
	}
	
	
	
}