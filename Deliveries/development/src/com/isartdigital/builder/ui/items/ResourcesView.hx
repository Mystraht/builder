package com.isartdigital.builder.ui.items;

import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class ResourcesView extends UIComponent
{
	public static inline var MIDDLE_OF_PIMIENTOS_CIRCLE_OFFSET_X:Int = 610;
	public static inline var MIDDLE_OF_OFFERING_CIRCLE_OFFSET_X:Int = 330;
	public static inline var MIDDLE_OF_PESOS_CIRCLE_OFFSET_X:Int = 60;
	public static inline var MIDDLE_OF_CURRENCY_CIRCLE_OFFSET_Y:Int = 63;

	public static var middleResourceOffsetX:Map<String, Int> = [
		RessourceManager.GOLD => MIDDLE_OF_PESOS_CIRCLE_OFFSET_X,
		RessourceManager.OFFERING => MIDDLE_OF_OFFERING_CIRCLE_OFFSET_X,
		RessourceManager.SPICE => MIDDLE_OF_PIMIENTOS_CIRCLE_OFFSET_X
	];

	private var offeringText:Text;
	private var pesosText:Text;
	private var pimientosText:Text;

	public function new() 
	{
		super();
		build();
		
		setVariableFromChild();
	}
	
	public function updateOfferingText (pValue:Int) : Void {
		offeringText.text = Std.string(pValue);
	}
	
	public function updatePesosText (pValue:Int) : Void {
		pesosText.text = Std.string(pValue);
	}
	
	public function updatePimientosText (pValue:Int) : Void {
		pimientosText.text = Std.string(pValue);
	}
	
	private function setVariableFromChild () : Void {
		offeringText = cast(getChildByName("Offering_txt"), Text);
		pesosText = cast(getChildByName("Pesos_txt"), Text);
		pimientosText = cast(getChildByName("Pimientos_txt"), Text);
	}
}