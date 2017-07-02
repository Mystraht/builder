package com.isartdigital.builder.game.parade;

import Math;
import Math;
import motion.easing.Bounce;
import motion.easing.Cubic;
import haxe.Timer;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.builder.game.utils.Metadatas;
import com.isartdigital.builder.game.sprites.SpriteObject;
import com.isartdigital.services.Users;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.MathUtils;
import motion.Actuate;
import motion.easing.Expo;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class BonusParade extends SpriteObject implements IZSortable
{
	public static var list:Array<BonusParade> = new Array<BonusParade> ();

	public var type:String = ModelElementNames.BONUS_PARADE;
	public var positionInModel:Point = new Point();

	public static inline var MIN_TIME_TO_APPEAR:Float = 0.3;
	public static inline var TIME_TO_DISAPPEAR:Float = 1;

	private var bonusGainValue:Int;
	private var animationDone:Bool = false;
	private static inline var BONUS_ANIMATION_TRANSITION:Float = 0.5;
	private static inline var BONUS_ANIMATION_END_VALUE:Float = 0.9;
	private static inline var BONUS_VERTICAL_OFFSET:Float = 30;

	public function new(pSpawnValue:Float, positionInModel:Point, ?bonusGainValue = null) 
	{
		super();		
		factory = new FlumpMovieAnimFactory();
		assetName = setAssetName(pSpawnValue); 
		

		modelWidth = 1;
		modelHeight = 1;

		setState(DEFAULT_STATE);
		boxType = BoxType.NONE;
		
		this.positionInModel = positionInModel;
		position = IsoManager.modelToIsoView(positionInModel);
		position.y -= BONUS_VERTICAL_OFFSET;
		
		this.bonusGainValue = bonusGainValue;
		
		list.push(this);
		
		alpha = 0;
		Actuate.tween(this, Math.random() + MIN_TIME_TO_APPEAR, { alpha : 1 } ).ease(Expo.easeIn);
		Timer.delay(floatHoverGround, Std.int(Math.random() * (BONUS_ANIMATION_TRANSITION * 1000)));
	}
	
	private function setAssetName (pValue) : String {
		if (pValue < Metadatas.parade.spawn_rate.offerings) return BonusType.BONUS_OFFERING;
		else if (pValue < Metadatas.parade.spawn_rate.offerings + Metadatas.parade.spawn_rate.pesos)
			return BonusType.BONUS_PESOS;
		else if (pValue < Metadatas.parade.spawn_rate.offerings
			+ Metadatas.parade.spawn_rate.pesos
			+ Metadatas.parade.spawn_rate.pimientos) return BonusType.BONUS_PIMIENTOS;
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
		
		if (BonusType.BONUS_OFFERING == assetName) return getBonusQualityValue(Metadatas.parade.base_value.offerings);
		if (BonusType.BONUS_PESOS == assetName) return getBonusQualityValue(Metadatas.parade.base_value.pesos);
		if (BonusType.BONUS_PIMIENTOS == assetName) return getBonusQualityValue(Metadatas.parade.base_value.pimientos);
		
		return 0;
	}
	
	private function getBonusQualityValue (baseValue:Float) : Float {
		var mainBuildingLvl:Int = Users.getMainBuildingLevel();
		mainBuildingLvl = Std.int(MathUtils.roundToStep(mainBuildingLvl, 10));
		return baseValue * Metadatas.parade.bonus_quality.get(Std.string(mainBuildingLvl));
	}

	private function floatHoverGround():Void {
		if (scale != null) {
			var newValue:Float = animationDone ? BONUS_ANIMATION_END_VALUE : 1;
			Actuate.tween(scale, BONUS_ANIMATION_TRANSITION, { x: newValue, y: newValue } ).ease(Cubic.easeInOut).onComplete(floatHoverGround);
			animationDone = !animationDone;
		}
	}
	
	override public function destroy():Void {
		Actuate.stop(position, ["y"], false, false);
		parent.removeChild(this);
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
	
}