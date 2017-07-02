package com.isartdigital.utils.game;
import pixi.filters.color.ColorMatrixFilter;

/**
 * ...
 * @author Dorian MILLIERE
 */
class Filter
{
	public static inline var EMPTY_FILTER:Dynamic = null;
	
    public static function getRed():Array<ColorMatrixFilter> {
		var lColorMatrixFilter:ColorMatrixFilter = new ColorMatrixFilter();
		lColorMatrixFilter.matrix = [
			1, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		return [lColorMatrixFilter];
    }
    
    public static function getGreen():Array<ColorMatrixFilter> {
		var lColorMatrixFilter:ColorMatrixFilter = new ColorMatrixFilter();
		lColorMatrixFilter.matrix = [
			0, 0, 0, 0, 0,
			1, 0, 0, 0, 0,
			0, 0, 0, 0, 0,
			0, 0, 0, 1, 0
		];
		return [lColorMatrixFilter];
            
    }
	
    public static function getBrightness(intensity:Float):Array<ColorMatrixFilter> {
		var lColorMatrixFilter:ColorMatrixFilter = new ColorMatrixFilter();
		lColorMatrixFilter.brightness(intensity, false);
		return [lColorMatrixFilter];
    }
}