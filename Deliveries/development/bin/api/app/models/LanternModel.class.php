<?php
include_once('ApplicationModel.class.php');

class LanternModel extends ApplicationModel
{

    public function __construct()
    {
        
    }

    public function validate($params, $type) {
        $errorMessage = '';
        $errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");
        
        if ($type == 'create') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
            $errorMessage .= $this->isPresent($params, 'hard', "La valeur hard est absente\n");			
        }
        
        return $errorMessage;
    }
	
	private function toBoolean($param)
	{
		return $param === 'true'? true: false;
	}
}
