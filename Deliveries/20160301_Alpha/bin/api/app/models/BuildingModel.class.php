<?php
include_once('ApplicationModel.class.php');

class BuildingModel extends ApplicationModel
{

    public function __construct()
    {
        
    }

    public function validate($params, $type) {
        $errorMessage = '';
		$errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");
		
        if ($type == 'index') {
			return $errorMessage;
        }

        if ($type == 'create') {
			$errorMessage .= $this->isPresent($params, 'x', "La position X est absent\n");
			$errorMessage .= $this->isPresent($params, 'y', "La position Y est absent\n");
			
			$errorMessage .= $this->isPresent($params, 'hard', "Le parametre hard est absent\n");
			
			return $errorMessage;
        }
	
		if ($type == 'move') {
            $errorMessage .= $this->isPresent($params, 'x_start', "La position x initiale est absente\n");
            $errorMessage .= $this->isPresent($params, 'y_start', "La position X initiale est absente\n");
			$errorMessage .= $this->isPresent($params, 'x_end', "La position x de destination est absente\n");
			$errorMessage .= $this->isPresent($params, 'y_end', "La position y de destination est absente\n");
        
			return $errorMessage;
		}
		
        if ($type == 'destroy') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
        
			return $errorMessage;
        }        
		
		if ($type == 'collect') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
        
			return $errorMessage;
        }		
		
		if ($type == 'upgrade') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
        
			return $errorMessage;
        }			
		
		if ($type == 'hardBuild') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
        
			return $errorMessage;
        }		
		
		if ($type == 'changeColor') {
            $errorMessage .= $this->isPresent($params, 'x', "La position x est absente\n");
            $errorMessage .= $this->isPresent($params, 'y', "La position X est absente\n");
            $errorMessage .= $this->isPresent($params, 'color', "La couleur est absente\n");
            $errorMessage .= $this->isColor($params, 'color', "La couleur a le mauvais format\n");
        
			return $errorMessage;
        }
        
        return $errorMessage;
    }
	
	public function isColor($params, $param, $errorMessage) {
		if (strlen($params[$param]) == 1) return '';
		else return $errorMessage;
	}
	
	/**
	 * Récupère le temps de construction d'un batiment
	 * @param nom du batiment
	 * @lvl du batiment
	*/
	public static function getConstructTime($buildingName, $lvl = 1)
	{
		$buildingSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$buildingSettings = json_decode($buildingSettings, true);
		
		if ($lvl != 1) 
			return $buildingSettings[$buildingName][$lvl]["contruction_time"];
		else if (array_key_exists($lvl, $buildingSettings[$buildingName]))
			return $buildingSettings[$buildingName][$lvl]["contruction_time"];
		else return $buildingSettings[$buildingName]["contruction_time"];
	}
	
	/**
	 * Récupère le temps de construction d'un batiment
	 * @param nom du batiment
	 * @lvl du batiment
	*/
	public static function getHardPrice($timeLeft)
	{
		$buildingSettings = file_get_contents(__DIR__ . "./../../../assets/json/buildingsSettings.json", FILE_USE_INCLUDE_PATH);
		$buildingSettings = json_decode($buildingSettings, true);
		
		$hard_price_max = $buildingSettings["hard_price_max"];
		$max_construct_time = $buildingSettings["max_construct_time"];
		$base_hard_price = $buildingSettings["base_hard_price"];
		
		return ceil(($timeLeft / $max_construct_time) * $hard_price_max + $base_hard_price);
	}
	
	/**
	 * Donne le nombre d'heure entre maintenant et time
	 * @param time
	*/
	public static function getTimeLeft($time)
	{
		$lastUpdate = new DateTime($time);
		$date = new DateTime('now');
		$diff = $lastUpdate->diff($date);
		return $diff->format('%a') * 24 + $diff->format('%h') + $diff->format('%i') / 60 + $diff->format('%s') / 3600;
	}

	/**
	 * Informe si le building existe ou non dans le jeu
	 * @param name Nom du building
	 * @return bool
	 */
	public static function isBuildingExist($name) {
		$buildingsName = BuildingsController::$buildingsName;

		for ($i=0; $i < count($buildingsName) ; $i++) { 
			if ($buildingsName[$i] == $name) {
				return true;
			}
		}

		return false;
	}
	
	/*
	 * Récupère le type_id d'un building
	 * @param buildingName Nom du building (ex: temple)
	 */
	public static function getBuildingTypeIdByName($buildingName)
	{
		$sql = "SELECT id 
		FROM building_type
		WHERE building_name = '" . $buildingName . "'";
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['id'];
	}
	
	public static function hadBuilding($buildingID, $userId) {
		$sql = "SELECT *
				FROM building_users
				WHERE building_type_id = ".$buildingID."
				AND user_id = ".$userId;
				
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		
		if (count($result) == 0)
			return true;
			
		return false;
	}
	/*
	 * Récupère le name d'un building
	 * @param buildingName Type id du building
	 */
	public static function getBuildingNameByTypeId($typeId)
	{
		$sql = "SELECT building_name
		FROM building_type
		WHERE id= '" . $typeId . "'";
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['building_name'];
	}
	
	/**
	 * Retoutrne la table typeId
	 */
	public static function getBuildingTypeId()
	{
		$sql = "SELECT *
		FROM building_type";
					
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0];
	}
	
	/**
	 * Retourne les champs de toutes les tables
	*/
	public static function getAllBuildingDefnition()
	{
		
	}
}