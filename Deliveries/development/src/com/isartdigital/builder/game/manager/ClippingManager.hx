package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.def.PointDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.pooling.IPoolObject;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.CollisionManager;
import com.isartdigital.utils.game.iso.IsoManager;
import js.html.Rect;
import pixi.core.math.shapes.Rectangle;
import pixi.core.math.Point;

/**
 * Système de clipping d'objets
 * @author Flavien
 */
class ClippingManager
{
	private static var Instance: ClippingManager = null;
	
	private static inline var SAFE_MARGE_VIEW:Float = 100;
	private static var SAFE_MARGE_MODEL:Float = 0;
	
	private var map:Map<Int, Map<Int, Array<Dynamic>>>;
	private var delta:Point = new Point();
	private var typeDefModels:Array<Dynamic> = new Array<Dynamic> ();
	private var classView:Array<Class<IPoolObject>> = new Array<Class<IPoolObject>> ();
	private var screenRectView:Void->Rectangle;
	private var objectListView:Array<Array<IPoolObject>> = new Array<Array<IPoolObject>>();
	private var screenRectModel:Rectangle;
	
	private var direction:String = "UP";
	
	private var clipInX:Int = 0;
	private var clipInY:Int = 0;
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): ClippingManager {
		if (Instance == null) Instance = new ClippingManager();
		return Instance;
	}
	
	//variable d'offset
	private var currentScreenPosition:Point = new Point();
	private var screenPosition:Point = new Point();
	
	private var TOP_RIGHT:Point = new Point();
	private var BOTTOM_LEFT:Point = new Point();
	private var BOTTOM_RIGHT:Point = new Point();
	private var BOTTOM_RIGHT_RIGHT:Point = new Point();
	
	
	
	private function new() 
	{

	}
	
	/**
	 * Configue le clipping.
	 * les index de pBuilding doit correspondre aux index de pTypeDef
	 * @param	pMap Map de Modèle
	 * @param	pDelta delta de clipping
	 * @param	pDef TypeDef du modèle
	 * @param	pBuilding Class de sortie qui implémente le pooling
	 * @param	pScreeRectRef getter du carré de référence
	 */
	public function setOn(pMapModel:Map<Int, Map<Int, Array<Dynamic>>>, pListView:Array<Array<IPoolObject>>, pDelta:Point, pDef:Array<Dynamic>, pBuilding:Array<Class<IPoolObject>>, pScreeRectRef:Void->Rectangle) : Void
	{
		if (typeDefModels.length != pBuilding.length && pBuilding.length != pListView.length)
		{
			Debug.error("SetOn Clipping -> pBuilding & pDef doesn't have the same length");
			return;
		}
		
		//TODO test pListView pareil que pBuilding
		
		map = pMapModel;
		objectListView = pListView;
		delta = pDelta;
		typeDefModels = pDef.copy();
		classView = pBuilding.copy();
		screenRectView = pScreeRectRef;
		//trace("set on " + screenRectView().x);
		screenPosition.set(screenRectView().x, screenRectView().y);
		SAFE_MARGE_MODEL = Math.round(SAFE_MARGE_VIEW / Config.tileHeight);
		SAFE_MARGE_MODEL = Math.round(SAFE_MARGE_VIEW / Config.tileHeight);
	}
	
	/**
	 * Fais le taff
	 */
	public function manage () : Void
	{
		if (!hadToManage()) return;
		
		//Debug.info("Number of Tile : " + Tile.list.length);
		removeObject();
		//Debug.info("Number of Tile after remove : " + Tile.list.length);
		//addAllObjetInView();
		if (clipInX > 10 || clipInY > 10) addAllObjetInView();
		else addObject();
		
		IsoManager.sortAll();
		
		
	}
	
	public function addAllObjetInView():Void {
		setScreenRectModel();
		createObjFromModel(getAllRow());
	}
	
	private function addObject ():Void {
		setScreenRectModel();
		
		var lArray:Array<Dynamic> = new Array<Dynamic> ();
		if (direction == "UP") lArray = getUpRow();
		else if (direction == "DOWN") lArray = getDownRow();
		else if (direction == "LEFT") lArray = getLeftCol();
		else if (direction == "RIGHT") lArray = getRightCol();
		
		createObjFromModel(lArray);
	}
	
	private function createObjFromModel (pArray:Array<Dynamic>): Void
	{
		for (lModel in pArray)
		{
			var i:Int = typeDefModels.length;
			while (--i >= 0)
			{				
				if (Reflect.hasField(lModel, "buildingLevel"))//si c'est un batiments...
				{
					if (modelExist(cast(Building.list), lModel)) continue;
					var buildingDef:BuildingDef = Building.getBuildingDefByName(lModel.name);
					var lObj:IPoolObject = PoolObject.create(Type.resolveClass("com.isartdigital.builder.game.sprites.buildings." + buildingDef.className));
					lObj.init(lModel);
				} else 
				{
					if (modelExist(cast(Tile.list), lModel)) continue;
					var lObj:IPoolObject = PoolObject.create(Tile);
					lObj.init(lModel);
				}
			}
		}
	}
	
	private function modelExist(pList:Array<IPoolObject>, pModel:Dynamic) : Bool {
		for (lObj in pList) {
			if (IsoManager.isoViewToModel(lObj.position).x != Reflect.getProperty(pModel, "x")) continue;
			if (IsoManager.isoViewToModel(lObj.position).y != Reflect.getProperty(pModel, "y")) continue;
			
			return true;
		}
		
		return false;
	}

	private function getAllRow () :Array<Dynamic> {
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		
		var lPosition:Point = new Point();
		
		var it:Float = screenRectModel.height * 2 + 10;
		while (it-- >= 0)
		{
			lPosition.set(BOTTOM_RIGHT.x + 2 - Math.ceil(it/ 2) + it % 2, BOTTOM_RIGHT.y + 2 - Math.ceil(it/ 2));
			
			for (i in 0...cast(screenRectModel.width + 5)) {			
				lArray = lArray.concat(getObjInPosition(map, lPosition));
				shiftHorizontal(lPosition);
			}
		}
		return lArray;
	}
	
	private function getObjInPosition (pMap:Map<Int, Map<Int, Array<Dynamic>>>, pPosition:Point)
	{
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		if (MapManager.getInstance().isElementAtPositionInMap(pMap, Std.int(pPosition.x), Std.int(pPosition.y)))
		{				
			for (lObj in pMap[Std.int(pPosition.x)].get(Std.int(pPosition.y)))
			{
				lArray.push(lObj);
			}
		}
		return lArray;
	}
	
	private function getLeftCol ():Array<Dynamic>
	{
		//marge
		if (clipInX < 2) clipInX = 2;
		
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		
		var lPosition:Point = new Point(BOTTOM_LEFT.x, BOTTOM_LEFT.y);
		
		while (clipInX-- > 0)
		{
			for (i in 0...cast(screenRectModel.height + 5)) {			
				lArray = lArray.concat(getObjInPosition(map, lPosition));
				shiftVertical(lPosition);
			}
			BOTTOM_LEFT.x++;
			lPosition.set(BOTTOM_LEFT.x, BOTTOM_LEFT.y);
		}

		return lArray;
	}
	
	private function getRightCol ():Array<Dynamic>
	{
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		
		var lPosition:Point = new Point(BOTTOM_RIGHT_RIGHT.x, BOTTOM_RIGHT_RIGHT.y);

		while (clipInX-- >= 0)
		{
			for (i in 0...cast(screenRectModel.height + 5)) {			
				lArray = lArray.concat(getObjInPosition(map, lPosition));
				shiftVertical(lPosition);
			}
			BOTTOM_RIGHT_RIGHT.x--;
			lPosition.set(BOTTOM_RIGHT_RIGHT.x, BOTTOM_RIGHT_RIGHT.y);
		}
		
		return lArray;
	}
	
	private function getDownRow ():Array<Dynamic>
	{
		clipInY += 2;
		
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		
		var lPosition:Point = new Point(BOTTOM_RIGHT.x, BOTTOM_RIGHT.y);// + SAFE_MARGE_MODEL;
		
		while (clipInY-- >= 0)
		{
			for (i in 0...cast(screenRectModel.width + 5)) {			
				lArray = lArray.concat(getObjInPosition(map, lPosition));
				shiftHorizontal(lPosition);
			}
			
			BOTTOM_RIGHT.y++;
			lPosition.set(BOTTOM_RIGHT.x, BOTTOM_RIGHT.y);
			//lPosition = (BOTTOM_RIGHT.x + 1 +clipInY % 2) + "," + (BOTTOM_RIGHT.y + clipInY % 2);
		}
		
		return lArray;
	}
	
	private function getUpRow ():Array<Dynamic>
	{
		var lArray:Array<Dynamic> = new Array<Dynamic>();
		
		var lPosition:Point = new Point(TOP_RIGHT.x,TOP_RIGHT.y);
		
		while (clipInY-- >= 0)
		{
			for (i in 0...cast(screenRectModel.width + 5)) {			
				lArray = lArray.concat(getObjInPosition(map, lPosition));
				shiftHorizontal(lPosition);
			}
			TOP_RIGHT.y--;
			lPosition.set(TOP_RIGHT.x, TOP_RIGHT.y);
		}
		
		return lArray;
	}
	
	private function shiftHorizontal (pPoint:Point) : Void
	{
		pPoint.x--;
		pPoint.y++;
	}
	
	private function shiftVertical (pPoint:Point) : Void
	{
		pPoint.x--;
		pPoint.y--;
	}
	
	private function setScreenRectModel ():Void {
		//var lPosition:Point = IsoManager.isoViewToModel(new Point(screenRectView().x - SAFE_MARGE_MODEL, screenRectView().y - SAFE_MARGE_MODEL));
		
		var lPosition:Point = IsoManager.isoViewToModel(new Point(screenRectView().x, screenRectView().y));
		
		//var lSize:Point = new Point(Math.round(screenRectView().width / Config.tileWidth) + SAFE_MARGE_MODEL * 2, Math.round(screenRectView().height / Config.tileWidth) + SAFE_MARGE_MODEL * 2);
		
		var lSize:Point = new Point(Math.round(screenRectView().width / Config.tileWidth), Math.round(screenRectView().height / Config.tileHeight));
		
		screenRectModel = new Rectangle(lPosition.x, lPosition.y, lSize.x, lSize.y);
		
		TOP_RIGHT.set(Math.round(screenRectView().x + screenRectView().width), Math.round(screenRectView().y));
		TOP_RIGHT = IsoManager.isoViewToModel(TOP_RIGHT);
		
		BOTTOM_LEFT.set(Math.round(screenRectView().x - SAFE_MARGE_VIEW * 1.5), Math.round(screenRectView().y + screenRectView().height + SAFE_MARGE_VIEW));
		BOTTOM_LEFT = IsoManager.isoViewToModel(BOTTOM_LEFT);
		
		BOTTOM_RIGHT.set(Math.round(screenRectView().x + screenRectView().width), Math.round(screenRectView().y + screenRectView().height) + SAFE_MARGE_VIEW / 2 );			
		BOTTOM_RIGHT = IsoManager.isoViewToModel(BOTTOM_RIGHT);

		BOTTOM_RIGHT_RIGHT.set(Math.round(screenRectView().x + screenRectView().width + SAFE_MARGE_VIEW * 1.5), Math.round(screenRectView().y + screenRectView().height + SAFE_MARGE_VIEW ));
		BOTTOM_RIGHT_RIGHT = IsoManager.isoViewToModel(BOTTOM_RIGHT_RIGHT);
	}
	
	private function removeObject (): Void
	{
		for (lArray in objectListView)
		{
			removeInList(lArray);
		}
	}
	
	private function removeInList (pList:Array<IPoolObject>):Void
	{
		var i:Int = pList.length;
		while (i-- > 0)
		{
			var lRect:Rectangle = new Rectangle(pList[i].x, pList[i].y, pList[i].width, pList[i].height);
			if (!rectIsInRect(screenRectView(), lRect)) pList[i].remove();
		}
	}
	
	private function rectIsInRect(pBase:Rectangle, pRect:Rectangle) : Bool
	{
		
		if (pBase.contains(pRect.x, pRect.y)) return true;	
		if (pBase.contains(pRect.x, pRect.y + pRect.height)) return true;	
		if (pBase.contains(pRect.x + pRect.width, pRect.y)) return true;	
		if (pBase.contains(pRect.x - pRect.width, pRect.y)) return true;	
		if (pBase.contains(pRect.x, pRect.y - pRect.height)) return true;
		if (pBase.contains(pRect.x, pRect.y + pRect.height)) return true;
		
		
		/*var lPoint:Point = new Point(pBase.x + pBase.width / 2, pBase.y + pBase.height / 2);
		
		trace(distBetween(new Point (pRect.x, pRect.y), lPoint));
		
		return (distBetween(new Point (pRect.x, pRect.y), lPoint) < pBase.width);
		*/
		return false;
	}
	
	private function distBetween(pPointA:Point, pPointB:Point) : Float
	{
		return Math.sqrt(Math.pow(pPointB.x - pPointA.x, 2) - Math.pow(pPointB.y - pPointA.y, 2));
	}
	
	/**
	 * Renvoie true si le dernier manage était assez loin
	 * @return
	 */
	private function hadToManage () : Bool
	{
		currentScreenPosition.set(screenRectView().x, screenRectView().y);
		
		if (Math.abs(currentScreenPosition.x - screenPosition.x) > delta.x)
		{
			direction = currentScreenPosition.x - screenPosition.x > 0 ? "RIGHT" : "LEFT";
			clipInX = Math.ceil(Math.abs(currentScreenPosition.x - screenPosition.x) / delta.x);
			screenPosition.x = screenRectView().x;
			return true;
		}
		
		if (Math.abs(currentScreenPosition.y - screenPosition.y) > delta.y)
		{
			direction = currentScreenPosition.y - screenPosition.y > 0 ? "DOWN" : "UP";
			clipInY = Math.ceil(Math.abs(currentScreenPosition.y - screenPosition.y) / delta.y);
			screenPosition.y = screenRectView().y;
			return true;
		}
		
		return false;
		
	}
}