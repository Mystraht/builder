package com.isartdigital.builder.game.map;

import com.isartdigital.builder.game.sprites.buildings.Building;
import com.isartdigital.builder.game.map.GMapCreatorBackground;
import pixi.core.math.Point;
import com.isartdigital.builder.game.sprites.Tile;
import com.isartdigital.builder.game.sprites.buildings.BuildingDefinition;
import com.isartdigital.builder.game.def.LanternDef;
import com.isartdigital.builder.game.utils.TypeDefUtils;
import com.isartdigital.builder.game.type.JsonNames;
import com.isartdigital.utils.loader.GameLoader;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingDef;
import com.isartdigital.builder.game.sprites.buildings.def.BuildingModelDef;
import com.isartdigital.services.Users;
import com.isartdigital.builder.game.map.GMap;
import com.isartdigital.builder.game.type.ModelElementNames;
import com.isartdigital.utils.Config;
import com.isartdigital.builder.game.def.TileModelDef;

class GMapCreator {
    /**
	 * Charge la map à partir du User.info récupéré sur le serveur
	 * @return Success ou fail
	 */
    public static function create():Void {
        GMapCreatorBackground.insertBackgroundsInto(GMap.globalMap);
        insertTilesInto(GMap.globalMap);
        insertLanternsInto(GMap.globalMap);
        illuminateLanterns();
        insertBuildingsInto(GMap.globalMap);
    }

    /**
	 * Insert les tiles dans la map passé en paramètre
	 * @param	map<Map<Int<Array<Dynamic>>>
	 */
    private static function insertTilesInto(map:Map<Int, Map<Int, Array<Dynamic>>>):Void {
        var tilePosition:String;
        var tileModel:TileModelDef;

        for (i in 0...Config.mapSize) {
            for (j in 0...Config.mapSize) {
                tileModel = {
                    type: ModelElementNames.TILE,
                    x: i,
                    y: j,
                    isBuildable: false,
                    isIlluminated: false,
                    alpha: 1
                };

                if (!GMap.isPositionExistAt(new Point(j, i), map)) {
                    if (!map.exists(i)) {
                        map[i] = new Map<Int, Array<Dynamic>> ();
                    }
                    map[i][j] = new Array<Dynamic>();
                }

                map[i][j].push(tileModel);
            }
        }
    }

    /**
	 * Insert les building dans la map passé en paramètre
	 * @param	map<MapManagerTest<Int<Array<Dynamic>>>
	 */
    private static function insertBuildingsInto(map:Map<Int, Map<Int, Array<Dynamic>>>):Void {
        var buildings = Users.infos.buildings;
        var buildingModel:BuildingModelDef;
        var buildingDef:BuildingDef;
		
        for (i in 0...buildings.length) {
            buildingModel = buildings[i];
			buildingDef = BuildingDefinition.getByName(buildingModel.name);
            buildingModel.type = ModelElementNames.BUILDING;
            buildingModel.lvl = buildingModel.lvl == null ? 0 : buildingModel.lvl - 1;
            buildingModel.x = Std.int(buildingModel.x);
            buildingModel.y = Std.int(buildingModel.y);

            if (GMap.isPositionExistAt(new Point(buildingModel.x, buildingModel.y), map)) {
                Building.buildingsModel.push(buildingModel);
				GMap.addElementsBySizeAt(new Point(buildingModel.x, buildingModel.y), buildingDef.size, buildingModel);
            }
        }
    }

    /**
	 * Insert les lanterns dans la map passé en paramètre
	 * @param	map<MapManagerTest<Int<Array<Dynamic>>>
	 */
    private static function insertLanternsInto(map:Map<Int, Map<Int, Array<Dynamic>>>):Void {
        var lanterns:Array<Point> = cast GameLoader.getContent(JsonNames.LANTERN_PLACEMENT);
        var lanternPosition:Point;
        var buildingModel:BuildingModelDef;

        for (i in 0...lanterns.length) {
            lanternPosition = lanterns[i];
            buildingModel =  cast TypeDefUtils.cloneObject(TypeDefUtils.buildingModelDef);
            buildingModel.name = "lanterns";
            buildingModel.type = ModelElementNames.BUILDING;
            buildingModel.x = Std.int(lanternPosition.x);
            buildingModel.y = Std.int(lanternPosition.y);
            buildingModel.lvl = isLanternActiveAt(lanternPosition) ? 1 : 0;

            if (GMap.isPositionExistAt(new Point(buildingModel.x, buildingModel.y), map)) {
                map[buildingModel.x][buildingModel.y].push(buildingModel);
            }
        }
    }

    /**
	 * Illumine toutes les lanterns
	 */
    public static function illuminateLanterns():Void {
        var lanterns:Array<Point> = cast GameLoader.getContent(JsonNames.LANTERN_PLACEMENT);
        var lanternPosition:Point;

        for (i in 0...lanterns.length) {
            lanternPosition = lanterns[i];
            if (isLanternActiveAt(lanternPosition)) {
                Tile.illumineTileInRadiusAt(lanternPosition, Tile.getLanternActionRadius());
            }
        }
    }

    /**
	 * Permet de savoir si une lanterne est active à un endroit donnée
	 * @param	position
	 * @return
	 */
    private static function isLanternActiveAt(position:Point):Bool {
        var lanterns:Array<LanternDef>;
        var lantern:LanternDef;

        lanterns = Users.infos.lanterns;

        for (i in 0...lanterns.length) {
            lantern = lanterns[i];
            if (lantern.x == position.x  && lantern.y == position.y) {
                return true;
            }
        }

        return false;
    }
}
