<?php
include_once('ApplicationModel.class.php');

class {{CLASS_NAME}} extends ApplicationModel
{

    public function __construct()
    {
        
    }

    public function validate($params, $type) {
        $errorMessage = '';

        if ($type == 'create') {
            // Tester les paramètres ici si ils match bien au model
        }

        if ($type == 'update') {
            // Tester les paramètres ici si ils match bien au model
        }

        if ($type == 'destroy') {
            // Tester les paramètres ici si ils match bien au model
        }
        
        return $errorMessage;
    }
}
