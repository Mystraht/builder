package com.isartdigital.builder.ui.items;

import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class TimerParade extends UIComponent
{

	private var timerText:Text;
	
	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
	}
	
	public function updateTimerText (pValue:Int) : Void {
		var lString:String = Std.string(pValue);
		timerText.text = lString.substr(0, 5);
	}
	
	private function setVariableFromChild () : Void {
		timerText = cast(getChildByName("timerParade_txt"), Text);
	}
}