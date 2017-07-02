package com.isartdigital.utils;

import pixi.core.text.Text;
import pixi.core.graphics.Graphics;
import com.isartdigital.utils.game.GameStage;
import pixi.core.math.Point;
import com.isartdigital.utils.system.DeviceCapabilities;
import js.Browser;
import js.html.Image;


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

	public static var debugPointsList:Array<Graphics> = [];
	public static var debugPositionOnClick:Bool = false;
	public static var debugIlluminateTileAtClick:Bool = false;

	public var fps:Perf;
	private static inline var QR_SIZE:Float = 0.35;


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
		if (Config.fps) fps = new Perf("TL");
		
		if (Config.qrcode && !DeviceCapabilities.isCocoonJS) 
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
	
	public function destroy (): Void {}

	public static function addDebugPointAt(position:Point, color:Int = 0xFF0000):Void {
		var debugPoint = new Graphics();
		debugPoint.beginFill(color);
		debugPoint.drawCircle(0, 0, 5);
		debugPoint.position.set(position.x, position.y);
		GameStage.getInstance().getGameContainer().addChild(debugPoint);
		debugPointsList.push(debugPoint);
	}

	public static function addDebugTextAt(position:Point, text:String, color:Int = 0xff1010):Void {
		var text = new Text(text, {font : '24px Arial', fill : color, align : 'center'});
		text.position = new Point(position.x, position.y);
		GameStage.getInstance().getGameContainer().addChild(text);
	}
	
	public static function removeAllDebugPoint () : Void {
		while (debugPointsList.length != 0) {
			
			debugPointsList[0].parent.removeChild(debugPointsList[0]);
			debugPointsList[0].destroy();
			debugPointsList.splice(0, 1);
			
		}
	}
}