package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.game.manager.RessourceManager;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class OfferingsCurrency extends CurrencyAsset
{
	
	public var offeringText:Text;
	
	public function new() 
	{
		super();
		build();

		setVariablesFromChild();
	}
	
	private function setVariablesFromChild() : Void {
		offeringText = cast(getChildByName("Offerings_txt"), Text);
	}
	
	public function changeDisplayTextValue(number:Int) {
		offeringText.text = Std.string(number);		
	}
	
	override public function destroy():Void 
	{
		offeringText.destroy();
		offeringText = null;
		super.destroy();
	}
}