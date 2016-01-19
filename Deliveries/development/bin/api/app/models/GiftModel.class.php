<?php
include_once('ApplicationModel.class.php');

class GiftModel extends ApplicationModel
{

    public function __construct()
    {
        
    }

    public function validate($params, $type) {
        $errorMessage = '';

        $errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");

        if ($type == "create") {
            $errorMessage .= $this->isPresent($params, 'friend_user_id', "Le friend user id est absent\n");
        }
		
		if ($type == "collect") {
			$errorMessage .= $this->isPresent($params, 'name', "Le nom du cadeau est absent");
			$errorMessage .= $this->isPresent($params, 'author_name', "Le nom du donnateur est absent");
		}
        
        return $errorMessage;
    }
}
