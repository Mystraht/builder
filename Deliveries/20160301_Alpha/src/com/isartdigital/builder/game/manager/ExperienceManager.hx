package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.DataDef;
import com.isartdigital.builder.api.Utils;
import haxe.Json;

	
/**
 * ...
 * @author Thorcal
 */
class ExperienceManager extends Manager 
{
	public var levelsArray:Array<Int> = new Array<Int>();
	public var lvlUser:Int;
	public var XPToNextLvl:Int;
	/**
	 * instance unique de la classe ExperienceManager
	 */
	private static var instance: ExperienceManager;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): ExperienceManager {
		if (instance == null) instance = new ExperienceManager();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
		lvlUser = 0;
	}
	
	
	public function setDataXP(pData:Array<String>) : Void {
		levelsArray = Reflect.field(pData, "levels");
	}
	
	public function getLvl(pExp:Float):Void {
		
		var prettyExp:Int = Math.round(pExp);
		
		for (number in levelsArray) {
			if (prettyExp > cast(number)) {
				lvlUser++;
			}else {
				XPToNextLvl =  number - prettyExp;
				return;
			}
		}
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
	}

}