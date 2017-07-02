<?php
include_once('ApplicationModel.class.php');

class ResourceModel extends ApplicationModel
{

    public function __construct()
    {
        
    }

    public function validate($params) {
        $errorMessage = '';
		$errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");
        
        return $errorMessage;
    }
}
