package com.isartdigital.utils.game.iso;
import Std;
import pixi.core.math.Point;
import com.isartdigital.utils.system.DeviceCapabilities;
import pixi.core.math.shapes.Rectangle;
import com.isartdigital.builder.game.GameManager;

/**
 * Manager Iso
 * @author Mathieu Anthoine
 */
class IsoManager
{
	private static var halfWidth:Float;
	private static var halfHeight:Float;
	public static var depthMap:Map<Int, Map<Int, Int>> = new Map<Int, Map<Int, Int>>();


	/**
	 * Initialisation du Manager Iso
	 * @param	pTileWidth largeur des tuiles
	 * @param	pTileHeight hauteur des tuiles
	 */
	public static function init (pTileWidth:UInt, pTileHeight:UInt): Void {
		halfWidth = pTileWidth / 2;
		halfHeight = pTileHeight / 2;
		createDepthMap();
	}
	
	/**
	 * Conversion du modèle à la vue Isométrique
	 * @param	pPoint colonne et ligne dans le modèle
	 * @return point en x, y dans la vue
	 */
	public static function modelToIsoView(pPoint:Point):Point {
		return new Point (
			(pPoint.x - pPoint.y)*halfWidth,
			(pPoint.x + pPoint.y)*halfHeight
		);
	}

	/**
	 * Conversion de la vue Isométrique au modèle
	 * @param	pPoint coordonnées dans la vue
	 * @return colonne et ligne dans le modèle (valeurs non arrondies)
	 */
	public static function isoToModelView(pPoint:Point, ?useCeil:Bool = true):Point {
		var isoView:Point = new Point (
			(pPoint.y/halfHeight+pPoint.x/halfWidth)/2,
			(pPoint.y/halfHeight-pPoint.x/halfWidth)/2
		);

		if (useCeil) {
			return new Point (
				Math.ceil(isoView.x),
				Math.ceil(isoView.y)
			);
		} else {
			return isoView;
		}
	}

	/**
	 * Convertie une position du model vers le hud
	 * @param position coordonnée dans le model
	 * @return coordonné en px sur le hud
	 */
	public static function modelToHudView(position:Point):Point {
		var screenRect:Rectangle = GameManager.getInstance().getScreenRect();
		var hudContainerOffset:Rectangle = DeviceCapabilities.getScreenRect(GameStage.getInstance().getHudContainer());
		var positionInPx:Point = IsoManager.modelToIsoView(position);
		var positionInHud = new Point(
			positionInPx.x - screenRect.x + hudContainerOffset.x,
			positionInPx.y - screenRect.y + hudContainerOffset.y
		);
		return positionInHud;
	}

	/**
	 * Récupère l'index de la position de la souris dans la grille
	 * @return
	 */
	public static function getMousePositionIndex():Point {
		var lGameManager:GameManager = GameManager.getInstance();
		var mouseCoord:Point = isoToModelView(lGameManager.mousePosition);
		return mouseCoord;
	}

	/**
	 * Tri tous les objet du jeu
	 */
	public static function sortAll():Void {
		GameStage.getInstance().getBuildingsContainer().children.sort(cast sortByDepth);
	}

	private static function createDepthMap():Void {
		var start:Point = new Point(
			(Config.mapSize / 2) * Config.tileWidth * -1,
			0
		);

		var end:Point = new Point(
			(Config.mapSize / 2) * Config.tileWidth,
			Config.mapSize * Config.tileHeight
		);

		var xCursor:Float = start.x;
		var yCursor:Float = start.y + Config.tileHeight / 2;
		var cursorWithOffset:Point;

		var index:Int = 0;

		while (xCursor < end.x || yCursor < end.y) {
			xCursor += Config.tileHeight;

			if (xCursor > end.x) {
				yCursor += Config.tileHeight;
				xCursor = start.x;
			}

			index++;

			var indexModel:Point = IsoManager.isoToModelView(new Point(xCursor, yCursor));

			if (!depthMap.exists(Std.int(indexModel.x))) {
				depthMap[Std.int(indexModel.x)] = new Map<Int, Int>();
			}
			depthMap[Std.int(indexModel.x)][Std.int(indexModel.y)] = index;
		}
	}

	private static function sortByDepth(a:IZSortable, b:IZSortable):Int {
		var aInModel = isoToModelView(new Point(a.x, a.y), true);
		var bInModel = isoToModelView(new Point(b.x, b.y), true);

		aInModel.x -= a.modelWidth;
		aInModel.y -= a.modelHeight;

		bInModel.x -= b.modelWidth;
		bInModel.y -= b.modelHeight;

		var aIndex:Int = depthMap[Std.int(aInModel.x)][Std.int(aInModel.y)];
		var bIndex:Int = depthMap[Std.int(bInModel.x)][Std.int(bInModel.y)];

		return aIndex - bIndex;
	}
}