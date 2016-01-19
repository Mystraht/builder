package com.isartdigital.builder.game.sprites;

import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.utils.game.StateGraphic;
import pixi.core.math.Point;
import pixi.display.FlumpMovie;
import pixi.extras.MovieClip;
import pixi.interaction.EventTarget;

/**
 * Classe des tiles
 * @author Dorian MILLIERE
 */
class Tile extends SpriteObject implements IPoolObject
{
	public static var list:Array<Tile> = new Array<Tile>();
	
	private var tilesCount:Int = 9;
	private var tileColor:Int;

	public var isBuildable:Bool = true;
	public var isWalkable:Bool = true;
	
	public function new() 
	{
		super();
		boxType = BoxType.NONE;
		interactive = true;
		factory = new FlumpMovieAnimFactory();
	}
	
	override public function remove() :Bool
	{
		if (!super.remove()) 
		{
			destroy();
			return true;
		};
		list.splice(list.indexOf(this), 1);
		
		return true;
	}
	
	override public function init(pDefiniton:Dynamic):Void 
	{	
		var x:Float = Reflect.getProperty(pDefiniton, "x");
		var y:Float = Reflect.getProperty(pDefiniton, "y");
		var lPosition:Point = new Point(x, y);
		lPosition = IsoManager.modelToIsoView(lPosition);
		position.set(lPosition.x, lPosition.y);
		
		
		isBuildable = Reflect.getProperty(pDefiniton, "isBuildable");
		
		Tile.list.push(this);

		assetName = "Ground";
		setState(DEFAULT_STATE);
		
		setRandomColor();

		GameStage.getInstance().getTilesContainer().addChild(this);
	}
	
	
	private function setRandomColor():Void {
		var random:Int = Math.floor(Math.random() * tilesCount);
		tileColor = random;
		cast(anim, FlumpMovie).gotoAndStop(tileColor);
	}
	
	override public function destroy():Void 
	{
		parent.removeChild(this);
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
	
}