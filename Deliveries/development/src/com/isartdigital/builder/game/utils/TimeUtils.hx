package com.isartdigital.builder.game.utils;

/**
 * ...
 * @author Flavien
 */
class TimeUtils
{
	public static inline var dayInMilliseconds:Float = 86400000;
	public static inline var hourInMilliseconds:Float = 3600000;
	public static inline var minuteInMilliseconds:Float = 60000;
	public static inline var secondInMilliseconds:Float = 1000;
	
	public static function getTimeLeftFromMilliseconds (timeInMilliSeconds:Float) : String {
		var day:Float = Math.floor(timeInMilliSeconds / dayInMilliseconds);
		var hour:Float = 
			Math.floor((timeInMilliSeconds - day * dayInMilliseconds) / hourInMilliseconds);
		var minute:Float = Math.floor((timeInMilliSeconds - day * dayInMilliseconds 
							- hour * hourInMilliseconds) / minuteInMilliseconds);
		var second:Float = Math.floor((timeInMilliSeconds - day * dayInMilliseconds 
							- hour * hourInMilliseconds - minute * minuteInMilliseconds)
							/ secondInMilliseconds);
							
		var textToDisplay:String = "";
		textToDisplay += day > 0 ? day + ":" : "";
		textToDisplay += hour > 0 ? hour + ":" : "";
		textToDisplay += minute > 0 ? minute + ":" : "";
		textToDisplay += second;
		return textToDisplay;
	}
	
}