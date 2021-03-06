package com.isartdigital.builder.api;

import com.isartdigital.services.Users;
import haxe.Http;
import haxe.Json;

	
/**
 * ...
 * @author Dorian
 */
class Buildings 
{
	
	/**
	 * instance unique de la classe Buildings
	 */
	private static var instance: Buildings;
	
	private var buildingsPath:String = "buildings";
	private var createPath:String = "/create";
	private var upgradePath:String = "/upgrade";
	private var collectPath:String = "/collect";
	private var movePath:String = "/move";
	private var hardBuildPath:String = "/hardBuild";
	private var changeColorPath:String = "/changeColor";
	private var destroyPath:String = "/destroy";
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Buildings {
		if (instance == null) instance = new Buildings();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		
	}
	
	
	public function getAllBuildings(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath, { token: Api.token }));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function create(pBuilding:String, pX:Int, pY:Int, hardBought:Bool) {
		var hardBoughtToString:String;
		hardBoughtToString = hardBought ? 'true' : 'false';

		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + "/" + pBuilding + createPath , { token: Api.token, x: pX, y: pY, hard: hardBoughtToString }));
		
		request.onData = ApiUtils.updateUserDataWithRequestResult;
		
		request.request(true);
	}
	
	public function upgrade(pX:Int, pY:Int):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + upgradePath, { token: Api.token, x: pX, y: pY }));
		
		request.onData = ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	
	public function collect(pX:Int, pY:Int,pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + collectPath, { token: Api.token, x: pX, y: pY }));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
	public function move(pX_start:Int, pY_start:Int, pX_end:Int, pY_end:Int, pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + movePath, { token: Api.token, x_start: pX_start, y_start: pY_start, x_end: pX_end, y_end: pY_end }));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
	public function hardBuild(pX:Int, pY:Int):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + hardBuildPath , { token: Api.token, x: pX, y: pY }));
		
		request.onData = ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	
	public function changeColor(pColor:String, pX:Int, pY:Int, pCallBack:String->Void ):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + changeColorPath , { token: Api.token, color: pColor, x: pX, y: pY }));
		
		request.onData = pCallBack;
		request.request(true);
	}

	public function destroy(pX:Int, pY:Int, pCallBack:String->Void ):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + buildingsPath + destroyPath , { token: Api.token, x: pX, y: pY }));
		
		request.onData = pCallBack;
		request.request(true);
	}
}