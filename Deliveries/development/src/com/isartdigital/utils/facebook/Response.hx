package com.isartdigital.utils.facebook;
import com.isartdigital.utils.events.FacebookEventType;

/**
 * @author Mathieu Anthoine
 */
typedef Response =
{
	var status:String;
	@:optional var authResponse:AuthResponse;
}