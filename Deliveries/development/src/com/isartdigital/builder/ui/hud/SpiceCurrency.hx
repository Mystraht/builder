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
class SpiceCurrency extends UIComponent
{

	public function new() 
	{
		super();
		build();
		//RessourceManager.getInstance().updateSpice = changeCount;
	}
	
	public function changeCount(pNumber) {
		trace ("Number :" + pNumber);
		cast(getChildByName("Spice_txt"), Text).text = cast (pNumber);
	}
}