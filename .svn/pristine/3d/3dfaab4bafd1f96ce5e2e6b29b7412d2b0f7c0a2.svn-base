<?php
include_once('ApplicationController.class.php');

class GiftsController extends ApplicationController
{
    public function __construct()
    {
        
    }

    public function index($params)
    {
        $userId = self::getUserIdByToken($params['token']);
        if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad Token");
        
        return json_encode([
            'data' => self::getGifts($userId),
            'error' => false,
            'errorCode' => -1,
            'errorMessage' => ''
        ]);
    }
	
	public function collect ($params)
	{
	    $userId = self::getUserIdByToken($params['token']);
        if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad Token");
		
		$sql = "SELECT id
				FROM users
				WHERE username = '" . $params['author_name'] . "'";
				
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		echo($result);
		
		if (count($result) == 0) 
			return Utils::formatErrorMessage(ERROR_BAD_USERNAME, "Bad username");
			
		$author_id = $result[0]['id'];
		
		$gifts = file_get_contents(__DIR__ . "./../../../assets/json/giftsSettings.json", FILE_USE_INCLUDE_PATH);
		$gifts = json_decode($gifts, true);
		   
		$sql = "UPDATE gift_users
				SET is_collected = true
				WHERE user_id = " . $userId ."
                    AND author_users_id = " .$author_id."
					AND name = '".$params['name']."'
					AND is_collected = false
					LIMIT 1";
				
		$result = $GLOBALS['app']['db']->exec($sql);
		
		if ($result == 0) 
			return Utils::formatErrorMessage(ERROR_NO_GIFT, "No gifts");
			
		if (!array_key_exists($params['name'], $gifts))
			return Utils::formatErrorMessage(ERROR_BAD_GIFTS, "Bad gift name");
			
		$gifts = $gifts[$params['name']];
		
		$resourceId = ResourcesController::getResourceIdByName($gifts['resource_name']);
		
		ResourcesController::addResource($resourceId, $gifts['resource_amount'], $userId);
		
		return ResourcesController::getResource($userId);
	}

    public function create($params)
    {
        $userId = self::getUserIdByToken($params['token']);
        $friendId = $params['friend_user_id'];
		
        if (!$userId) return Utils::formatErrorMessage(ERROR_BAD_TOKEN, "Bad Token");
        
        if ($userId == $friendId)
            return Utils::formatErrorMessage(ERROR_SAME_ID, "UserId et friend_user_id identiques");
        
		$sql = "SELECT id FROM users WHERE id = '" . $friendId . "'";
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		if (count($result) == 0) {
			return Utils::formatErrorMessage(ERROR_BAD_FRIEND_ID, "Bad friend id"); 
		}
			
			
        $sql = "SELECT name
                FROM gift_users
                WHERE created_at BETWEEN 
                        DATE_SUB(NOW(), INTERVAL 1 DAY)
                        AND NOW()
                    AND user_id = " . $params['friend_user_id'] ."
                    AND author_users_id = " . $userId;
        
        $result = $GLOBALS['app']['db']->fetchAll($sql);
		
        if (count($result) > 0)
            return Utils::formatErrorMessage(ERROR_NO_GIFT, 'Cadeau offert il y a moins de 24h');
		
        $name = UserModel::generateGifts();
        
        $date = date("Y-m-d H:i:s");
        $request = $GLOBALS['app']['db']->prepare('INSERT INTO gift_users VALUES (NULL, ?, ?, ?, ?, ?, ?)');
        $request->execute(array($params['friend_user_id'], $date, $date, $name, false, $userId));
        
        return Utils::successMessage();
    }

    public static function getGifts($userId)
    {
        $sql = "SELECT g_u.name, u.username
                FROM gift_users AS g_u
                INNER JOIN users AS u
                    ON u.id = g_u.author_users_id
                WHERE user_id = " . $userId;
        
        $result = $GLOBALS['app']['db']->fetchAll($sql);
        
        return $result;
    }
}
