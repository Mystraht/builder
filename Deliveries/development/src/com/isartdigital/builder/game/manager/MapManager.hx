package com.isartdigital.builder.game.manager;
import com.isartdigital.builder.api.Api;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingSavedDef;
import com.isartdigital.builder.game.def.MapSavedDef;
import com.isartdigital.builder.game.def.PointDef;
import com.isartdigital.builder.game.def.SizeDef;
import com.isartdigital.builder.game.def.TileSavedDef;
import com.isartdigital.builder.game.pooling.PoolObject;
import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.sprites.buildings.childrens.Casino;
import com.isartdigital.builder.game.sprites.buildings.childrens.Motel;
import com.isartdigital.builder.game.sprites.buildings.childrens.RocketFactory;
import com.isartdigital.builder.game.sprites.buildings.childrens.Temple;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.services.Users;
import com.isartdigital.utils.Config;
import com.isartdigital.utils.Debug;
import com.isartdigital.utils.game.GameObject;
import com.isartdigital.utils.game.GameStage;
import com.isartdigital.utils.game.iso.IsoManager;
import com.isartdigital.utils.game.iso.IZSortable;
import com.isartdigital.utils.loader.GameLoader;
import haxe.Json;
import js.Browser;
import js.Lib;
import pixi.core.math.Point;


/**
 * ...
 * @author Dorian
 */
class MapManager extends Manager
{
	/**
	 * instance unique de la classe MapManager
	 */
	private static var instance: MapManager;
	
	public var mapSize:Int = 100;
	
	public var globalMap:Map<Int, Map<Int, Array<Dynamic>>> = new Map<Int, Map<Int, Array<Dynamic>>> ();
	
	/**
	 * Retourne l'instance unique de la classe, et la crée si elle n'existait pas au préalable
	 * @return instance unique
	 */
	public static function getInstance (): MapManager {
		if (instance == null) instance = new MapManager();
		return instance;
	}
	
	/**
	 * constructeur privé pour éviter qu'une instance soit créée directement
	 */
	private function new() 
	{
		super();
	}
	
	/**
	 * Génère une nouvelle map de base si il n'y a pas de sauvegarde, sinon charge la sauvegarde
	 * @return Success ou fail
	 */
	public function generateMap():Void {
		var map:MapSavedDef;
		
		loadMap();
	}	

	/**
	 * Permet de savoir si un batiment est construisable à un endroit donnée
	 * @param	Array des tiles concerné (Récupérable grâce à getTilesArray(pPosition:Point, pSize:SizeDef):Array<TileSavedDef>)
	 * @return
	 */
	public function isBuildable(pTiles:Array<TileSavedDef>):Bool {
		var _isBuildable:Bool = true;
		
		if (pTiles == null) return false;
		
		for (i in 0...pTiles.length) {
			if (!pTiles[i].isBuildable) {
				_isBuildable = false;
			}
		}

		return _isBuildable;
	}
	
	
	/**
	 * Récupère un tableau contenant les tiles à une position avec une taille donné
	 * @param	pPosition position de la tile initial
	 * @param	pSize taille
	 * @return Array de tiles ou null si l'array exède les limitation de la map
	 */
	public function getTilesArray(pPosition:Point, pSize:SizeDef):Array<TileSavedDef> {
		var tiles:Array<TileSavedDef> = new Array<TileSavedDef>();
		var xIndex:Int;
		var yIndex:Int;
		
		for (x in 0...pSize.width) {
			for (y in 0...pSize.height) {
				xIndex = Std.int(pPosition.x) - x;
				yIndex = Std.int(pPosition.y) - y;
				
				if (isInsideGrid(xIndex, yIndex)) {
					tiles.push(getTileAtPosition(xIndex, yIndex));
				} else {
					return null;
				}
			}
		}
		
		return tiles;
	}
	
	
	/**
	 * Modifie la propriété isBuildable d'un array de tiles
	 * @param	Array<TileSavedDef>
	 * @param	isBuildable
	 */
	public function setTilesBuildable(tiles:Array<TileSavedDef>, _isBuildable:Bool):Void {
		var mapElements:Array<Dynamic>;
		var tile:TileSavedDef;
		
		for (i in 0...tiles.length) {
			tile = tiles[i];
			mapElements = globalMap[tile.x][tile.y];
			
			if (mapElements != null) {
				for (j in 0...mapElements.length) {
					if (TypeDefUtils.compare(mapElements[j], TypeDefUtils.tileSavedDef)) {
						globalMap[tile.x][tile.y][j].isBuildable = _isBuildable;
					}
				}
			}
		}
	}
	
	
	/**
	 * Récupère un element dans un array grâce à son typeDef
	 * (Hack conseillé par Nicolas Cannasse)
	 * @param	typeDef typeDef de l'element à comparer (Trouvable dans TypeDefUtils) ex : TypeDefUtils.tileSavedDef
	 * @return Renvoie l'element trouvé, si il le trouve pas, rnevoi null
	 */
	public function getElementByTypeDefInArray(elements:Array<Dynamic>, typeDef:Dynamic):Dynamic {
		for (i in 0...elements.length) {
			if (TypeDefUtils.compare(elements[i], typeDef)) return elements[i];
		}
		return null;
	}
	
	
	/**
	 * Test si il y a un element dans la globalMap à la position donné
	 * @param	x
	 * @param	y
	 * @return boolean
	 */
	public function isElementAtPositionInMap(map:Map<Int, Map<Int, Array<Dynamic>>>, x:Int, y:Int):Bool {
		if (map.exists(x)) {
			if (map[x].exists(y)) {
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * Récupère un element dans la global map à une position grâce à un typedef
	 * @param	position de l'element
	 * @param	element à récuperer
	 */
	public function getElementInGlobalMapAt(position:Point, typeDef:Dynamic):Dynamic {
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];
		
		for (i in 0...elements.length) {
			if (TypeDefUtils.compare(elements[i], typeDef)) {
				return elements[i];
			}
		}
		
		throw 'typedef was not found in elements array';
	}
	
	/**
	 * Ajoute un element dans la globalMap grâce à sa position
	 * @param	position dans la map
	 * @param	element à ajouter
	 */
	public function addElementInGlobalMapAt(position:Point, element:Dynamic):Void {
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];
		elements.push(element);
	}
	
	
	/**
	 * Enlève un element de la map grâce à sa position et return l'element enlevé
	 * @param	position dans la map de l'element à enlever
	 * @param	typeDef de l'element à enlever
	 * @return Renvoi l'element enlevé
	 */
	public function removeElementByTypeDefFromGlobalMapAt(position:Point, typeDef:Dynamic):Dynamic {
		var elements:Array<Dynamic> = globalMap[Std.int(position.x)][Std.int(position.y)];
		var elementRemoved:Dynamic;
		
		for (i in 0...elements.length) {
			if (TypeDefUtils.compare(elements[i], typeDef)) {
				elementRemoved = elements.splice(i, 1);
				return elementRemoved[0];
			}
		}
		
		throw 'typedef was not found in elements array';
	}
	
	
	/**
	 * Charge la map sauvegardé
	 * @return Si le chargement de la map a réussi ou non
	 */
	private function loadMap():Bool {
		// Remplissage des tiles de la map dans le containeur de tiles
		var map:MapSavedDef = {
			buildings: Users.infos.buildings
		}
		
		var tilePosition:String;
		var tileSaved:TileSavedDef;
		
		for (i in 0...mapSize) {
			for (j in 0...mapSize) {
				tileSaved = {
					x: i,
					y: j,
					isBuildable: true
				};
				
				if (!isElementAtPositionInMap(globalMap, i, j)) {
					if (!globalMap.exists(i)) {
						globalMap[i] = new Map<Int, Array<Dynamic>> ();
					}
					globalMap[i][j] = new Array<Dynamic>();
				}
				
				globalMap[i][j].push(tileSaved);
			}
		}
		
		// Remplissage des builginds de la map dans le containeur de builginds
		// TODO : Faire en sorte de charger tous les fields specifique à tous les batiments
		var buildingSaved:BuildingSavedDef;
		var buildingDef:BuildingDef;
		
		for (i in 0...map.buildings.length) {
			buildingSaved = map.buildings[i];
			Reflect.deleteField(buildingSaved, 'construct_end_at');
			buildingSaved.buildingLevel = 0;
			buildingSaved.x = Std.int(buildingSaved.x);
			buildingSaved.y = Std.int(buildingSaved.y);
			
			//sécurité si le batiment n'est pas placé sur une Tile
			if (isElementAtPositionInMap(globalMap, buildingSaved.x, buildingSaved.y)) {
				globalMap[buildingSaved.x][buildingSaved.y].push(buildingSaved);
			}
		}
		
		return true;
	}
	
	
	/**
	 * Récupère une tile à la position indiqué
	 * @param pPosition - Position de la grille
	 * @return Tile récupéré
	 */
	private function getTileAtPosition(x:Int, y:Int):TileSavedDef {
		var elements:Array<Dynamic> = new Array();
		
		if (isElementAtPositionInMap(globalMap, x, y)) {
			elements = globalMap[x][y];
		}
		
		return getElementByTypeDefInArray(elements, TypeDefUtils.tileSavedDef);
	}
	
	
	/**
	 * Indique si la position est hors de la grille ou à l'interieur
	 * @return
	 */
	private function isInsideGrid(pX:Int, pY:Int):Bool {
		var lMapManager:MapManager = MapManager.getInstance();
		
		if (pX >= 0 &&
			pY >= 0 &&
			pX < mapSize &&
			pY < mapSize) {
			return true;
		}
		
		return false;
	}
	
	
	/**
	 * /!\ fonction de debuggage
	 * Affiche la position de la tile sous la souris
	 */
	public function displayTilePositionUnderMouse() {
		var lPosition:Point = IsoManager.isoViewToModel(GameManager.getInstance().mousePosition);
		
		if (Math.floor(Math.random() * 25) == 0) trace("x : " + Math.ceil(lPosition.x) + " y : " + Math.ceil(lPosition.y));
	}
	
	
	/**
	 * Hack pour forcer l'exportation des class.
	 * Mettre ici toutes les class non importer sinon cause le bug suivant : Uncaught TypeError: cl is not a function
	 */
	private function importBuildingsClass():Void {
		Motel;
		Casino;
		RocketFactory;
		Temple;
	}
}