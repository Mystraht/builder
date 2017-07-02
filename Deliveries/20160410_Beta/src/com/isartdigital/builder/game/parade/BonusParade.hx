package com.isartdigital.builder.game.parade;
import com.isartdigital.builder.game.def.ResourceDef;
import com.isartdigital.builder.game.manager.Settings;
import com.isartdigital.builder.game.sprites.SpriteObject;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import haxe.Resource;
import motion.Actuate;
import motion.easing.Expo;
import motion.easing.Linear;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class BonusParade extends SpriteObject
{
	public static var list:Array<BonusParade> = new Array<BonusParade> ();

	public var positionInModel:Point = new Point();
	
	private var bonusGainValue:Int;
	
	public static inline var MIN_TIME_TO_APPEAR:Float = 0.3;
	public static inline var TIME_TO_DISAPPEAR:Float = 1;
	
	public function new(pSpawnValue:Float, positionInModel:Point, ?bonusGainValue = null) 
	{
		super();		
		factory = new FlumpMovieAnimFactory();
		assetName = setAssetName(pSpawnValue); 
		
		setState(DEFAULT_STATE);
		boxType = BoxType.NONE;
		
		this.positionInModel = positionInModel;
		position = IsoManager.modelToIsoView(positionInModel);
		
		this.bonusGainValue = bonusGainValue;
		
		list.push(this);
		
		alpha = 0;
		Actuate.tween(this, Math.random() + MIN_TIME_TO_APPEAR, { alpha : 1 } ).ease(Expo.easeIn);
	}
	
	private function setAssetName (pValue) : String {
		if (pValue < Settings.parade.spawn_rate.offerings) return BonusType.BONUS_OFFERING;
		else if (pValue < Settings.parade.spawn_rate.offerings + Settings.parade.spawn_rate.pesos)
			return BonusType.BONUS_PESOS;
		else if (pValue < Settings.parade.spawn_rate.offerings
			+ Settings.parade.spawn_rate.pesos
			+ Settings.parade.spawn_rate.pimientos) return BonusType.BONUS_PIMIENTOS;
		else {
			throw 'BonusParade Wrong SpawnValue';
			return null;
		}
	}
	
	public function getBonusType () : String {
		return assetName;
	}
	
	public function getBonusValue () : Float {
		if (bonusGainValue != null) return bonusGainValue;
		
		if (BonusType.BONUS_OFFERING == assetName) return getBonusQualityValue(Settings.parade.base_value.offerings);
		if (BonusType.BONUS_PESOS == assetName) return getBonusQualityValue(Settings.parade.base_value.pesos);
		if (BonusType.BONUS_PIMIENTOS == assetName) return getBonusQualityValue(Settings.parade.base_value.pimientos);
		
		return 0;
	}
	
	private function getBonusQualityValue (baseValue:Float) : Float {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 10));
		return baseValue * Settings.parade.bonus_quality.get(Std.string(mainBuildingLvl));
	}
	
	override public function destroy():Void 
	{
		parent.removeChild(this);
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
	
}