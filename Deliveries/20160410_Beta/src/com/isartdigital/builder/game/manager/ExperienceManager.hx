package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.api.ResponseDef;
import com.isartdigital.builder.api.ApiUtils;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.ui.hud.Hud;
import com.isartdigital.builder.ui.UIManager;
import com.isartdigital.services.Users;
import com.isartdigital.utils.loader.GameLoader;
import haxe.Json;

	
/**
 * ...
 * @author Thorcal
 */
class ExperienceManager extends Manager 
{
	public static var UPDATE_REQUEST_EXPERIENCE_VALUE:String = "UPDATE_REQUEST_EXPERIENCE_VALUE";
	
	private var levelsArray:Array<Int> = new Array<Int>();
	private var lvlUser:Int;
	private var progressInCurrentLvl:Int;
	
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
	
	public function getLvlUser () : Int {
		return lvlUser + 1;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
		subscribeUpdateEvent();
	}
	
	private function subscribeUpdateEvent () : Void {
		on(UPDATE_REQUEST_EXPERIENCE_VALUE, updateLevelAndXp);
	}
	
	public function start () : Void {
		setLevelsArrayFromSettings();
		updateLevelAndXp();
	}
	
	private function setLevelsArrayFromSettings() : Void {
		var settings:Dynamic = GameLoader.getContent(JsonNames.XP_SETTINGS);
		levelsArray = cast(Reflect.field(settings, "levels"));
	}
	
	public function updateLevelAndXp(?params:Dynamic):Void {
		var lXpTotalUsers:Int = Math.round(Users.infos.experience);	
		
		for (i in 0...levelsArray.length) {
			if (lXpTotalUsers < levelsArray[i]) {
				if (lvlUser < i) UIManager.getInstance().emit(UIManager.OPEN_POPIN_REQUEST_LEVELREWARD);
				lvlUser = i;
				progressInCurrentLvl = 100 - Std.int((levelsArray[i] - lXpTotalUsers) * 100 / (levelsArray[i+1] - levelsArray[i]));
				break;
			}
		}
		emitEventToUpdateHud();
	}
	
	private function emitEventToUpdateHud () : Void {
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_LVL, lvlUser);
		Hud.getInstance().emit(Hud.UPDATE_REQUEST_XP, progressInCurrentLvl);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	override public function destroy (): Void {
		instance = null;
	}

}