package com.isartdigital.utils.game.iso;
import com.isartdigital.utils.system.DeviceCapabilities;
import com.isartdigital.utils.system.DeviceCapabilities;
import pixi.core.math.shapes.Rectangle;
import pixi.core.math.shapes.Rectangle;
import pixi.core.graphics.Graphics;
import com.isartdigital.builder.game.GameManager;
import pixi.core.math.Point;

/**
 * Manager Iso
 * @author Mathieu Anthoine
 */
class IsoManager
{	
	
	private static var halfWidth:Float;
	private static var halfHeight:Float;
	
	/**
	 * Initialisation du Manager Iso
	 * @param	pTileWidth largeur des tuiles
	 * @param	pTileHeight hauteur des tuiles
	 */
	public static function init (pTileWidth:UInt, pTileHeight:UInt): Void {
		halfWidth = pTileWidth / 2;
		halfHeight = pTileHeight / 2;
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
		var screenRect:Rectangle = GameManager.getInstance().get_ScreenRect();
		var hudContainerOffset:Rectangle = DeviceCapabilities.getScreenRect(GameStage.getInstance().getHudContainer());
		var positionInPx:Point = IsoManager.modelToIsoView(position);
		var positionInHud = new Point(
			positionInPx.x - screenRect.x + hudContainerOffset.x,
			positionInPx.y - screenRect.y + hudContainerOffset.y
		);
		return positionInHud;
	}
	
	/**
     * détermine si l'objet A est devant l'objet B
     * @param    pA Objet "Zsortable" A
     * @param    pB Objet "Zsortable" B
     * @return pA, pB ou null si les objets ne se superposent pas
     */
    public static function isInFrontOf(pA:IZSortable,pB:IZSortable):IZSortable {
        
        // test d'intersection
        if ((pA.colMax < pB.colMin || pA.colMin > pB.colMax) && (pA.rowMax < pB.rowMin || pA.rowMin > pB.rowMax)) {
            if (pA.colMax + pA.rowMax> pB.colMax + pB.rowMax) return pA;
            else return pB;
        }
        
        // test sur col
        if (pA.colMax<pB.colMin || pA.colMin >pB.colMax) {
            if (pA.colMin >= pB.colMax) return pA;
            if (pB.colMin >= pA.colMax) return pB;
        }
        
        //test sur row
        if (pA.rowMax<pB.rowMin || pA.rowMin >pB.rowMax) {
            if (pA.rowMin >= pB.rowMax) return pA;
            if (pB.rowMin >= pA.rowMax) return pB;
        }
        
        return pB;

    }
	
	/**
	 * Détermine la profondeur de l'objet 
	 * @param	pItem Objet "Zsortable"
	 * @param	pList tableau des objets "Zsortable" à l'écran
	 * @return	profondeur 
	 */
	public static function getDepth (pItem:IZSortable, pList:Array<IZSortable>):UInt {
		for (i in 0...pList.length) {
			if (pList[i] == isInFrontOf(pItem, pList[i])) return i;
		}
		
		return pList.length;
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
		GameStage.getInstance().getBuildingsContainer().children.sort(cast(isInFrontOf));
	}
	
}