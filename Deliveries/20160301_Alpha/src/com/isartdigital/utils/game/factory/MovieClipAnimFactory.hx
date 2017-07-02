package com.isartdigital.utils.game.factory;
import haxe.Json;
import pixi.core.display.Container;
import pixi.core.textures.Texture;
import pixi.extras.MovieClip;

/**
 * ...
 * @author Mathieu Anthoine
 */
class MovieClipAnimFactory extends AnimFactory
{

	/**
	 * longueur de la numérotation des textures
	 */
	public static var textureDigits (default, set) :UInt = 4;
	
	private static function set_textureDigits (pDigits:UInt) : UInt {
		digits = "";
		for (i in 0...pDigits) digits += "0";
		return textureDigits = pDigits;	
	}
	
	/**
	 * définition des textures (nombre d'images)
	 */
	private static var texturesDefinition:Map<String,Int>;
	
	/**
	 * cache des textures de tous les StateGraphic
	 */
	private static var texturesCache:Map<String,Array<Texture>>;
	
	/**
	 * nombre de zéro a ajouter pour construire un nom de frame
	 */
	private static var digits:String;	
	
	/**
	 * Analyse et crée les définitions de textures
	 * @param	pJson objet contenant la description des assets
	 */
	static public function addTextures (pJson:Json): Void {
		
		var lFrames:Dynamic = Reflect.field(pJson, "frames");
		
		if (texturesDefinition == null) texturesDefinition = new Map<String,Int>();
		if (digits == null) textureDigits = textureDigits;
		
		var lID:String;
		var lNum:Int;
		
		for (lID in Reflect.fields(lFrames)) {
			
			lID = lID.split(".")[0];
			lNum = Std.parseInt(lID.substr(-1*textureDigits));
			if (lNum != null) lID = lID.substr(0, lID.length - textureDigits);
			
			if (texturesDefinition[lID] == null) texturesDefinition[lID] = lNum == null ? 1 : lNum;
			else if (lNum > texturesDefinition[lID]) texturesDefinition[lID] = lNum;
			
		}
		
		if (texturesCache == null) texturesCache = new Map<String,Array<Texture>>();
	}
	
	/**
	 * Vide le cache de textures correspondant à la description passée en paramètres
	 * @param	pJson objet contenant la description des assets
	 */
	static public function clearTextures (pJson:Json): Void {
		
		var lFrames:Dynamic = Reflect.field(pJson, "frames");
		
		if (texturesDefinition == null) return;
		
		var lID:String;
		var lNum:Int;
		
		for (lID in Reflect.fields(lFrames)) {
			
			lID = lID.split(".")[0];
			lNum = Std.parseInt(lID.substr(-1*textureDigits));
			if (lNum != null) lID = lID.substr(0, lID.length - textureDigits);
			
			texturesDefinition[lID] = null;
			texturesCache[lID] = null;
		}
	}	
	
	
	public function new() 
	{
		super();
		
	}
	
	override public function create (pID:String):Container {
		anim = new MovieClip(getTextures(pID));
		return anim;
	}
	
	override public function update (pID:String):Void {
		cast(anim,MovieClip).textures = getTextures(pID);
	}
	
	override public function setFrame (?pAutoPlay:Bool=true, ?pStart:UInt = 0): Void {
		var lAnim:MovieClip = cast(anim, MovieClip);
		
		lAnim.gotoAndStop(pStart);
		if (pAutoPlay) lAnim.play();
	}
	
	/**
	 * Cherche dans le cache général de textures le tableau de textures correspondant au state et le retourne.
	 * Si le tableau de texture n'éxiste pas, il le crée et le stocke dans le cache
	 * @param	pID ID complet de l'anim
	 * @return	le tableau de texture correspondant au state de l'instance
	 */
	private function getTextures(pID:String):Array<Texture> {
		
		if (texturesCache[pID] == null) {
			var lFrames:UInt = texturesDefinition[pID];
			if (lFrames == 1) texturesCache[pID] =[Texture.fromFrame(pID+".png")];
			else {
				texturesCache[pID] = new Array<Texture>();
				for (i in 1...lFrames+1) texturesCache[pID].push(Texture.fromFrame(pID+(digits + i).substr(-1*textureDigits) + ".png"));
			}
			
		}
		
		return texturesCache[pID];
	}
	
}