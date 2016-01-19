package com.isartdigital.utils.game;

import com.isartdigital.builder.game.GameManager;
import com.isartdigital.builder.game.manager.MapManager;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.utils.events.MouseEventType;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.system.DeviceCapabilities;
import js.Browser;
import js.html.MouseEvent;
import pixi.core.display.DisplayObject;
import pixi.core.math.Point;
import pixi.core.math.shapes.Rectangle;

/**
 * Classe Camera
 * @author Mathieu ANTHOINE
 */
class Camera
{

	private var render:Dynamic;
	
	public var target (default,null):DisplayObject;
	public var focus (default, null):DisplayObject;
	
	public var cameraFocus:GameObject = new GameObject();
	
	//même valeur pour x/y pour simplifier les réglages
	//private var inertiaMax:Point = new Point(80, 80);
	//private var inertiaMin:Point = new Point(10, 10);
	private var inertiaMax:Float = 80;
	private var inertiaMin:Float = 10;
	private var countH:UInt = 10;
	private var delayH:UInt = 120;
	private var countV:UInt = 10;
	private var delayV:UInt = 120;
	
	private var startPosition:Point;
	private var positionLayer:Point = new Point();
	
	private var speedLimite:Float = 100;
	
	/**
	 * instance unique de la classe GamePlane
	 */
	private static var instance: Camera;

	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): Camera {
		if (instance == null) instance = new Camera();
		return instance;
	}	
	
	private function new() 
	{
		Browser.window.addEventListener(MouseEventType.MOUSE_DOWN, onDrag);
		Browser.window.addEventListener(MouseEventType.MOUSE_UP, onUp);
		Browser.window.addEventListener(MouseEventType.MOUSE_MOVE, refreshMouseCoordinates);
	}
	
	private function refreshMouseCoordinates(pEvent:MouseEvent) : Void 
	{
		positionLayer.set(GameManager.getInstance().mousePosition.x, GameManager.getInstance().mousePosition.y);
	}
	
	private function onDrag(?pEvent:MouseEvent): Void {
		//offSet = new Point(GameManager.getInstance().mousePosition.x, GameManager.getInstance().mousePosition.y);
		startPosition = new Point(positionLayer.x + cameraFocus.x, positionLayer.y + cameraFocus.y);
		
	}
	
	private function onUp(pEvent:MouseEvent) : Void {
		startPosition = null;
	}
	
	public function centerView() : Void { 
		var lMiddle:Int = Math.round(MapManager.getInstance().mapSize / 2);
		var lPoint:Point = new Point(MapManager.getInstance().globalMap[lMiddle][lMiddle][0].x, MapManager.getInstance().globalMap[lMiddle][lMiddle][0].y);
		var lPosition:Point = IsoManager.modelToIsoView(lPoint);
		cameraFocus.position.set(lPosition.x, lPosition.y);
		setPosition();
	}
	
	/**
	 * Défini la cible de la caméra
	 * @param	pTarget cible
	 */
	public function setTarget (pTarget:DisplayObject):Void {
		target = pTarget;
	}
	
	/**
	 * Défini l'élement à repositionner au centre de l'écran
	 * @param	pFocus focus
	 */
	public function setFocus(pFocus:DisplayObject):Void {
		focus = pFocus;
	}
	
	/**
	 * recadre la caméra
	 * @param	pDelay si false, la caméra est recadrée instantannément
	 */
	private function changePosition (?pDelay:Bool=true) :Void {
		
		countH++;
		countV++;
		
		var lCenter:Rectangle = DeviceCapabilities.getScreenRect(target.parent);				
		var lFocus:Point = getFocusCoord();
		var lInertiaX:Float = pDelay ? getInertiaX() : 1;
		var lInertiaY:Float = pDelay ? getInertiaY() : 1;
		
		var lDeltaX:Float = (lCenter.x + lCenter.width / 2 - lFocus.x - target.x) / lInertiaX;
		var lDeltaY:Float = (lCenter.y + lCenter.height / 2 - lFocus.y - target.y) / lInertiaY;
		
		
		if (pDelay) lDeltaX = checkSpeedLimit(lDeltaX);
		if (pDelay) lDeltaY = checkSpeedLimit(lDeltaY);
		
		
		
		target.x+= lDeltaX;
		target.y+= lDeltaY;
	}
	
	private function checkSpeedLimit(pSpeed:Float) : Float
	{ 
		if (Math.abs(pSpeed) < 0.01) return 0;
		else if (Math.abs(pSpeed) > speedLimite) return (pSpeed / Math.abs(pSpeed)) * speedLimite;
		return pSpeed;
	}
	
	/**
	 * retourne une inertie en X variable suivant le temps
	 * @return inertie en X
	 */
	private function getInertiaX() : Float {
		if (countH > delayH) return inertiaMin;
		return inertiaMax + (inertiaMin-inertiaMax)*countH/delayH;
	}

	/**
	 * retourne une inertie en Y variable suivant le temps
	 * @return inertie en Y
	 */	
	private function getInertiaY() : Float {
		if (countV > delayV) return inertiaMin;
		return inertiaMax + (inertiaMin-inertiaMax)*countV/delayV;
	}
	
	/**
	 * cadre instantannément la caméra sur le focus
	 */
	public function setPosition():Void {
		GameStage.getInstance().render();
		changePosition(false);
	}
	
	/**
	 * Vérifie que la position donné est dans les limites du jeu
	 * @param	pPosition
	 * @return
	 */
	private function isInLimit(pPosition:Point) : Bool
	{
		var lPoint:Point = IsoManager.isoViewToModel(pPosition);
		//return (MapManager.getInstance().getTileInMap(lPoint) != null);
		return true;
		//TO DO : refaire les limites de la map en fonciton de la globalmap
	}
	
	/**
	 * cadre la caméra sur le focus avec de l'inertie
	 */
	public function move():Void {
		
		if (startPosition != null) {
			//if (isInLimit(new Point(Math.round(startPosition.x - positionLayer.x), Math.round(startPosition.y - positionLayer.y))))
			{
				cameraFocus.x = startPosition.x - positionLayer.x;
				cameraFocus.y = startPosition.y - positionLayer.y;
			}
		}
		changePosition(true);
	}
	
	/**
	 * remet à zéro le compteur qui fait passer la caméra de l'inertie en X maximum à minimum
	 */
	public function resetX():Void {
		countH = 0;
	}

	/**
	 * remet à zéro le compteur qui fait passer la caméra de l'inertie en Y maximum à minimum
	 */
	public function resetY():Void {
		countV = 0;
	}
	
	/**
	 * retourne les coordonnées du focus dans le repère de la target
	 */
	public function getFocusCoord ():Point {
		return target.toLocal(focus.position, focus.parent);
	}
	
	/**
	 * détruit l'instance unique et met sa référence interne à null
	 */
	public function destroy (): Void {
		instance = null;
	}
	
}