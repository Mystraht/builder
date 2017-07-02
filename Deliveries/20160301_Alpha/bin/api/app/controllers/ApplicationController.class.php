<?php

class ApplicationController
{
    // Faire une fonction qui met à jours created_at et updated_at
    public function __construct()
    {
        
    }

    public static function getUserIdByToken($token) {
        $sql = "SELECT id FROM users WHERE token='" . $token . "'";
        $result = $GLOBALS['app']['db']->fetchAll($sql);

        if (count($result) == 0) return false;
        else return $result[0]['id'];
    }
}