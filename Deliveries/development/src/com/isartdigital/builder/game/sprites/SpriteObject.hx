package com.isartdigital.builder.game.sprites;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.utils.game.StateGraphic;


/**
 * ...
 * @author Flavien
 */
class SpriteObject extends StateGraphic implements IPoolObject
{
	public var modelWidth:Int;
	public var modelHeight:Int;
	
	public function new() 
	{
		super();
	}
	
	public function remove():Bool
	{
		if (!PoolObject.addPool(this)) return false;
		cleanAnim();
		return true;
	}

	public static function getSpriteObjectByName(name:String):Dynamic {
		switch(name) {
			case ModelElementNames.BUILDING:
				return Building;
			case ModelElementNames.TILE:
				return Tile;
			case ModelElementNames.BACKGROUND:
				return Background;
		}

		throw 'SpriteObject name doesnt not exist';
	}

	public function init(pDefinition:Dynamic):Void {}
}