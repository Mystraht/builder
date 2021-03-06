package com.isartdigital.builder.api;
import String;
import String;
import String;
import String;
import haxe.Http;

/**
 * ...
 * @author Flavien
 */
class User
{
	/**
	 * instance unique de la classe Resources
	 */
	private static var instance: User;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): User {
		if (instance == null) instance = new User();
		return instance;
	}
	
	private var userPath:String = "users";
	private var createPath:String = "/create";
	private var createFBPath:String = "/createFB";
	public  var userInfoPath:String = 'userInfos';
	public  var loginPath:String = "/login";
	private var dailyRewardPath:String = "/dailyreward";
	private var updatePath:String = "/update";
	private var paradePath:String = "/parade";
	private var buyPath:String = "/buy";
	private var completePath:String = "/complet";
	private var ftuePath:String = "/ftue";
	private var experiencePath:String = "/experience";
	private var destroyPath:String = "/destroy";
	
	public function new()
	{
		
	}

	public function createFBAccount(mail:String, firstName:String, lastName:String, token:String, callback:String->Void):Void {
		var requestParameters = {
			mail: mail,
			username: firstName + ' ' + lastName,
			token: token
		};
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + createFBPath, requestParameters));
		request.onData = callback;
		request.request(true);
	}
	
	public function getUserInfo(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userInfoPath, { token: Api.token }));
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function getDailyreward(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + dailyRewardPath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function dailyrewardUpdate(pCallBack:String->Void) {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + dailyRewardPath + updatePath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
	public function getParade(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + paradePath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function getParadeUpdate(bonusPesos:Int, bonusPimientos:Int, bonusOffering:Int, useHardInParade:Bool, hardPurchase:Bool):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + paradePath + updatePath, 
			{ token:Api.token , bonusPesos:bonusPesos, bonusPimientos:bonusPimientos, bonusOffering:bonusOffering, useHardInParade:useHardInParade, hardPurchase:hardPurchase} ));
		
		request.onData = ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	
	public function getFtue(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + ftuePath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function getExperience(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi +userPath + experiencePath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(false);
	}
	
	public function buy(pName: String):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi +userPath + buyPath, { token:Api.token, name:pName}));
		
		request.onData = ApiUtils.updateUserDataWithRequestResult;
		request.request(true);
	}
	
	public function ftueComplet(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + ftuePath + completePath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(true);
	}
	
	public function destroy(pCallBack:String->Void):Void {
		var request = new Http(ApiUtils.formatPath(Api.domain + Api.pathApi + userPath + destroyPath, { token:Api.token } ));
		
		request.onData = pCallBack;
		request.request(true);
	}
}	