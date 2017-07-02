package com.isartdigital.services.deltaDNA;
import com.isartdigital.utils.system.DeviceCapabilities;
import haxe.Http;
import haxe.Json;

typedef DeltaDNAEvent = {
	var eventName:String;
	var userID:String;
	var sessionID:String;
	var eventParams:Dynamic;
}

typedef DeltaDNAEngage = {
	var decisionPoint:String;
	var userID:String;
	var sessionID:String;
	var platform:String;
	var version:String;
	var parameters:Dynamic;
}

/**
 * Classe permettant d'envoyer des données à la plateforme DeltaDNA 
 * via un proxy côté server pour ne pas être limité par les contraintes d'HTTPS
 * ou directement quand les requêtes sont pas lancées depuis une app CocoonJs
 * @author Mathieu Anthoine
 */
class DeltaDNA {

	public static inline var GAME_STARTED:String = "gameStarted";
	public static inline var CLIENT_DEVICE:String = "clientDevice";
	public static inline var NEW_PLAYER:String = "newPlayer";
	public static inline var INVITE_SENT:String = "inviteSent";
	public static inline var TRANSACTION:String = "transaction";

	private static inline var COLLECT:String = "http://collect8073bldr4.deltadna.net/collect/api";
	private static inline var ENGAGE:String = "http://engage8073bldr4.deltadna.net";

	private static inline var DEV_KEY:String = "69510202100043115075528917614566";
	private static inline var LIVE_KEY:String = "69510208265774033177915811714566";

	private static inline var SERVER_SCRIPT:String = "php/deltaDNA.php";

	public static var onGetUserID:String -> Void;

	private static var list:Array<DeltaDNAEvent> = [];

	private static function onData(pData:String):Void {
		trace("DeltaDNA success: " + pData);
	}

	private static function onError(pError:String):Void {
		trace("DeltaDNA error: " + pError);
	}

	private static function _onGetUserID(pData:String):Void {
		onGetUserID(Json.parse(pData).userID);
	}

	private static function request(pRequest:Http):Void {
		pRequest.onError = onError;
		pRequest.request(true);
	}

	/**
	 * Récupère un userID
	 */

	public static function getUserID():Void {
		var lRequest:Http;
		if (DeviceCapabilities.system == DeviceCapabilities.SYSTEM_DESKTOP) {
			lRequest = new Http(SERVER_SCRIPT);
			lRequest.addParameter("url", COLLECT + "/uuid");
		} else lRequest = new Http(COLLECT + "/uuid");

		lRequest.onData = onGetUserID != null ? _onGetUserID : onData;
		request(lRequest);

	}

	/**
	 * Permet d'ajouter un event DeltaDNA à la liste des events
	 * @param	pEventName Nom de l'event
	 * @param	pParams Objet décrivant les paramètres à transmettre
	 * @param	pLive Event LIVE ou DEV
	 * @param	pUserID
	 * @param	pSessionID
	 */

	public static function addEvent(pEventName:String, pParams:Dynamic = null, pUserID:String = "", pSessionID:String = ""):Void {

		if (pUserID == "") pUserID = "User_" + Date.now().getTime();
		if (pSessionID == "") pSessionID = "Session_" + Date.now().getTime();
		if (pParams == null) pParams = {};
		var lEvent:DeltaDNAEvent = {
			eventName:pEventName, userID:pUserID, sessionID:pSessionID, eventParams: pParams
		};

		list.push(lEvent);
	}

	public static function send(pLive:Bool = false):Void {
		var lJson:Dynamic;
		var lSuffix:String = "";

		if (list.length == 1) lJson = list[0]; else if (list.length > 1) {
			lJson = { eventList : list }
			lSuffix = "/bulk";
		} else {
			trace("DeltaDNA: Pas d'Event à envoyer");
			return;
		}

		var lUrl:String = COLLECT + "/" + (pLive ? LIVE_KEY : DEV_KEY) + lSuffix;

		var lRequest:Http;
		if (DeviceCapabilities.system == DeviceCapabilities.SYSTEM_DESKTOP) {
			lRequest = new Http(SERVER_SCRIPT);
			lRequest.addParameter("url", lUrl);
			lRequest.addParameter("json", Json.stringify(lJson));
		} else {
			lRequest = new Http(lUrl);
			lRequest.addHeader("Content-Type", "application/json");
			lRequest.setPostData(Json.stringify(lJson));
		}

		lRequest.onData = onData;
		request(lRequest);

		list = [];

	}

	/**
	 * Permet d'interroger la platforme DeltaDNA sur la disponibilité de campagnes
	 * @param	pDecisionPoint le point de décision interrogé
	 * @param	pParams Objet décrivant les paramètres à transmettre
	 * @param	pUserID
	 * @param	pSessionID
	 */

	public static function engage(pDecisionPoint:String, pLive:Bool = false, pParams:Dynamic = null, pUserID:String = "", pSessionID:String = ""):Void {

		if (pUserID == "") pUserID = "User_" + Date.now().getTime();
		if (pSessionID == "") pSessionID = "Session_" + Date.now().getTime();
		if (pParams == null) pParams = {};
		var lUrl:String = ENGAGE + "/" + (pLive ? LIVE_KEY : DEV_KEY);

		var lEngage:DeltaDNAEngage = {
			decisionPoint: pDecisionPoint, userID: pUserID, sessionID: pSessionID, platform: DeviceCapabilities.isCocoonJS ? "ANDROID" : "PC_CLIENT", version: "4" /* mettre toujours cette valeur */, parameters: pParams
		};

		var lRequest:Http;
		if (DeviceCapabilities.isCocoonJS) {
			lRequest = new Http(lUrl);
			lRequest.addHeader("Content-Type", "application/json");
			lRequest.setPostData(Json.stringify(lEngage));
		} else {
			lRequest = new Http(SERVER_SCRIPT);
			lRequest.addParameter("url", lUrl);
			lRequest.addParameter("json", Json.stringify(lEngage));
		}

		lRequest.onData = onData;
		request(lRequest);

	}

}
