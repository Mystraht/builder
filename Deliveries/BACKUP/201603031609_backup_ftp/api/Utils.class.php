<?php

class Utils
{
    // Faire une fonction qui met à jours created_at et updated_at
    public function __construct()
    {
         //
    }

    public static function formatErrorMessage($errorCode, $errorMessage) {
        return json_encode([
                'data' => '',
                'error' => true,
                'errorCode' => $errorCode,
                'errorMessage' => $errorMessage
            ]);
    }

    public static function successMessage() {
        return json_encode([
                'data' => 'success',
                'error' => false,
                'errorCode' => -1,
                'errorMessage' => ''
            ]);
    }

    public static function defineErrors() {
        define("ERROR_BAD_TOKEN", 1);
        define("ERROR_BAD_MODEL", 2);
        define("ERROR_NO_MONEY", 3);
        define("ERROR_BUILDING", 4);
        define("ERROR_BAD_POSITION", 5);
        define("ERROR_BUILDING_IS_CONSTRUCT", 6);
        define("ERROR_BAD_LANTERN_POSITION", 7);
        //define("ERROR_PARADE_ALREADY_LAUNCH", 8);
        define("ERROR_BUILDING_NAME_INCORRECT", 9);
		define("ERROR_BONUS_SENT_TOO_BIG", 10);
		define("ERROR_BAD_TRANSACTION_NAME", 11);
        define("ERROR_SAME_ID", 12);
		define("ERROR_PARADE_ALREADY_LAUNCH", 13);
        define("ERROR_NO_GIFT", 14);
		define("ERROR_DAILYREWARD_ALREADY_GOT", 15);
		define("ERROR_BAD_USERNAME", 16);
		define("ERROR_BAD_GIFTS", 17);
		define("ERROR_LANTERN_ALREADY_EXISTS", 18);
		define("ERROR_BAD_FRIEND_ID", 19);
		define("ERROR_BUILDING_ALREADY_EXISTS", 20);
    }
}
