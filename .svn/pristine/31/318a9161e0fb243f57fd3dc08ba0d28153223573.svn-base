package com.isartdigital.builder.game.pooling;
import pixi.core.math.Point;


/**
 * @author Flavien
 */

interface IPoolObject 
{
	public var x:Float;
	public var y:Float;
	public var width:Float;
	public var height:Float;
	public var position:Point;
	
	/**
	 * Nettoye l'objet et l'ajoute a une poolList -> PoolObject.add
	 * Si l'objet ne peux pas être ajouté dans une poolList -> détruire l'objet
	 */
	public function remove () : Bool;
	
	/**
	 * initialise l'objet
	 * @param	pDefinition
	 */
	public function init (pDefinition:Dynamic) : Void;
}