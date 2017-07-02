package com.isartdigital.builder.game.sprites;

import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.builder.game.def.TileModelDef;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.BoxType;
import com.isartdigital.utils.game.factory.FlumpMovieAnimFactory;
import com.isartdigital.utils.game.Filter;
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
class Tile extends SpriteObject
{
	public static var list:Array<Tile> = new Array<Tile>();

	public var isIlluminated:Bool = false;
	public var isBuildable:Bool = true;
	
	public function new()
	{
		super();
		boxType = BoxType.NONE;
		factory = new FlumpMovieAnimFactory();
	}
	
	override public function remove() :Bool
	{
		GameStage.getInstance().getTilesContainer().removeChild(this);
		if (!super.remove()) {
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
		position.set(Math.floor(lPosition.x), Math.floor(lPosition.y));
		
		isBuildable = Reflect.getProperty(pDefiniton, "isBuildable");
		
		Tile.list.push(this);

		changeAsset("Ground");
		isIlluminated = pDefiniton.isIlluminated;
		setState(DEFAULT_STATE);
		
		setTileAlpha(pDefiniton.alpha);
		
		if (isIlluminated) {
			cast(anim, FlumpMovie).gotoAndStop(0);
		} else {
			cast(anim, FlumpMovie).gotoAndStop(1);
		}
		
		GameStage.getInstance().getTilesContainer().addChild(this);
	}
	
	/**
	 * Met toutes les tile present dans le rayon donnée en statue constructible et les illumine
	 * @param	position
	 * @param	radius
	 */
	public static function illumineTileInRadiusAt(position:Point, radius:Int):Void {
		var index:Float;
		var tiles:Array<TileModelDef> = [];
		var tile:TileModelDef;
		var tileAlpha:Float;
		
		for (i in 0...radius) {
			tileAlpha = (Math.exp(i / radius) - 1) / (Math.exp(1.1) - 1);
			for (j in 0...radius * 30) {
				index = j / radius;
				tile = TypeDefUtils.cloneObject(TypeDefUtils.tileModelDef);
				tile.x = Math.round(position.x + Math.cos(index) * i);
				tile.y = Math.round(position.y + Math.sin(index) * i);
				tile.alpha = tileAlpha;
				tiles.push(tile);
			}
		}

		for (k in 0...tiles.length) {
			if (GMap.isInsideGrid(Std.int(tiles[k].x), Std.int(tiles[k].y))) {
				setTileIlluminatedAndAlphaInGlobalMapAt(tiles[k]);
			}
		}
		
		refreshTilesAlpha();
	}
	
	private static function setTileIlluminatedAndAlphaInGlobalMapAt(tile:TileModelDef):Void {
		var tileInGlobalMap:TileModelDef = GMap.getElementByTypeAt(new Point(tile.x, tile.y), ModelElementNames.TILE);
		
		tileInGlobalMap.alpha = tileInGlobalMap.alpha > tile.alpha ? tile.alpha : tileInGlobalMap.alpha;
		
		if (!tileInGlobalMap.isIlluminated) {
			tileInGlobalMap.isIlluminated = true;
			tileInGlobalMap.isBuildable = true;
		}
	}
	
	private static function refreshTilesAlpha():Void {
		var tile:Tile;
		var position:Point;
		
		for (i in 0...list.length) {
			tile = list[i];
			position = tile.positionToModel(true);
			tile.setTileAlpha(getTileAlphaAt(position));
		}
	}
	
	private static function getTileAlphaAt(position:Point):Float {
		return GMap.getElementByTypeAt(position, ModelElementNames.TILE).alpha;
	}
	
	/**
	 * Modifie la propriété isBuildable d'un array de tiles
	 * @param	Array<TileSavedDef>
	 * @param	isBuildable
	 */
	public static function setTilesBuildable(tiles:Array<TileModelDef>, _isBuildable:Bool):Void {
		var mapElements:Array<Dynamic>;
		var tile:TileModelDef;
		
		for (i in 0...tiles.length) {
			tile = tiles[i];
			mapElements = GMap.globalMap[tile.x][tile.y];
			
			if (mapElements != null) {
				GMap.getElementByTypeInArray(mapElements, ModelElementNames.TILE).isBuildable = _isBuildable;
			}
		}
	}
	
	/**
	 * Permet de savoir si un batiment est construisable à un endroit donnée
	 * @param	Array des tiles concerné (Récupérable grâce à getTilesArray(pPosition:Point, pSize:SizeDef):Array<TileSavedDef>)
	 * @return
	 */
	public static function isTilesBuildable(pTiles:Array<TileModelDef>):Bool {
		var _isBuildable:Bool = true;
		
		if (pTiles == null) return false;
		
		for (i in 0...pTiles.length) {
			if (!pTiles[i].isBuildable) {
				_isBuildable = false;
			}
		}

		return _isBuildable;
	}
	
	/**
	 * Récupère un tableau contenant les tiles à une position avec une taille donné
	 * @param	pPosition position de la tile initial
	 * @param	pSize taille
	 * @return Array de tiles ou null si l'array exède les limitation de la map
	 */
	public static function getTilesArray(pPosition:Point, pSize:SizeDef):Array<TileModelDef> {
		var tiles:Array<TileModelDef> = new Array<TileModelDef>();
		var mapElements:Array<Array <Dynamic>>;

		try {
			mapElements = GMap.getElementsBySizeAt(pPosition, pSize);
		} catch (e:String) {
			return null;
		}

		for (i in 0...mapElements.length) {
			tiles.push(GMap.getElementByTypeInArray(mapElements[i], 'tile'));
		}

		return tiles;
	}

	/**
	 * Récupère le radius des lanterns
	 * @return Radius des lanterns
	 */
	public static function getLanternActionRadius():Int {
		var buildingSettings:Dynamic = cast GameLoader.getContent(JsonNames.BUILDINGS_SETTINGS);
		var lanternSetting:Dynamic = Reflect.field(buildingSettings, "lanterns");
		return cast Reflect.field(lanternSetting, "action_radius");
	}

	private function setTileAlpha(value:Float):Void {
		alpha = value;
	}
	
	override public function destroy():Void {
		list.splice(list.indexOf(this), 1);
		super.destroy();
	}
	
}