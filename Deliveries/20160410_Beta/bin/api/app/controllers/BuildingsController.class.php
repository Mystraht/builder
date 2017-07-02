<?php
include_once('ApplicationController.class.php');

class BuildingsController extends ApplicationController
{
	public static $buildingsName = ["bar",
									"big_flower_pot",
									"brothel",
									"cantina",
									"church",
									"city_hall",
									"floating_flower",
									"gift_shop",
									"harbor",
									"house",
									"main_square",
									"park",
									"pyrotechnician",
									"statue",								
									"motel",
									"temple",
									"rocket_factory"];

	public function __construct()
	{
		
	}
	
	public function index($params)
	{	
		$userId = self::getUserIdByToken($params['token']);
        if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getBuildings($userId);
		$error = '';

		return json_encode([
			'data' => $data,
			'error' => $error != '',
			'errorCode' => -1,
			'errorMessage' => $error
		]);
	}
	
	public function upgrade($params)
	{	
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		$building = self::getBuildingByPosition(addslashes($params['x']), addslashes($params['y']), $userId);
		$buildingName = BuildingModel::getBuildingNameByTypeId($building['building_type_id']);
		
		$sql = "SELECT *
				FROM building_" . $buildingName . "
				WHERE id = " . $building['building_id'];
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$buildingDetails = $result[0];
		
		$buildingSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$buildingSettings = json_decode($buildingSettings, true);
		
		if (!isset($buildingSettings[$buildingName][$buildingDetails['lvl']])) {
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Ce batiment ne peux pas être upgrade");
		}

		$buildingDefinition = $buildingSettings[$buildingName][$buildingDetails['lvl']];
		
		if (!array_key_exists("lvl", $buildingDetails) || !array_key_exists("upgrade_price", $buildingDefinition))
			return Utils::formatErrorMessage(ERROR_BUILDING, "Ce batiment ne peux pas être upgrade");
		
		$resourceId = ResourcesController::getResourceIdByName($buildingDefinition["resource_upgrade"]);
		
		if (!ResourcesController::spendResource($resourceId, $buildingDefinition["upgrade_price"], $userId))
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enough resource");
			
		$lvl = $buildingDetails['lvl'] + 1;
		
		$constructTime = BuildingModel::getConstructTime($buildingName, $lvl);
		$construct_end = date("Y-m-d H:i:s", strtotime("+" . $constructTime . " minute"));

		$sql = "UPDATE building_users
			SET construct_end_at = '" . $construct_end . "',
			updated_at = NOW()
			WHERE user_id = " . $userId . "
				AND id = " . $building['id'] ;
				
		$result = $GLOBALS['app']['db']->exec($sql);
		
		$sql = "UPDATE building_" . $buildingName . "
			SET lvl = " . $lvl . "
			WHERE id = " . $building['building_id'];
			
		$result = $GLOBALS['app']['db']->exec($sql);
		
		$data = $result;
		
		//ajout de l'xp
		$xpValue = BuildingModel::getXpValue($buildingName, $lvl);
		UsersController::addExperience($xpValue, $userId);
		
		return UserModel::getUserData($userId);
		//return ResourcesController::getResource($userId);
	}
	
	public static function getSettings()
	{
		$buildingSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$j = json_decode($buildingSettings, true);
		return $j;
	}
	
	public function collect($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		//initialisation
		$building = self::getBuildingByPosition(addslashes($params['x']), addslashes($params['y']), $userId);
		$buildingName = BuildingModel::getBuildingNameByTypeId($building['building_type_id']);		
		$settings = self::getSettings();
		$buildingDetails = self::getBuildingDetails($buildingName, $building['building_id'], $userId);
		
		//Vérifie si le batiment est collectable
		if (!array_key_exists("last_recolt_at", $buildingDetails))
			return Utils::formatErrorMessage(ERROR_BUILDING, "Le batiment n'est pas collectable");
	
		//Recupéré le paramétrage
		$buildingJson = $settings[$buildingName];
		if (array_key_exists("1", $settings[$buildingName])) $buildingJson = $settings[$buildingName][$buildingDetails['lvl']];
		
		//recupère la dernière date de recolte
		$dateLastRecolt = $buildingDetails['last_recolt_at'];
		if (strtotime($buildingDetails['last_recolt_at']) < strtotime($building['construct_end_at']))
			$dateLastRecolt = $building['construct_end_at'];
		
		//Récupère le temps en heure
		$hourDetails = BuildingModel::getTimeLeft($dateLastRecolt);
		
		//Calcule du gain de ressource
		$gainPerHour = $buildingJson['production'];
		$maxCapacity = $buildingJson['capacity'];
		$gainResource = $gainPerHour * $hourDetails;

		//récupère dans le .json le resource_boost et le radius
		$resourceMultiplier =  $settings['house']['resource_multiplier'];
		
		//récupère tous les house du joueur	
		$houseID = BuildingModel::getBuildingTypeIdByName('house');
				
		$sql = "SELECT x, y
				FROM building_users
				WHERE user_id =" .$userId. " AND building_type_id = ".$houseID;
		$houses = $GLOBALS['app']['db']->fetchAll($sql);
		
		//savoir si un batiment est dans le radius : AB = \sqrt{(x_B-x_A)^2 + (y_B-y_A)^2}.
		
		//multiplier $gain resource par le %
		$bonusResource = $gainResource * (1 + (count($houses) * $resourceMultiplier));
		$gainResource = $bonusResource > 0 ? $bonusResource : $gainResource;
		
		if ($gainResource > $maxCapacity) $gainResource = $maxCapacity;
		
		if ($gainResource < 1) return ResourcesController::getResource($userId);
			
		$resourceId = ResourcesController::getResourceIdByName($buildingJson['resource_production']);
		
		ResourcesController::addResource($resourceId, $gainResource, $userId);
		
		$sql = "UPDATE building_" . $buildingName . "
			SET last_recolt_at = '" . date("Y-m-d H:i:s") ."'
			WHERE id = " . $buildingDetails['id'] . "
				AND user_id = " . $userId;
		
		$houses = $GLOBALS['app']['db']->exec($sql);
		
		return ResourcesController::getResource($userId);
	}
	
	public function move($params)
	{	
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		if (!self::isValidPosition(addslashes($params['x_end']), addslashes($params['y_end']), $userId))
			return Utils::formatErrorMessage(ERROR_BAD_POSITION, "Cette position est prise ou pas à la portée d'une lanterne");
		
		$building = self::getBuildingByPosition(addslashes($params['x_start']), addslashes($params['y_start']), $userId);

		$sql = "UPDATE building_users
				SET x = " . addslashes($params['x_end']) . ",
					y = " . addslashes($params['y_end']) . ",
					updated_at = NOW() 
				WHERE user_id = " . $userId . "
					AND id = " . $building['id'];
					
		$result = $GLOBALS['app']['db']->exec($sql);
		
		return Utils::successMessage();
	}
	

	public function hardBuild($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		$building = self::getBuildingByPosition(addslashes($params['x']), addslashes($params['y']), $userId);
		$dateNow = date("Y-m-d H:i:s");
		
		if (strtotime($building['construct_end_at']) < strtotime($dateNow))
			return Utils::formatErrorMessage(ERROR_BUILDING_IS_CONSTRUCT, "Batiment déjà construit");
		
		$price =  BuildingModel::getHardPrice(BuildingModel::getTimeLeft($building['construct_end_at']));
		
		$resourceId = ResourcesController::getResourceIdByName("spice");
		
		if (!ResourcesController::spendResource($resourceId, $price, $userId))
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Pas assez de ressource");
		
		$sql = "UPDATE building_users
			SET construct_end_at = NOW()
			WHERE user_id = " . $userId . "
				AND id = " . $building['id'];
				
		$result = $GLOBALS['app']['db']->exec($sql);
		
		return ResourcesController::getResource($userId);
	}
	

	public function changeColor($params)
	{		
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		$building = self::getBuildingByPosition(addslashes($params['x']), addslashes($params['y']), $userId);
		
		$sql = "UPDATE building_users
				SET color = '" . addslashes(strtoupper($params['color'])) . "'
				WHERE user_id = " . $userId . "
					AND id = " . $building['id'];
		
		$result = $GLOBALS['app']['db']->exec($sql);
					
		return Utils::successMessage();
	}

	
	/**
	 *Enlever les elses
	 */
	public function createBuilding($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		if (!self::isValidPosition(addslashes($params['x']), addslashes($params['y']), $userId))
			return Utils::formatErrorMessage(ERROR_BAD_POSITION, "Cette position est prise ou pas à portée d'une lanterne");
		
		if (!BuildingModel::isBuildingExist($params['name']))
			return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Le nom du building est incorrect");

		if (!self::buyBuilding($params['name'], $userId, $params['hard'])) 
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enough gold");
		
			
		//ajout de l'xp
		$xpValue = BuildingModel::getXpValue($params['name'], 1);
		UsersController::addExperience($xpValue, $userId);
			
		$buildingID = BuildingModel::getBuildingTypeIdByName($params['name']);
		
		//echo($result);
		//$result = 0;

		$buildingLevel = 1;
		$constructTime = round(BuildingModel::getConstructTime($params['name']));

		$date = date("Y-m-d H:i:s");
		$dateNow = date("Y-m-d H:i:s", strtotime("+" . $constructTime . " minute", strtotime($date)));

		switch ($params['name']) {
			case 'rocket_factory':
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_rocket_factory VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'temple':
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_temple VALUES (NULL, ?, ?)');
				$request->execute(array($userId, $dateNow));
				break;
			case 'bar':
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_bar VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'brothel':
//				if (!self::getBuildings($buildingID, $userId))
//					return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Building unique déja construit");

				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_brothel VALUES (NULL, ?)');
				$request->execute(array($userId));
				break;
			case 'main_square':
//				if (!self::getBuildings($buildingID, $userId))
//					return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Building unique déja construit");
					
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_main_square VALUES (NULL, ?)');
				$request->execute(array($userId));
				break;
			case 'pyrotechnician':
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_pyrotechnician VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'city_hall':
//				if (!self::getBuildings($buildingID, $userId))
//					return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Building unique déja construit");
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_city_hall VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'church':
//				if (!self::getBuildings($buildingID, $userId))
//					return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Building unique déja construit");
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_church VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'cantina':
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_cantina VALUES (NULL, ?, ?, ?)');
				$request->execute(array($userId, $buildingLevel, $dateNow));
				break;
			case 'gift_shop':
				//if (!self::getBuildings($buildingID, $userId))
				//	return Utils::formatErrorMessage(ERROR_BUILDING_NAME_INCORRECT, "Building unique déja construit");
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_gift_shop VALUES (NULL, ?)');
				$request->execute(array($userId));
				break;
			default:
				$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_' . $params['name']. ' VALUES (NULL, ?)');
				$request->execute(array($userId));
				break;
		}
		
		$building_id = $GLOBALS['app']['db']->lastInsertId();

		$building_type_id = BuildingModel::getBuildingTypeIdByName($params['name']);
		
		$color = "A"; //Les couleurs sont d'une lettres, en uppercase
		$construct_end = date("Y-m-d H:i:s", strtotime("+" . $constructTime . " minute", strtotime($date)));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, 
								$date, 
								$date, 
								$building_type_id, 
								$building_id, 
								addslashes($params['x']), 
								addslashes($params['y']), 
								$construct_end,
								$color));

		return UserModel::getUserData($userId);
	}


	public function destroy($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));
	
		$building = self::getBuildingByPosition($params['x'], $params['y'], $userId);

		$buildingName = BuildingModel::getBuildingNameByTypeId($building['building_type_id']);
		$tableName = "building_" . $buildingName;
		
		$request = $GLOBALS['app']['db']->prepare('DELETE FROM ' . $tableName . ' WHERE id="' . $building['building_id'] . '";');
        $request->execute();

		$request = $GLOBALS['app']['db']->prepare('DELETE FROM building_users WHERE id="' . $building['id'] . '";');
        $request->execute();

		return Utils::successMessage();
	}

	/**
	 * Récupère la liste des buildings
	 * @paran token Token de l'utilisateur
	 */
	public static function getBuildings($userId) {
		$sql = "SELECT b_t.building_name as name, b_u.x, b_u.y, b_u.construct_end_at, b_u.color, b_u.building_id
				FROM building_users AS b_u
				INNER JOIN building_type AS b_t
					ON b_u.building_type_id = b_t.id
				WHERE b_u.user_id = " . $userId;
				
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		$typeId = BuildingModel::getBuildingTypeId();
		
		$typeIdGet = [];
		
		//Récupére toutes les tables a récupérer
		foreach ($result as $row => $rst) {
			if (in_array($result[$row]['name'], $typeIdGet)) continue;
			
			array_push($typeIdGet, $result[$row]['name']);
		}
		
		$buildingTable = array();
		
		foreach ($typeIdGet as $name) {
			$sql = "SELECT *
					FROM building_" . $name . "
					WHERE user_id = " . $userId;
					
			array_push($buildingTable, $GLOBALS['app']['db']->fetchAll($sql));
		}
		
		foreach ($result as $t => $value) {
			foreach ($buildingTable as $buildingTypeId => $rows) {
				if ($value['name'] == $typeIdGet[$buildingTypeId]) {
					foreach($rows as $building)
					{
						if ($value['building_id'] == $building['id']) {
							$result[$t] = (array_merge($value, $building));
							unset($result[$t]["user_id"]);
							unset($result[$t]["id"]);
							unset($result[$t]["building_id"]);
						}
					}
				}
			}
		}
		
		return $result;
	}
	
	/**
	 * Récupéère le details de la ligne d'un batiment
	 * @param id du batiment
	 * @param type du batiment
	 * user_id de l'utilisateur
	*/
	public static function getBuildingDetails($buildingName, $buildingId, $userId)
	{	
		$sql = "SELECT *
				FROM building_" . $buildingName . "
				WHERE user_id = " . $userId . "
					AND id = " . $buildingId;
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		return $result[0];
	}
	
	public static function buyBuilding($buildingName, $userId, $isHardBuilt)
	{
		$buildingSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$buildingSettings = json_decode($buildingSettings, true);
		
		if ($buildingSettings[$buildingName] == null) echo 'DEBUG : Le nom du building nest pas present dans buildingsSettings.json';

		if (array_key_exists("1", $buildingSettings[$buildingName])) $building = $buildingSettings[$buildingName]["1"];
		else $building = $buildingSettings[$buildingName];
		
		if ($isHardBuilt==='true') {
			$resourceId = ResourcesController::getResourceIdByName('spice');
			$buildingPrice = $building['hard_price'];
		} else {
			$resourceId = ResourcesController::getResourceIdByName($building['resource_price']);
			$buildingPrice = $building['price'];
		}


		
		return ResourcesController::spendResource($resourceId, $buildingPrice, $userId);
	}


	/*
	 * Récupère la ligne d'un building grace à sa position dans le model
	 * @param x podition en x du building
	 * @param y podition en y du building
	 * @param userId le user id du batiment
	 */
	public static function getBuildingByPosition($x, $y, $userId) {
		$sql = "SELECT *
		FROM building_users
		WHERE x = '" . $x . "' 
			AND y = '" . $y . "'
			AND user_id = " . $userId;
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0];
	}
	
	
	public static function isValidPosition($x, $y, $userId)
	{
		$buildingsSettings = BuildingsController::getSettings();
	
		//pour le debug
		$sql = "SELECT id
				FROM building_users
				WHERE user_id = " . $userId . "
					AND x = " . $x . "
					AND y = " . $y;
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		if(count($result) != 0) return false;
		
		$lanterns = LanternsController::getLanterns($userId);

		foreach($lanterns as $lantern) {
			if (sqrt(pow($lantern['x'] - $x, 2) + pow($lantern['y'] - $y, 2)) < $buildingsSettings["lanterns"]["action_radius"]) return true;
		}

		return false;
	}
}
