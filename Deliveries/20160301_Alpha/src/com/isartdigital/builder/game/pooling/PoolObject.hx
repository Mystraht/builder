package com.isartdigital.builder.game.pooling;
import com.isartdigital.utils.Debug;

//Deuxième itération du système de pooling
/**
 * Système de Pooling
 * @author Flavien 
 */
class PoolObject
{
	/**
	 * MapManagerTest de liste de pooling
	 */
	private static var poolList:Map<String, Array<Dynamic>> = new Map<String, Array<Dynamic>> ();
	
	/**
	 * Nombre d'objet créé si une liste est vide
	 */
	private static inline var objectMarge:Int = 10;
	
	/**
	 * Nombre d'objet maximum dans une liste
	 */
	private static inline var objectListLimit:Int = 1000;
	
	/**
	 * Donne instance de pClass depuis une poolList
	 * @param	pClass la classe de l'objet a instancié
	 * @return une instance de pClass
	 */
	public static function create (pClass:Class<Dynamic>) : Dynamic
	{
		var lName:String = Type.getClassName(pClass);
		
		if (!poolList.exists(lName)) createPoolList(pClass);
		
		if (poolList.get(lName).length == 0) addObjectToPoolList(lName, pClass);
		
		return poolList.get(lName).shift();
	}
	
	/**
	 * Ajoute un Object a une poolList
	 * @param	pObject
	 * @return false si l'objet ne peux pas être ajouté à une liste
	 */
	public static function addPool(pObject:Dynamic) : Bool
	{
		var lName:String = Type.getClassName(Type.getClass(pObject));
		
		if (!poolList.exists(lName)) return false;
		
		if (poolList.get(lName).length > objectListLimit) return false;
		
		poolList.get(lName).push(pObject);
		return true;
	}
	
	/**
	 * Crée une liste de pooling de la classe pClass
	 * @param	pClass
	 */
	public static function createPoolList (pClass:Class<Dynamic>)
	{
		var lName:String = Type.getClassName(pClass);
		poolList.set(lName, new Array<Dynamic>());
		addObjectToPoolList(lName, pClass);
	}
	
	/**
	 * ajoute des objets à une liste de pooling
	 * @param	pName
	 * @param	pClass
	 */
	private static function addObjectToPoolList (pName:String, pClass:Class<Dynamic>)
	{
		for (i in 0...objectMarge) 
		{
			var lObject:Dynamic = Type.createInstance(pClass, []);
			poolList.get(pName).push(Type.createInstance(pClass, []));
		}
	}
	
	private function new() 
	{
		
	}
	
}