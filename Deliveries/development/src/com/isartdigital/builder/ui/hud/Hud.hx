package com.isartdigital.builder.ui.hud;

import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Utils;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.ui.Screen;
import com.isartdigital.utils.ui.UIPosition;
import haxe.Json;
import pixi.core.display.Container;
import pixi.core.sprites.Sprite;
import pixi.core.text.Text;
import pixi.core.textures.Texture;
import pixi.interaction.EventTarget;

/**
 * Classe en charge de gérer les informations du Hud
 * @author Mathieu ANTHOINE
 */
class Hud extends Screen 
{
	
	/**
	 * instance unique de la classe Hud
	 */
	private static var instance: Hud;
	
	private var hudRessources:Container;
	
	private var goldText:Text;
	private var spiceText:Text;
	private var offeringText:Text;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Hud {
		if (instance == null) instance = new Hud();
		return instance;
	}	
	
	public function new() 
	{
		super();
		_modal = false;
		build();
		
		hudRessources = new Container();	

		
		goldText = new Text("Gold : ");
		goldText.position.set(50, 50);
		
		spiceText = new Text("Spice : ");
		spiceText.position.set(50, 75);
		
		offeringText = new Text("Offering : ");
		offeringText.position.set(50, 100);
		
		hudRessources.addChild(goldText);
		hudRessources.addChild(spiceText);		
		hudRessources.addChild(offeringText);		
		
		addChild(hudRessources);
		hudRessources.position.set(500, 500);
		UIPosition.setPosition(hudRessources, UIPosition.TOP);
	}
	
	/**
	 * repositionne les éléments du Hud
	 * @param	pEvent
	 */
	override private function onResize (pEvent:EventTarget = null): Void {
		super.onResize();
	}
	
	public function doAction () : Void
	{
		if (BaseBuildingHUD.getInstance().hadToMove) return;
	}
	
	public function refreshHUD () : Void {
		Api.resources.get(cb_resourceAll);
	}
	
	private function cb_resourceAll (pData:String) : Void
	{
		var lData:DataDef = cast(Json.parse(pData));
		
		if (lData.error)
		{
			Utils.errorHandler(lData.errorCode, lData.errorMessage);
			return;
		}
		
		//trace("hudressource " + hudRessources.parent.parent.name);
		
		goldText.text = "Gold : " + lData.data.gold;
		spiceText.text = "Spice : " + lData.data.spice;
		offeringText.text = "Offering : " + lData.data.offering;
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
		super.destroy();
	}

}