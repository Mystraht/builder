package com.isartdigital.builder.api;
import haxe.Http;

	
/**
 * ...
 * @author Roman CHEVASSU
 */
class Gifts 
{
	
	/**
	 * instance unique de la classe Lantern
	 */
	private static var instance: Gifts;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Gifts {
		if (instance == null) instance = new Gifts();
		return instance;
	}
	
	private var giftsPath : String = "gifts";
	private var createPath : String = "/create";
	private var collectPath : String = "/collect";
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}

	public function getGifts(pCallBack:String->Void):Void {
		var request = new Http(Utils.formatPath(Api.domain + Api.pathApi + giftsPath, { token: Api.token }));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function create(friendUserId, pCallBack:String->Void):Void {
		var request = new Http(Utils.formatPath(Api.domain + Api.pathApi + giftsPath + createPath, { token: Api.token, friend_user_id: friendUserId}));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
	public function collect(name, authorName, pCallBack:String->Void):Void {
		var request = new Http(Utils.formatPath(Api.domain + Api.pathApi + giftsPath + collectPath, { token: Api.token, name: name, author_name: authorName}));
		
		request.onData = pCallBack;
		request.request(true);
	}
}