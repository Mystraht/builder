package com.isartdigital.services;
import com.isartdigital.utils.Config;
import haxe.Http;
import haxe.Json;

/**
 * ...
 * @author Mathieu Anthoine
 */
class HttpService extends Http
{

	private var callback:Dynamic->Void;	
	
	private static inline var SERVICE_PATH:String = "https://fbgame.isartdigital.com/2017_builder/builder0/broadcast/";
	
	public function new(pCallback:Dynamic->Void=null) 
	{
		callback = pCallback;
		super(SERVICE_PATH);
		if (callback!=null) {
			onData = _onData;
			onError = _onError;
		}
		if (Config.debug) addParameter("debug", "");
	}

	private function _onData (pData:String): Void {
		callback(Json.parse(pData));
		callback = null;
	}
	
	private function _onError (pError:String): Void {
		trace (pError);
		callback = null;
	}	
	
}