package com.isartdigital.builder.game.map;

import pixi.core.math.shapes.Rectangle;
import pixi.core.math.Point;
import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.game.iso.IsoManager;


/**
 * ...
 * @author Dorian
 */
class GMap
{
	public static var globalMap:Map<Int, Map<Int, Array<Dynamic>>> = new Map<Int, Map<Int, Array<Dynamic>>> ();
	
	/**
	 * Test si il y a un element dans la globalMap à la position donné
	 * @param	x
	 * @param	y
	 * @return boolean
	 */
	public static function isPositionExistAt(position:Point, map:Map<Int, Map<Int, Array<Dynamic>>>):Bool {
		if (map.exists(Std.int(position.y))) {
			if (map[Std.int(position.y)].exists(Std.int(position.x))) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Si il y a un element à la position donné grâce à son type
	 * @param	position de l'element
	 * @param	element à récuperer
	 */
	public static function isElementTypeAt(position:Point, type:String):Dynamic {
		var thereIsElement:Bool;

		try {
			getElementByTypeAt(position, type);
			thereIsElement = true;
		} catch (e:String) {
			thereIsElement = false;
		}

		return thereIsElement;
	}

	/**
	 * Récupère un element dans la global map à une position grâce à son type
	 * @param	position de l'element
	 * @param	element à récuperer
	 */
	public static function getElementByTypeAt(position:Point, type:String):Dynamic {
		if (!isInsideGrid(Std.int(position.x), Std.int(position.y))) {
			throw 'Position is outside map';
		}
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];

		return getElementByTypeInArray(elements, type);
	}

	/**
	 * Ajoute un element dans la globalMap grâce à sa position
	 * @param	position dans la map
	 * @param	element à ajouter
	 */
	public static function addElementAt(position:Point, element:Dynamic):Void {
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];
		elements.push(element);
	}
	
	/**
	 * Enlève un element de la map grâce à sa position et son type puis return l'element enlevé
	 * @param	position dans la map de l'element à enlever
	 * @param	type de l'element à enlever
	 * @return Renvoi l'element enlevé
	 */
	public static function removeElementByTypeAt(position:Point, type:String):Dynamic {
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];
		var elementRemoved:Dynamic;
		
		for (i in 0...elements.length) {
			if (elements[i].type == type) {
				elementRemoved = elements.splice(i, 1);
				return elementRemoved[0];
			}
		}
		
		throw 'typedef was not found in elements array';
	}
	
	/**
	 * Récupère un element dans un array grâce à son type
	 * @param	type type de l'element à comparer
	 * @return Renvoie l'element trouvé, si il le trouve pas, rnevoi null
	 */
	public static function getElementByTypeInArray(elements:Array<Dynamic>, type:String):Dynamic {
		for (i in 0...elements.length) {
			if (elements[i].type == type) {
				return elements[i];
			}
		}
		
		throw 'getElementByTypeInArray : Element type was not found in elements list';
	}

	/**
	 * Récupère un array d'array grâce au size
	 */
	public static function getElementsBySizeAt(position:Point, size:SizeDef):Array<Array <Dynamic>> {
		var elementsBunch:Array<Array <Dynamic>> = [];
		var xIndex:Int;
		var yIndex:Int;

		for (x in 0...size.width) {
			for (y in 0...size.height) {
				xIndex = Std.int(position.x) - x;
				yIndex = Std.int(position.y) - y;

				if (isInsideGrid(xIndex, yIndex)) {
					elementsBunch.push(globalMap[xIndex][yIndex]);
				} else {
					throw 'getArraysElementsBySizeAt :: Element you want to retrieve is outside of the map';
				}
			}
		}

		return elementsBunch;
	}

	/**
	 * Ajoute un element dans la globalMap grâce à sa position
	 * @param	position dans la map
	 * @param	element à ajouter
	 */
	public static function addElementsBySizeAt(position:Point, size:SizeDef, element:Dynamic):Void {
		var elementsBunch:Array< Array<Dynamic>> = getElementsBySizeAt(position, size);
		var elements:Array<Dynamic>;

		for (i in 0...elementsBunch.length) {
			elements = elementsBunch[i];
			elements.push(element);
		}
	}
	
	/**
	 * Ajoute un element dans la globalMap grâce à sa position
	 * @param	position dans la map
	 * @param	element à ajouter
	 */
	public static function removeElementsBySizeAndTypeAt(position:Point, size:SizeDef, type:String):Void {
		var xPositionWithOffset:Int;
		var yPositionWthOffset:Int;
		
		for (x in 0...size.width) {
			for (y in 0...size.height) {
				xPositionWithOffset = Std.int(position.x - x);
				yPositionWthOffset = Std.int(position.y - y);
				
				removeElementByTypeAt(new Point(xPositionWithOffset, yPositionWthOffset), type);
			}
		}
	}

	/**
	 * Renvoi la position de la tile au millieu de l'écran
	 * @return Point position de la tile
	 */
	public static function getTilePositionAtScreenCenter():Point {
		var screenRect:Rectangle = GameManager.getInstance().get_ScreenRect();
		var screenCenterIso:Point = new Point(
			screenRect.x + screenRect.width / 2,
			screenRect.y + screenRect.height / 2
		);
		
		return IsoManager.isoToModelView(screenCenterIso);
	}

	/**
	 * Return true si la position inqiqué est l'origine de l'element
	 */
	public static function isModelElementOriginInGlobalMapAt(position:Point, elementType:String):Bool {
		var element:Dynamic = GMap.getElementByTypeAt(position, elementType);

		return (
			Std.int(element.x) == Std.int(position.x) &&
			Std.int(element.y) == Std.int(position.y)
		);
	}

	
	
	/**
	 * Indique si la position est hors de la grille ou à l'interieur
	 * @return
	 */
	public static function isInsideGrid(pX:Int, pY:Int):Bool {
		if (pX >= 0 &&
			pY >= 0 &&
			pX < Config.mapSize &&
			pY < Config.mapSize) {
			return true;
		}
		
		return false;
	}

	public static function isNotInsideGrid(pX:Int, pY:Int):Bool {
		return !isInsideGrid(pX, pY);
	}
	
	/**
	 * /!\ fonction de debuggage
	 * Affiche la position de la tile sous la souris
	 */
	public static function displayTilePositionUnderMouse() {
		var lPosition:Point = IsoManager.isoToModelView(GameManager.getInstance().mousePosition);

		//if (Math.floor(Math.random() * 25) == 0) trace("mouse" + GameManager.getInstance().mousePosition);
		if (Math.floor(Math.random() * 10) == 0) trace("x : " + lPosition.x + " y : " + lPosition.y);
	}
}