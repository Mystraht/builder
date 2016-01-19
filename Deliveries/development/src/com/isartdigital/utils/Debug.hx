package com.isartdigital.utils;

import com.isartdigital.utils.system.DeviceCapabilities;
import js.Browser;
import js.html.Image;
import pixi.core.ticker.Ticker;
import jsfps.fpsmeter.FPSMeter;


/**
 * Classe de Debug
 * @author Mathieu ANTHOINE
 */
class Debug
{

	/**
	 * instance unique de la classe Main
	 */
	private static var instance: Debug;	
	
	public var fps:FPSMeter;
	private static inline var QR_SIZE:Float = 0.35;
	private var ticker:Ticker;

	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Debug {
		if (instance == null) instance = new Debug();
		return instance;
	}	
	
	private function new() {}
	
	/**
	 * initialisation du débogueur
	 * @param	pGameDispatcher
	 */
	public function init():Void 
	{
		if (Config.fps) 
		{
			fps = new FPSMeter();
			fps.show();
			fps.showFps();
			
			ticker = new Ticker();
			ticker.add(updateFps);
			ticker.start();
		}
		
		if (Config.qrcode) 
		{
			var lQr:Image = new Image();
			lQr.style.position = 'absolute';
			lQr.style.right = '0px';
			lQr.style.bottom = '0px';
			var lSize:Int = Std.int(QR_SIZE * DeviceCapabilities.getSizeFactor());
			lQr.src = 'https://chart.googleapis.com/chart?chs='+lSize+'x'+lSize+'&cht=qr&chl=' + Browser.location.href + '&choe=UTF-8';
			Browser.document.body.appendChild(lQr);
		}
	}
	
	private function updateFps ():Void {
		fps.tick();
		fps.tickStart();
	}
	
	public static function error (pArg:Dynamic): Void {
		untyped console.error (pArg);
	}
	
	public static function warn (pArg:Dynamic): Void {
		untyped console.warn (pArg);
	}

	public static function table (pArg:Dynamic): Void {
		untyped console.table (pArg);
	}

	public static function info (pArg:Dynamic): Void {
		untyped console.info (pArg);
	}
	
	public function destroy (): Void {
		ticker.stop();
	}

}