package com.isartdigital.builder.ui.hud;
import Std;
import Std;
import motion.Actuate;
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
class GoldCurrency extends CurrencyAsset
{
	public var goldText:Text;


	public function new() 
	{
		super();
		build();

		setVariablesFromChild();
	}
	
	private function setVariablesFromChild () : Void {
		goldText = cast(getChildByName("Gold_txt"), Text);
	}
	
	public function changeDisplayTextValue(number:Int) {
		goldText.text = Std.string(number);
	}
	
	override public function destroy():Void 
	{
		goldText.destroy();
		goldText = null;
		super.destroy();
	}
}