package com.isartdigital.builder.ui.items;

import com.isartdigital.services.Users;
import com.isartdigital.utils.ui.UIComponent;
import haxe.Timer;

/**
 * ...
 * @author Flavien
 */
class MissionPanelItem extends UIComponent
{
	private var missionItemList:Array<MissionItem> = new Array<MissionItem> ();
	
	
	public function new() 
	{
		super();
		build();
		
		//Timer.delay(testForShow, 500);
	}
	
	private function testForShow () : Void {
		if (!Users.infos.ftue_complet) {
			parent.removeChild(this);
		}
	}
	
}