package com.isartdigital.builder.api;
import haxe.Http;

	
/**
 * ...
 * @author Roman CHEVASSU
 */
class Lanterns 
{
	
	/**
	 * instance unique de la classe Lantern
	 */
	private static var instance: Lanterns;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Lanterns {
		if (instance == null) instance = new Lanterns();
		return instance;
	}
	
	private var lanternsPath : String = "lanterns";
	private var createPath : String = "/create";
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}

	public function getLanterns(pCallBack:String->Void):Void {
		var request = new Http(Utils.formatPath(Api.domain + Api.pathApi + lanternsPath, { token: Api.token }));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function create(pX: Int, pY:Int, pHardPurchase:Bool, pCallBack:String->Void):Void {
		var request = new Http(Utils.formatPath(Api.domain + Api.pathApi + lanternsPath + createPath, { token: Api.token, x:pX , y:pY, hard: pHardPurchase}));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
}