package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.game.ftue.FtueEvents;
import com.isartdigital.builder.game.ftue.Ftue;
import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.utils.ui.Popin;
import motion.Actuate;
import motion.easing.Cubic;
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

	public function new(offeringGain:Float, pesosGain:Float, pimientosGain:Float) 
	{
		super();
		build();
		
		button = cast(getChildByName("RewardButton"));
		
		button.click = button.tap = onButtonClick;
		
		title = cast(getChildByName("ParadeRewardTitle_txt"));
		offering = cast(getChildByName("ParadeRewardOffering_txt"));
		pimientos = cast(getChildByName("ParadeRewardPimientos_txt"));
		pesos = cast(getChildByName("ParadeRewardPesos_txt"));
		
		pesos.text = Std.string(pesosGain);
		pimientos.text = Std.string(pimientosGain);
		offering.text = Std.string(offeringGain);
		
		gainGold = pesosGain;
		gainSpice = pimientosGain;
		gainOffering = offeringGain;
	}
	
	override function juicyOpen():Void 
	{
		alpha = 0;
		Actuate.tween(this, 0.5, { alpha : 1} ).ease(Cubic.easeOut);
	}
	
	private function onButtonClick (pEvent:EventTarget) : Void {
		Ftue.event.emit(FtueEvents.PARADE_COLLECT);
		Ftue.event.emit(FtueEvents.PINATA_RECOLT); // dirty hack before gold ..^^
		RessourceManager.getInstance().addRessources(RessourceManager.GOLD, Std.int(gainGold));
		RessourceManager.getInstance().addRessources(RessourceManager.SPICE, Std.int(gainSpice));
		RessourceManager.getInstance().addRessources(RessourceManager.OFFERING, Std.int(gainOffering));

		UIManager.getInstance().emit(UIManager.CLOSE_POPIN_REQUEST);
		GameManager.getInstance().emit(GameManager.END_PARADE_REQUEST);
	}
	
	override public function destroy():Void 
	{
		super.destroy();
	}
	
}