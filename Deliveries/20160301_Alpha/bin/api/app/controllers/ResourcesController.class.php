<?php
include_once('ApplicationController.class.php');
include_once('BuildingsController.class.php');

class ResourcesController extends ApplicationController
{
	public function __construct()
	{
		
	}
	
	public function index($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		return self::getResource($userId);
	}
	
	public function gold($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		return self::getResource($userId, 'gold');
	}
	
	public function offering($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		return self::getResource($userId, 'offering');
	}
	
	public function spice($params) {
		$userId = self::getUserIdByToken(addslashes($params['token']));
		if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad token");

		return self::getResource($userId, 'spice');
	}
	
	public static function getResource($userId, $resourceName = '')
	{
		$data;
		$error = '';
		$sql = "SELECT r_t.name, r_u.count 
				FROM resource_users AS r_u 
				INNER JOIN resource_type AS r_t
				ON r_t.id = r_u.resource_type_id
				WHERE r_u.user_id = " . $userId;
				
		if ($resourceName != '') $sql .= " AND r_t.name = '" . $resourceName . "'";
		
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		if (count($result) <= 0) $error = "Imposible de récupérer la ressource " . $resourceName . " pour le userId : " . $userId;
		else {
			for ($i = 0; $i < count($result); $i++) {
				if ($resourceName == '') $data[$result[$i]['name']] = $result[$i]['count'];
				else $data = $result[0]['count'];
			}
		}
		
		return json_encode([
			'data' => $data,
			'error' => $error != '',
			'errorCode' => -1,
			'errorMessage' => $error
		]);
	}
	
	public static function getResourceIdByName($resourceName)
	{
		$sql = "SELECT id
				FROM resource_type
				WHERE name = '" . $resourceName . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result['0']['id'];
	}
	
	/*
	 * Ajoute de la resource a un joueur
	 * @param $resourceId l'id de la ressource à modifier
	 * @param $count le nombre de ressource a ajouter
	 * @param $userId l'id de l'utilisateur
	*/
	public static function addResource($resourceId, $count, $userId)
	{
		$sql = "SELECT updated_at, count
			FROM resource_users AS r_u
			INNER JOIN resource_type AS r_t
				ON r_u.resource_type_id = r_t.id
			WHERE r_t.id = " . $resourceId . "
				AND r_u.user_id = " . $userId;
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		$newValue = $result[0]['count'] + $count;
		
		$sql = "UPDATE resource_users
		SET count = " . $newValue . ",
			updated_at = '" . date("Y-m-d H:i:s") . "'
		WHERE user_id = " . $userId . "
			AND resource_type_id = " . $resourceId;
			
		$result = $GLOBALS['app']['db']->exec($sql);
	}
	
	/*
	 * Retire de la resource a un joueur
	 * @param $resourceId l'id de la ressource à modifier
	 * @param $count le nombre de ressource a retirer
	 * @param $userId l'id de l'utilisateur
	 * @return false si le joeuur n'a plus de resource
	*/
	public static function spendResource($resourceId, $count, $userId) 
	{
		$sql = "SELECT updated_at, count
			FROM resource_users AS r_u
			INNER JOIN resource_type AS r_t
				ON r_u.resource_type_id = r_t.id
			WHERE r_t.id = " . $resourceId . "
				AND r_u.user_id = " . $userId;
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		if ($count > $result[0]['count']) return false;
		
		$newValue = $result[0]['count'] - $count;
		
		$sql = "UPDATE resource_users
		SET count = " . $newValue . ",
			updated_at = '" . date("Y-m-d H:i:s") . "'
		WHERE user_id = " . $userId . "
			AND resource_type_id = " . $resourceId;
			
		$result = $GLOBALS['app']['db']->exec($sql);
		
		return true;
	}
	
}
