package com.isartdigital.builder.ui.hud;

/**
 * @author Dorian MILLIERE
 */

interface IMenu 
{
  	/**
	 * crée le menu
	 */
	public function create():Void;
	
	/**
	 * Affiche le menu
	 */
	public function show():Void;

	/**
	 * Cache le menu
	 */
	public function hide():Void;
}