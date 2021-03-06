package com.isartdigital.builder.api;
import haxe.Http;


/**
 * ...
 * @author Flavien
 */
class Resources
{
	
	/**
	 * instance unique de la classe Resources
	 */
	private static var instance: Resources;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Resources {
		if (instance == null) instance = new Resources();
		return instance;
	}
	
	private var resourcesPath:String = "resources";
	private var goldPath:String = "/gold";
	private var spicePath:String = "/spice";
	private var offeringPath:String = "/offering";
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	public function get(pCallBack:String->Void) {
		//notre request en ajax
		
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + resourcesPath, { token: Api.token }));
		
		request.onData = pCallBack;
		request.request(false);
		
	}
	
	
	public function gold (pCallBack:String->Void) {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + resourcesPath + goldPath, { token: Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function spice (pCallBack:String->Void) {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + resourcesPath + spicePath, { token: Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function offering (pCallBack:String->Void) {		
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + resourcesPath + offeringPath, { token: Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
}