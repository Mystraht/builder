package com.isartdigital.utils;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class MathUtils
{
	/**
	 * Return the sign of the number
	 */
	public static function getSign(number:Float) : Float {
		if (number == 0) return 0;
		return number / Math.abs(number);
	}
	
	/**
	 * Get Distance Between two point
	 * @param	pPointA
	 * @param	pPointB
	 * @return
	 */
	public static function getDistance(pPointA:Point, pPointB:Point):Float {
		return Math.sqrt(Math.pow(pPointA.x - pPointB.x, 2) + Math.pow(pPointA.y - pPointB.y, 2));
	}
	
	/**
	 * ceil number to his close step
	 * @param	number
	 * @param	step
	 * @return
	 */
	public static function roundToStep(number:Int, step:Float) : Float {
		return Math.ceil(number / step) * step;
	}
}