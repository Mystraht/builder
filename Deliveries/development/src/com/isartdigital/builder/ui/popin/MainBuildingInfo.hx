package com.isartdigital.builder.ui.popin;

import com.isartdigital.builder.ui.items.RewardBuilding;
import com.isartdigital.utils.ui.Popin;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class MainBuildingInfo extends Popin
{
	private var rewardBuilding:RewardBuilding;
	private var mainBuildingInfoDescription:Text;
	private var mainBuildingInfoTitle:Text;
	
	
	public function new() 
	{
		super();
		build();
		
		rewardBuilding = cast(getChildByName("RewardBuilding"));
		mainBuildingInfoDescription = cast(getChildByName("MainBuildingInfoDescription"));
		mainBuildingInfoTitle = cast(getChildByName("mainBuildingInfoTitle"));
	}
	
	override public function destroy():Void 
	{
		rewardBuilding.destroy();
		mainBuildingInfoDescription.destroy();
		mainBuildingInfoTitle.destroy();
		super.destroy();
	}
	
}