package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.def.metadatas.RessourceItemDef;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.ui.buttons.CancelButton;
import com.isartdigital.builder.ui.buttons.RewardButton;
import com.isartdigital.services.Wallet;
import com.isartdigital.utils.sounds.SoundManager;
import com.isartdigital.utils.sounds.SoundNames;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;
import pixi.interaction.EventTarget;

/**
 * ...
 * @author Flavien
 */
class ConfirmCash extends Popin
{

	private var rewardButton:RewardButton;
	private var cancelButton:CancelButton;
	private var gainText:Text;
	
	private var price:Float;
	private var gain:Float;
	private var packageItemName:String;
	
	
	public function new(params:Array<Dynamic>) 
	{
		super();
		build();
		trace("is ok baby");
		
		rewardButton = cast (getChildByName("RewardButton"), RewardButton);
		cancelButton = cast (getChildByName("CancelButton"), CancelButton);
		gainText = cast(getChildByName("RewardPimientos_txt"), Text);
		
		rewardButton.click = rewardButton.tap = onRewardClick;
		cancelButton.click = cancelButton.tap = onCancelClick;
		
		var definition:RessourceItemDef = cast(params[0]);
		
		price = definition.price;
		gain = definition.product;
		
		gainText.text = Std.string(gain);
		
		packageItemName = cast(params[1]);
	}
	
	private function onRewardClick (event:EventTarget) : Void {
		Wallet.buy(Main.getInstance().getMail(), price, function (params) {
			trace("============================");
			trace("Money Left : " + Reflect.field(params, "money"));
			trace("============================");
		});
		Api.user.buy(packageItemName);
		SoundManager.playSFX(SoundNames.BUY);
		RessourceManager.getInstance().addRessources(RessourceManager.SPICE, gain);
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_SHOP_RESOURCE);
	}
	
	private function onCancelClick (event:EventTarget) : Void {
		UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_SHOP_RESOURCE);
	}
	
}