package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.game.manager.ExperienceManager;
import com.isartdigital.utils.ui.UIComponent;

/**
 * ...
 * @author Thorcal
 */
class Experience extends UIComponent
{

	public function new() 
	{
		super();
		build();
		ExperienceManager.getInstance().updateExperience = changeCount;
	}
	
	public function changeCount(pNumber:Int) {
		trace ("Number :" + pNumber);
		cast(getChildByName("Experience_txt"), Text).text = cast (pNumber);
	}
}