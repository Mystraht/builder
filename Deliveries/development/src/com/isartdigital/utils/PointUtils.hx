package com.isartdigital.utils;
import pixi.core.math.Point;

/**
 * ...
 * @author Flavien
 */
class PointUtils
{
	public static function isEqual(pointA:Point, pointB:Point) : Bool {
		return pointA.x == pointB.x && pointA.y == pointB.y;
	}
}