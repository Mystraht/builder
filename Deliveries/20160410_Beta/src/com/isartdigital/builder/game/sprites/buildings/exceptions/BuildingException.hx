package com.isartdigital.builder.game.sprites.buildings.exceptions;

/**
 * ...
 * @author Dorian
 */
class BuildingExceptions
{
	public static var configNotFound:String = 'Building name not found in building configuration (buildingsSetting.json)';
	public static var noHarvestFunctionality:String = 'You try to use harvest functionality on building that havent this functionality';
	public static var mousePositionNotSet:String = 'Mouse position must be setted';
	public static var constructEndDateIsNull:String = 'You try to know construct end date of building but the date is null';
}