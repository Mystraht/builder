package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.StateGraphic;
import com.isartdigital.utils.ui.UIAsset;
import com.isartdigital.utils.ui.UIComponent;
import pixi.core.text.Text;

/**
 * ...
 * @author Flavien
 */
class SpiceCurrency extends CurrencyAsset
{

	public var spiceText:Text;
	
	public function new() 
	{
		super();
		build();
		
		setVariablesFromChild();
	}
	
	private function setVariablesFromChild () : Void {
		spiceText = cast(getChildByName("Spice_txt"), Text);
	}
	
	public function changeDisplayTextValue(number:Int) {
		spiceText.text = Std.string(number);
	}
	
	override public function destroy():Void 
	{
		spiceText.destroy();
		spiceText = null;
		super.destroy();
	}
}