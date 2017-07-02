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
		$dateDailyreward = date("Y-m-d H:i:s", strtotime("- 9999 hour"));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO users VALUES (NULL, ?, ?, ?, NULL, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($date, $date, $params['username'], addslashes($params['mail']), 1, addslashes($params['token']), 0, $dateDailyreward, false, $date));

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


		if ($shopItem['resource_price'] == 'cash') {
			ResourcesController::addResource($resourceProduct, $product, $userId);;
			return ResourcesController::getResource($userId);
		}

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

		$data = self::isDailyrewardAvailable($userId);

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
		$SQLftue = "SELECT ftue_complet FROM users WHERE id = '" . $userId . "'";

		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$resultFtue = $GLOBALS['app']['db']->fetchAll($SQLftue);

		$lastDailyrewardUsedAt = $result[0]['last_dailyreward_used_at'];

		$lastDailyrewardUsedAt = new DateTime($lastDailyrewardUsedAt);
		$now = new DateTime();

		if ($lastDailyrewardUsedAt->format('d') != $now->format('d') || ($now->getTimestamp() - $lastDailyrewardUsedAt->getTimestamp()) >= 86400 || $resultFtue[0]['ftue_complet'] == 0) {
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
		
		$totalBonusCollect = $params['bonusPesos'] + $params['bonusPimientos'] + $params['bonusOffering'];
		
		$lanternSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$lanternSettings = json_decode($lanternSettings, true);
		$lanternSettings = $lanternSettings["lanterns"];
		
		$lanterns = LanternsController::getLanterns($userId);
		$maxBonus = (pow($lanternSettings['action_radius'], 2) * 3.14) * count($lanterns);
		
		if ($totalBonusCollect > $maxBonus) 
			return Utils::formatErrorMessage(ERROR_PARADE_TOO_MANY_BONUS, "Too many bonus collect in the parade Bonus " . $totalBonusCollect . " MaxBonus " . $maxBonus);
		
		$params['hardPurchase'] = $params['hardPurchase'] == 'true';
		
		$offeringResourceId = ResourcesController::getResourceIdByName("offering");
		$goldResourceId = ResourcesController::getResourceIdByName("gold");
		$spiceResourceId = ResourcesController::getResourceIdByName("spice");
		
		
		if ($params['hardPurchase']) {
			if (!ResourcesController::spendResource($spiceResourceId, $this->getParadePrice(true, $userId), $userId))
				return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enought hard currency"); 
		} else {
			if (!ResourcesController::spendResource($goldResourceId, $this->getParadePrice(false, $userId), $userId))
				return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enought soft currency"); 
		}
		
		$params['useHardInParade'] = $params['useHardInParade'] == 'true';
		
		if ($params['useHardInParade']) {
			if (!ResourcesController::spendResource($spiceResourceId, $this->getMoreParadePrice(), $userId))
				return Utils::formatErrorMessage(ERROR_NO_MONEY, "Not enought hard currency to use hard during parade"); 
		}
		
		$quality = $this->getBonusQuality($userId);
		
		$goldToAdd = $params['bonusPesos'] * $this->getBonusValue('pesos', $quality);
		$spiceToAdd = $params['bonusPimientos'] * $this->getBonusValue('pimientos', $quality);
		$offeringToAdd = $params['bonusOffering'] * $this->getBonusValue('offerings', $quality);
		
		ResourcesController::addResource($offeringResourceId, $offeringToAdd, $userId);
		ResourcesController::addResource($goldResourceId, $goldToAdd, $userId);
		ResourcesController::addResource($spiceResourceId, $spiceToAdd, $userId);
		
		ResourcesController::addResource($offeringResourceId, $this->getParadeDefaultGain($userId), $userId);
		
		//Update last parade
		$sql = "UPDATE users
				SET last_parade_at = NOW()
				WHERE id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->exec($sql);
		
		return ResourcesController::getResource($userId);
	}
	
	public function getParadeDefaultGain ($userId) {
		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);
		
		$sql = "SELECT lvl FROM building_city_hall WHERE user_id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$mainBuildingLevel = $result[0]["lvl"];
		
		$mainBuildingLevel = ceil($mainBuildingLevel / 5) * 5;
		
		return $paradeSettings["main_building"][strval($mainBuildingLevel)]["default_gain"];
	}
	
	public function getBonusQuality ($userId) {
		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);
		
		$sql = "SELECT * FROM building_city_hall WHERE user_id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$mainBuildingLevel = $result[0]["lvl"];
		
		$mainBuildingLevel = ceil($mainBuildingLevel / 10) * 10;
		
		return $paradeSettings["bonus_quality"][strval($mainBuildingLevel)];
	}
	
	public function getBonusValue ($bonusName, $quality) {
		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);
		
		$baseValue = $paradeSettings["base_value"][$bonusName];
		
		return round($baseValue * $quality, 1);
	}
	
	/**
	 * Recupère le prix pour augmenter le temps d'une parade
	*/
	public function getMoreParadePrice () {
		return 3;
	}
	
	/**
	 * Recupère le prix d'une parade
	 * @param hard
	*/
	public function getParadePrice ($hard, $userId) {
		$paradeSettings = file_get_contents(__DIR__ . "./../../../assets/json/paradeSettings.json", FILE_USE_INCLUDE_PATH);
		$paradeSettings = json_decode($paradeSettings, true);
		
		$sql = "SELECT lvl FROM building_city_hall WHERE user_id = '" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		$mainBuildingLevel = $result[0]["lvl"];
		
		$mainBuildingLevel = ceil($mainBuildingLevel / 5) * 5;
		
		$paradeSettingsInCurrentLevel = $paradeSettings["main_building"][strval($mainBuildingLevel)];
		
		if ($hard) return $paradeSettingsInCurrentLevel["price_hard"];
		else return $paradeSettingsInCurrentLevel["price_soft"];
		
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
	
	public static function addExperience($experienceToAdd, $userId) {		
		$currentExperience = self::getExperience($userId);
		
		$currentLevel = self::getCurrentLevel($currentExperience);
		
		$levelMultiplicator = self::getLevelMultiplicator($currentExperience);
		
		for ($i = 0; $i < $levelMultiplicator - 1; $i++) $experienceToAdd *= 2;
		
		$newExperience = $currentExperience + $experienceToAdd;
		
		$sql = "UPDATE users
				SET experience = " . $newExperience . ",
				updated_at = NOW()
				WHERE id = '" . $userId . "'";			
			
		$result = $GLOBALS['app']['db']->exec($sql);
		
		$newCurrentLevel = self::getCurrentLevel($newExperience);
		
		if ($newCurrentLevel > $currentLevel) self::addGiftLevelReward($userId, $newCurrentLevel);
		
		//self::addGiftLevelReward($userId, $newCurrentLevel);
	}
	
	private static function addGiftLevelReward ($userId, $level)
	{
		$levelRewardSettings = file_get_contents(__DIR__ . "./../../../assets/json/levelReward.json", FILE_USE_INCLUDE_PATH);
		$levelRewardSettings = json_decode($levelRewardSettings, true);
		$levelRewardSettings = $levelRewardSettings[$level];
		
		$resourceId = ResourcesController::getResourceIdByName("gold");
		ResourcesController::addResource($resourceId, $levelRewardSettings["gold"], $userId);
		
		$resourceId = ResourcesController::getResourceIdByName("spice");
		ResourcesController::addResource($resourceId, $levelRewardSettings["pimientos"], $userId);
		
	}

	private static function getLevelMultiplicator ($currentExperience) {
		$xpSettings = file_get_contents(__DIR__ . "./../../../assets/json/XP.json", FILE_USE_INCLUDE_PATH);
		$xpSettings = json_decode($xpSettings, true);
		$xpSettings = $xpSettings["levels"];
		
		for ($i = 0; $i < count($xpSettings); $i++) {
			if ($xpSettings[$i] > $currentExperience) return ceil($i / 10);
		}
		
		return 10;
	}
	
	private static function getCurrentLevel ($currentExperience) {
		$xpSettings = file_get_contents(__DIR__ . "./../../../assets/json/XP.json", FILE_USE_INCLUDE_PATH);
		$xpSettings = json_decode($xpSettings, true);
		$xpSettings = $xpSettings["levels"];
		
		for ($i = 0; $i < count($xpSettings); $i++) {
			if ($xpSettings[$i] > $currentExperience) return $i;
		}
		
		return 100;
	}

	public function destroy($params)
	{
		$userId = self::getUserIdByToken(addslashes($params['token']));

		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$request = $GLOBALS['app']['db']->prepare('DELETE FROM building_users WHERE user_id="' . $userId . '";');
		$request->execute();

		$request = $GLOBALS['app']['db']->prepare('DELETE FROM lantern_users WHERE user_id="' . $userId . '";');
		$request->execute();

		$request = $GLOBALS['app']['db']->prepare('DELETE FROM resource_users WHERE user_id="' . $userId . '";');
		$request->execute();

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
		$date = date("Y-m-d H:i:s", strtotime("- 9999 hour"));
		$lvl = 1;
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_city_hall VALUES (NULL, ?, ?, ?)');
		$request->execute(array($userId, $lvl, $date));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 14, $GLOBALS['app']['db']->lastInsertId(), 47, 49, $date, 'A'));

		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_main_square VALUES (NULL, ?)');
		$request->execute(array($userId));
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO building_users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 8, $GLOBALS['app']['db']->lastInsertId(), 50, 55, $date, 'A'));
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO lantern_users VALUES (NULL, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, 50, 50));
	}

}
