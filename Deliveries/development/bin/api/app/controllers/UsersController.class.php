<?php
include_once('ApplicationController.class.php');
include_once('BuildingsController.class.php');
include_once('ResourcesController.class.php');
include_once('LanternsController.class.php');

class UsersController extends ApplicationController
{
	public function __construct()
	{
		
	}

	public function index($params)
	{
		$data = [];

		$token = addslashes($params['token']);

		if (!isset($params['friend_user_id'])) {
			$userId = self::getUserIdByToken($params['token']);
			if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		} else {
			$userId = $params['friend_user_id'];
		}

		$buildings = BuildingsController::getBuildings($userId);
		$lanterns = LanternsController::getLanterns($userId);
		$resources = ResourcesController::getResource($userId);
		$gifts = GiftsController::getGifts($userId);
		$username = UserModel::getUsername($userId);
		$parade = self::getParade($userId);
		$dailyreward = self::getDailyreward($userId);
		$experience = self::getExperience($userId);
		$ftue = self::getFtue($userId);

		$resources = json_decode($resources);

		$data['buildings'] = $buildings;
		$data['lanterns'] = $lanterns;
		$data['resources'] = $resources->{'data'};
		$data['gifts'] = $gifts;
		$data['username'] = $username;
		$data['parade'] = $parade;
		$data['dailyreward'] = $dailyreward;
		$data['experience'] = $experience;
		$data['ftue_complet'] = $ftue;

		if ($buildings == ERROR_BAD_TOKEN) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$error = '';
		
		return json_encode([
			'data' => $data,
			'error' => $error != '',
			'errorCode' => -1,
			'errorMessage' => $error
		]);
	}

	public function login($params)
	{
		$data = '';
		$error = '';
		$sql = "SELECT token FROM users WHERE username='" . addslashes($params['username']) . "' AND password='" . addslashes($params['password']) . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);

		if(count($result) == 0) {
			$error = "Le nom d'utilisateur et le mot de passe ne correspondent pas.";
		} else {
			$data = $result[0]['token'];
		}

		return json_encode([
			'data' => $data,
			'error' => $error != '',
			'errorCode' => -1,
			'errorMessage' => $error
		]);
	}

	public function create($params)
	{
		if (!isset($params['email'])) $params['email'] = null;

		$date = date("Y-m-d H:i:s");
		$token = bin2hex(openssl_random_pseudo_bytes(32));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?, NULL, ?, ?, ?, ?, ?)');
		$request->execute(array($date, $date, addslashes($params['username']), addslashes($params['password']), $params['email'], $token, 0, $date, false, $date));

		$userId = $GLOBALS['app']['db']->lastInsertId();
		$this->createUserResources($userId);
		$this->createBasemap($userId);
		
		return json_encode([
			'data' => $token,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public function createFB($params)
	{
		if (!isset($params['mail'])) $params['mail'] = null;

		$date = date("Y-m-d H:i:s");
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO users VALUES (NULL, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($date, $date, $params['username'], addslashes($params['mail']), 1, addslashes($params['token']), 0, $date, false, $date));

		$userId = $GLOBALS['app']['db']->lastInsertId();
		$this->createUserResources($userId);
		$this->createBasemap($userId);
		
		return json_encode([
			'data' => addslashes($params['token']),
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}
	
	public function buy($params)
	{
		$userId = self::getUserIdByToken($params['token']);
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad Token");
		 
		$shop = file_get_contents(__DIR__ . "./../../../assets/json/shopItem.json", FILE_USE_INCLUDE_PATH);
		$shop = json_decode($shop, true);
		
		$shopItem = $shop[$params['name']];
		if (!$shopItem) return Utils::formatErrorMessage(ERROR_BAD_TRANSACTION_NAME, "The shop item name is incorrect");
		
		$resourcePrice = ResourcesController::getResourceIdByName($shopItem['resource_price']);
		$price = $shopItem['price'];

		$resourceProduct = ResourcesController::getResourceIdByName($shopItem['resource_product']);
		$product = $shopItem['product'];
		
		if (ResourcesController::spendResource($resourcePrice, $price, $userId)) {
			ResourcesController::addResource($resourceProduct, $product, $userId);
			return ResourcesController::getResource($userId);
		} else {
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enough " . $shopItem['resource_price']);
		}
	   
	}
	
	public function dailyreward($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getDailyreward($userId);

		return json_encode([
			'data' => $data,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public static function getDailyreward($userId) {
		$sql = "SELECT last_dailyreward_used_at FROM users WHERE id = '" . $userId . "'";
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['last_dailyreward_used_at'];
	}

	public function dailyrewardUpdate($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$isDailyrewardAvailable = self::isDailyrewardAvailable($userId);

		if (!$isDailyrewardAvailable) return Utils::formatErrorMessage(ERROR_DAILYREWARD_ALREADY_GOT, "Daily reward already got");

		$giftsSettings = file_get_contents(__DIR__ . "./../../../assets/json/giftsSettings.json", FILE_USE_INCLUDE_PATH);
		$giftsSettings = json_decode($giftsSettings, true);
		
		$sql = "UPDATE users
				SET last_dailyreward_used_at = NOW()
				WHERE id = '" . $userId . "'";
		
		$GLOBALS['app']['db']->exec($sql);

		$gifts = [];

		for ($i=0; $i < 3; $i++) { 
			array_push($gifts, UserModel::generateGifts());
			$resourceName = $giftsSettings[$gifts[$i]]['resource_name'];
			$resourceAmount = $giftsSettings[$gifts[$i]]['resource_amount'];
			$resourceId = ResourcesController::getResourceIdByName($resourceName);
			ResourcesController::addResource($resourceId, $resourceAmount, $userId);
		}
		
		return json_encode([
			'data' => $gifts,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	/**
	 * Est ce que le dailyreward est disponible ?
	 * Condition pour qu'il soit disponible : La date actuel doit être un nouveau jour
	 */
	public static function isDailyrewardAvailable($userId) {
		$sql = "SELECT last_dailyreward_used_at FROM users WHERE id = '" . $userId . "'";
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$lastDailyrewardUsedAt = $result[0]['last_dailyreward_used_at'];

		$lastDailyrewardUsedAt = new DateTime($lastDailyrewardUsedAt);
		$now = new DateTime();

		if ($lastDailyrewardUsedAt->format('d') != $now->format('d') || ($now->getTimestamp() - $lastDailyrewardUsedAt->getTimestamp()) >= 86400) {
			return true;
		} else {
			return false;
		}
	}

	public function parade($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getParade($userId);

		return json_encode([
			'data' => $data,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public static function getParade($userId) {
		$sql = "SELECT last_parade_at FROM users WHERE id = '" . $userId . "'";
			
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['last_parade_at'];
	}

	public function paradeUpdate($params) {	
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");
		
		$params['hardPurchase'] = $params['hardPurchase'] == 'true';

		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);

		$lanterns = LanternsController::getLanterns($userId);
		$maxBonus = $paradeSettings['generatedBonusCountPerLanterns'] * count($lanterns);
		
		if ($params['bonusHarvested'] > $maxBonus) return Utils::formatErrorMessage(ERROR_BONUS_SENT_TOO_BIG, "Bonus sent is too big");

		$offeringResourceId = ResourcesController::getResourceIdByName("offering");

		if (!$params['hardPurchase']) {
			$sql = "SELECT last_parade_at FROM users WHERE id = '" . $userId . "'";
			
			$result = $GLOBALS['app']['db']->fetchAll($sql);

			$lastParadeAt = new DateTime($result[0]['last_parade_at']);
			$now = new DateTime();

			// Verification de si la parade n'a pas eu lieu aujourd'hui
			if ($lastParadeAt->format('d') != $now->format('d') || ($now->getTimestamp() - $lastParadeAt->getTimestamp()) >= 86400) {
				$sql = "UPDATE users
						SET last_parade_at = NOW()
						WHERE id = '" . $userId . "'";
				
				$result = $GLOBALS['app']['db']->exec($sql);
				$goldGained = $this->convertBonusToGold($params['bonusHarvested'], $paradeSettings, $userId);
				ResourcesController::addResource($offeringResourceId, $goldGained, $userId);
			} else {
				return Utils::formatErrorMessage(ERROR_PARADE_ALREADY_LAUNCH, "Parade already launched today");
			}
		} else {
			$resourceId = ResourcesController::getResourceIdByName("spice");
			if (ResourcesController::spendResource($resourceId, $paradeSettings['paradeHardPrice'], $userId)) {
				$goldGained = $this->convertBonusToGold($params['bonusHarvested'], $paradeSettings, $userId);
				ResourcesController::addResource($offeringResourceId, $goldGained, $userId);
			} else {
				return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enought spice");
			}
		}
		return ResourcesController::getResource($userId);
	}

	/**
	 * Converti les bonus en gold
	 * @param bonusCount
	 * @param paradeSettings
	 */
	private function convertBonusToGold($bonusCount, $paradeSettings, $userId) {
		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);
		$buildingsSettings = BuildingsController::getSettings();
		
		$sql = "SELECT lvl FROM building_city_hall WHERE user_id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$mainBuildingLevel = $result[0]["lvl"];
		
		$goldPerBonus = $paradeSettings['goldPerBonus'] + $paradeSettings['goldPerBonus'] * ($paradeSettings['goldMultiplierByMainBuilding'] * $mainBuildingLevel);
		$goldIncremented = $paradeSettings['goldIncremented'] + $paradeSettings['goldIncremented'] * ($paradeSettings['goldMultiplierByMainBuilding'] * $mainBuildingLevel);
		$gold = $goldPerBonus * $bonusCount;

		$goldIncrementedTotal = 0;

		for ($i=0; $i < $bonusCount; $i++) { 
			$goldIncrementedTotal = ($i + 1) * $goldIncremented;
		}
		
		$sql = "SELECT lvl FROM building_pyrotechnician WHERE user_id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		foreach ($result as $buildingPyrotechnician) {
			$gold += $buildingsSettings['pyrotechnician'][$buildingPyrotechnician['lvl']]['production_per_parade'];
		}
		
		return $gold + $goldIncrementedTotal;
	}

	public function ftue($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getFtue($userId);

		return json_encode([
			'data' => $data,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public static function getFtue($userId) {
		$sql = "SELECT ftue_complet FROM users WHERE id = '" . $userId . "'";
			
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['ftue_complet'];
	}

	public function ftueComplet($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$sql = "UPDATE users
				SET ftue_complet=1
				WHERE id = '" . $userId . "'";
		
		$result = $GLOBALS['app']['db']->exec($sql);
		return Utils::successMessage();
	}

	public function experience($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getExperience($userId);

		return json_encode([
			'data' => $data,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public static function getExperience($userId) {
		$sql = "SELECT experience FROM users WHERE id = '" . $userId . "'";
			
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['experience'];
	}

	public function destroy($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));

		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$request = $GLOBALS['app']['db']->prepare('DELETE FROM users WHERE id="' . $userId . '";');
		$request->execute();


		return json_encode([
			'data' => 'success',
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	private function createUserResources($userId)
	{
		$settingsResources = file_get_contents(__DIR__ . "./../../../assets/json/startResource.json", FILE_USE_INCLUDE_PATH);
		$settingsResources = json_decode($settingsResources);

		$date = date("Y-m-d H:i:s");
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO resource_users VALUES (NULL, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 1, $settingsResources->{"gold"}));
		$request->execute(array($userId, $date, $date, 2, $settingsResources->{"offering"}));
		$request->execute(array($userId, $date, $date, 3, $settingsResources->{"spice"}));
	}


	/**
	 * Créer les batiments de bases pour un utilisateurs
	 */
	private function createBasemap($userId) {
		$date = date("Y-m-d H:i:s");
		$lvl = 1;
		
		$pinataReady = date("Y-m-d H:i:s");
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_temple VALUES (NULL, ?, ?)');
		$request->execute(array($userId, $pinataReady));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 1, $GLOBALS['app']['db']->lastInsertId(), 5, 5, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_pyrotechnician VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 2, $GLOBALS['app']['db']->lastInsertId(), 45, 42, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_bar VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 4, $GLOBALS['app']['db']->lastInsertId(), 2, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_brothel VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 5, $GLOBALS['app']['db']->lastInsertId(), 45, 50, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_rocket_factory VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 6, $GLOBALS['app']['db']->lastInsertId(), 4, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_house VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 7, $GLOBALS['app']['db']->lastInsertId(), 50, 55, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_main_square VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 8, $GLOBALS['app']['db']->lastInsertId(), 6, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_park VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 9, $GLOBALS['app']['db']->lastInsertId(), 58, 58, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_statue VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 10, $GLOBALS['app']['db']->lastInsertId(), 8, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_big_flower_pot VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 11, $GLOBALS['app']['db']->lastInsertId(), 9, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_floating_flower VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 12, $GLOBALS['app']['db']->lastInsertId(),10, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_gift_shop VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 13, $GLOBALS['app']['db']->lastInsertId(), 11, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_city_hall VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 14, $GLOBALS['app']['db']->lastInsertId(), 12, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_church VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 15, $GLOBALS['app']['db']->lastInsertId(), 13, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_cantina VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 16, $GLOBALS['app']['db']->lastInsertId(), 14, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_harbor VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 17, $GLOBALS['app']['db']->lastInsertId(), 15, 0, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_altar VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 18, $GLOBALS['app']['db']->lastInsertId(), 60, 52, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_motel VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 3, $GLOBALS['app']['db']->lastInsertId(), 48, 52, $date, 'A'));
	}

}
