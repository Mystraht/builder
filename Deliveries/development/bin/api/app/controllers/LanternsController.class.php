<?php
include_once('ApplicationController.class.php');

class LanternsController extends ApplicationController
{
	public function __construct()
	{
		//test
	}

	public function index($params)
	{
		$userId = self::getUserIdByToken($params['token']);
		
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		$data = self::getLanterns($userId);

		return json_encode([
			'data' => $data,
			'error' => false,
			'errorCode' => -1,
			'errorMessage' => ''
		]);
	}

	public function create($params)
	{
		$userId = self::getUserIdByToken($params['token']);
		$x = $params['x'];
		$y = $params['y'];
		
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");   

		if (!self::isValidLanternPosition($x, $y)) return Utils::formatErrorMessage(ERROR_BAD_LANTERN_POSITION, "Bad lantern position");
		
		$sql = "SELECT id FROM lantern_users WHERE x = '" . $x . "' AND y ='" . $y . "' AND user_id ='" . $userId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);

		if ($result) return Utils::formatErrorMessage(ERROR_LANTERN_ALREADY_EXISTS, "The lantern you try to create already exists"); 
		
		$settings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$settings = json_decode($settings, true);
		
		$lanternsSettings = $settings['lanterns'];
		
		$resourceId = ResourcesController::getResourceIdByName($params['hard'] === 'true' ? 'spice' : $lanternsSettings['resource_price']);
		
		$count = ($params['hard'] === 'true') ? $lanternsSettings['hard_price'] : $lanternsSettings['price'];
		$number = count(self::getLanterns($userId));

		$count *= $number;

		$count += ($params['hard'] === 'true') ? $lanternsSettings['base_hard_price'] : $lanternsSettings['base_price'];

		if (!ResourcesController::spendResource($resourceId, $count, $userId))
			return Utils::formatErrorMessage(ERROR_NO_MONEY, "Pas assez de resources pour cette item");
			
		$date = date("Y-m-d H:i:s");
		
		$request = $GLOBALS['app']['db']->prepare('INSERT INTO lantern_users VALUES (NULL, ?, ?, ?, ?, ?)');
		$request->execute(array($userId, $date, $date, $x, $y));

		return ResourcesController::getResource($userId);
	}

	/**
	 * Récupère la liste des lanterns du joueurs
	 */
	public static function getLanterns($userId) {
		$sql = "SELECT x, y 
				FROM lantern_users
				WHERE user_id = '" . $userId . "'";
				
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result;
	}

	/**
	 * Verifie si la lantern est à une position valide
	 * @param x position en x de la lanterne
	 * @param y position en y de la lanterne
	 */
	public static function isValidLanternPosition($x, $y) {
		$lanternsPlacement = file_get_contents(__DIR__ . "./../../../assets/json/lanternsPlacement.json", FILE_USE_INCLUDE_PATH);
        $lanternsPlacement = json_decode($lanternsPlacement, true);

        for ($i=0; $i < count($lanternsPlacement); $i++) { 
			if ($lanternsPlacement[$i]['x'] == $x && $lanternsPlacement[$i]['y'] == $y) {
				return true;
			}
        }
        return false;
	}

}
