package com.isartdigital.builder.ui.items;

import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class RewardBuilding extends UIComponent
{
	private var buildingAsset:BuildingInShop;
	private var titleTxt:Text;
	
	public function new() 
	{
		super();
		build();
		
		titleTxt = cast(getChildByName("RewardBuildingTitle_txt"), Text);
		buildingAsset = cast(getChildByName("BuildingInShop"), BuildingInShop);
		
	}
	
}