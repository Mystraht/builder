package com.isartdigital.utils.ui;

import com.isartdigital.builder.ui.buttons.MoveButton;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.ui.UIPosition;
import flump.json.FlumpJSON;
import haxe.Json;
import pixi.core.display.Container;
import pixi.core.math.Point;
import pixi.core.text.Text;
import pixi.display.FlumpSprite;

/**
 * ...
 * @author Mathieu Anthoine
 */
class UIBuilder
{
	/**
	 * fichier de description des assets d'UI au format Flump
	 */
	private static var description:Map<String,String>;
	
	/**
	 * suffixe des FlumpSprite "texte"
	 */
	private static inline var TXT_SUFFIX:String = "_txt";
	
	/**
	 * suffixe des FlumpButton
	 */
	private static inline var BTN_SUFFIX:String = "Button";
	
	/**
	 * suffixe des Currencys
	 */
	private static inline var CURRENCY_SUFFIX:String = "_currency";	
	
	/**
	 * suffixe des buildingHUD
	 */
	private static inline var BUILDING_HUD_SUFFIX:String = "_bHud";
	
	/**
	 * suffixe des Items du Shop
	 */
	private static inline var ITEM_SHOP_SUFFIX:String = "_item";
	
	/**
	 * package des classes Button du projet
	 */
	private static var btnPackage:String;
	private static var hudPackage:String;
	private static var itemPackage:String;
	
	private static var textStyle:Map<String, UITextStyle> = new Map<String, UITextStyle>();
	
	/**
	 * wrapper vers UIPosition
	 */
	private static var uiPos:Map<String,String> =
		[
			"L" => UIPosition.LEFT,
			"R" => UIPosition.RIGHT,
			"T" => UIPosition.TOP,
			"B" => UIPosition.BOTTOM,
			"TL" => UIPosition.TOP_LEFT,
			"TR" => UIPosition.TOP_RIGHT,
			"BL" => UIPosition.BOTTOM_LEFT,
			"BR" => UIPosition.BOTTOM_RIGHT,
			"FW" => UIPosition.FIT_WIDTH,
			"FH" => UIPosition.FIT_HEIGHT,
			"FS" => UIPosition.FIT_SCREEN
		];
	
	private function new() {}	
	
	public static function addTextStyle(pData:String) : Void
	{
		for (pName in Reflect.fields(pData))
		{
			textStyle.set(pName, Reflect.field(pData, pName));
		}
	}

	/**
	 * Initialise le parseur
	 * @param	pFile nom du fichier qui contient les données de mise en forme de l'UI
	 * @param	pPackage nom du package des boutons
	 */
	public static function addDescriptions(pFile:String, pPackage:String):Void {
		if (description == null) description = new Map < String, String>();
		description.set(pFile, pPackage);

	}
	
	public static function setPackages(pPackage:String, pPackageCurrency:String, pPackgageItem:String) : Void {
		btnPackage = pPackage;
		hudPackage = pPackageCurrency;
		itemPackage = pPackgageItem;
	}
	
	/**
	 * Crée les éléments composant un Screen
	 * @param	pId assetName de l'écran
	 */
	public static function build (pId:String) : Array<UIPositionable> {
		var lData:FlumpJSON;
		var lObj:Container;
		var lItem;
		var lUIPos:Array<UIPositionable>=[];
		
		for (lDescription in description.keys()) {
		
			lData= cast GameLoader.getContent(lDescription);
			
			for (lMovie in lData.movies) {
				if (lMovie.id == pId) {
					for (lItem in lMovie.layers) {
						//trace("Create Class : " + lItem.keyframes[0].ref);
						if (lItem.name.indexOf(TXT_SUFFIX) != -1 && lItem.name.indexOf(TXT_SUFFIX)==lItem.name.length-TXT_SUFFIX.length) {
							lObj = getTextFromJson(lItem.name);
						} else if (lItem.name.indexOf(ITEM_SHOP_SUFFIX) != -1 && lItem.name.indexOf(ITEM_SHOP_SUFFIX) == lItem.name.length - ITEM_SHOP_SUFFIX.length) {
							lObj = Type.createInstance(Type.resolveClass(itemPackage +"."+lItem.keyframes[0].ref), []);
						} else if (lItem.name.indexOf(BTN_SUFFIX) != -1 && lItem.name.indexOf(BTN_SUFFIX)==lItem.name.length-BTN_SUFFIX.length) {	
							lObj = Type.createInstance(Type.resolveClass(btnPackage+"." + lItem.keyframes[0].ref), []);
						} else if (lItem.name.indexOf(CURRENCY_SUFFIX) != -1 && lItem.name.indexOf(CURRENCY_SUFFIX) == lItem.name.length - CURRENCY_SUFFIX.length) {
							lObj = Type.createInstance(Type.resolveClass(hudPackage +"."+lItem.keyframes[0].ref), []);
						} else if (lItem.name.indexOf(BUILDING_HUD_SUFFIX) != -1 && lItem.name.indexOf(BUILDING_HUD_SUFFIX) == lItem.name.length - BUILDING_HUD_SUFFIX.length) {
							lObj = Type.createInstance(Type.resolveClass(hudPackage +"."+lItem.keyframes[0].ref), []);
						} else {
							lObj = new UIAsset(lItem.keyframes[0].ref);
						}
						
						lObj.name = lItem.keyframes[0].ref;
						if (Reflect.hasField(lItem.keyframes[0],"loc")) lObj.position.set(lItem.keyframes[0].loc.x, lItem.keyframes[0].loc.y);
						
						if (Reflect.hasField(lItem.keyframes[0],"scale")) lObj.scale.set(lItem.keyframes[0].scale.x, lItem.keyframes[0].scale.y);
						
						if (Reflect.hasField(lItem.keyframes[0],"skew")) 
							lObj.skew.set(lItem.keyframes[0].skew.x,lItem.keyframes[0].skew.y);
						lUIPos.push(getUIPositionable(lObj,uiPos.get(lItem.name.split("_")[0])));
					}
				}
			}
		}


		return lUIPos;
		
	}
	
	private static function getTextFromJson(pName:String) : Text
	{

		var uiStyle:UITextStyle = getTextStyle(pName);
		
		var localizedText:String = Localization.getText(uiStyle.text);
		
		var bold:String = uiStyle.bold ? "bold " : "";
		var italic:String = uiStyle.italic ? "italic " : "";
		
		var style:TextStyle = { };
		style.align = uiStyle.align;
		style.font = bold + italic + uiStyle.size + "px " + uiStyle.font;
		style.fill = "#" + StringTools.hex(uiStyle.color);
		style.wordWrap = true;
		style.wordWrapWidth = uiStyle.width;
		
		return new Text(localizedText, style);
	}
	
	public static function getTextStyle(pId:String):UITextStyle {
		var lData:Json;
		
		for (lDescription in description.keys()) {
			//trace("text/texts_" + lDescription + "/" + pId);
			lData = cast GameLoader.getContent("text/texts_"+lDescription);
			if (Reflect.hasField(lData, pId)) return Reflect.field(lData, pId);
		}
		throw "getTextStyle text definition does not found in any texts ressource";
		return null;
	}
	
	/**
	 * retourne un UIPositionable correctement construit
	 * @param	pObj Item d'interface
	 * @param	pPosition ancrage "UIPosition"
	 * @return un UIPositionable
	 */
	private static function getUIPositionable (pObj:Container,pPosition:String):UIPositionable {
		
		var lOffset:Point = new Point (0, 0);
		
		if (
			pPosition != UIPosition.BOTTOM &&
			pPosition != UIPosition.BOTTOM_LEFT &&
			pPosition != UIPosition.BOTTOM_RIGHT &&
			pPosition != UIPosition.FIT_HEIGHT &&
			pPosition != UIPosition.FIT_SCREEN &&
			pPosition != UIPosition.FIT_WIDTH &&
			pPosition != UIPosition.LEFT &&
			pPosition != UIPosition.RIGHT &&
			pPosition != UIPosition.TOP &&
			pPosition != UIPosition.TOP_LEFT &&
			pPosition != UIPosition.TOP_RIGHT
		) pPosition = "";
		else {
			if (pPosition == UIPosition.TOP || pPosition == UIPosition.TOP_LEFT || pPosition == UIPosition.TOP_RIGHT ||
				pPosition == UIPosition.BOTTOM || pPosition == UIPosition.BOTTOM_LEFT || pPosition == UIPosition.BOTTOM_RIGHT) lOffset.y = pObj.y;
			if (pPosition == UIPosition.LEFT || pPosition == UIPosition.TOP_LEFT || pPosition == UIPosition.BOTTOM_LEFT ||
				pPosition == UIPosition.RIGHT || pPosition == UIPosition.TOP_RIGHT || pPosition == UIPosition.BOTTOM_RIGHT) lOffset.x = pObj.x;
		}
		
		return {item:pObj, align:pPosition, offsetX:lOffset.x, offsetY:lOffset.y, update:true};
	}
}

