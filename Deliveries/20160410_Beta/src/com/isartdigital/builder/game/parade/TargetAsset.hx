package com.isartdigital.builder.game.parade;
import com.isartdigital.utils.game.GameStage;
import pixi.core.graphics.Graphics;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class TargetAsset extends Graphics
{
	
	private static inline var colorBorder:Int = 0xa0ffee;
	private static inline var colorAsset:Int = 0x001042;

	public function new(position:Point) 
	{
		super();
		
		beginFill(colorBorder);
		drawCircle(0, 0, 9);

		
		beginFill(colorAsset);
		drawCircle(0, 0, 7);

		
		this.position = position;
		
		
		GameStage.getInstance().getTilesContainer().addChild(this);

	}
	
}