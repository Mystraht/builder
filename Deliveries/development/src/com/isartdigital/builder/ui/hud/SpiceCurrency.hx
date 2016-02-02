package com.isartdigital.builder.ui.hud;
import com.isartdigital.builder.game.manager.RessourceManager;
import com.isartdigital.builder.game.manager.Ressources;
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

	public function new() 
	{
		super();
		RessourceManager.getInstance().updateSpice = changeCount;
	}
	
	override public function changeCount(pNumber:Int) {
		super.changeCount(pNumber);
		cast(getChildByName("Spice_txt"), Text).text = cast (pNumber);
	}
}