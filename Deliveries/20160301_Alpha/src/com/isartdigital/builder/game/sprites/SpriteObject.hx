package com.isartdigital.builder.game.sprites;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.utils.game.StateGraphic;

/**
 * ...
 * @author Flavien
 */
class SpriteObject extends StateGraphic implements IPoolObject
{
	public var colMin:UInt;
	public var colMax:UInt;
	public var rowMin:UInt;
	public var rowMax:UInt;
	
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

	public function init(pDefinition:Dynamic):Void {}
}