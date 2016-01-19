<?php
use Silex\Application;

class ApplicationModel
{
	public function __construct()
	{
		
	}

	/**
	 * Check si un paramètre est present dans les paramètres envoyé
	 * @param paramètres envoyé
	 * @param paramètre à checker
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isPresent($params, $param, $errorMessage) {
		if (isset($params[$param])) return '';
		else return $errorMessage;
	}


	/**
	 * Vérifie si la taille de la chaine de caractère est comprit entre min et max
	 * @param paramètres à check
	 * @param minimum
	 * @param maximumn
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function length($param, $min, $max, $errorMessage) {
		$length = strlen($param);

		if ($length <= $max && $length >= $min) {
			return '';
		} else {
			return $errorMessage;
		}
	}


	/**
	 * Vérifie si le paramètre est un nombre
	 * @param paramètres à check
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isNumeric($param, $errorMessage) {
		if (is_numeric($param)) return '';
		else return $errorMessage;
	}


	/**
	 * Vérifie si le paramètre est un string
	 * @param paramètres à check
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isString($param, $errorMessage) {
		if (is_string($param)) return '';
		else return $errorMessage;
	}


	/**
	 * Vérifie si le paramètre a une sous-phrase présente
	 * @param paramètres à check
	 * @param sous-phrase
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isInclude($param, $stringToSearch, $errorMessage) {
		if (strpos ($param, $stringToSearch)) return '';
		else return $errorMessage;
	}


	/**
	 * Vérifie si le paramètre a n'a pas une sous-phrase
	 * @param paramètres à check
	 * @param sous-phrase
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isExclude($param, $stringToSearch, $errorMessage) {
		if (strpos ($param, $stringToSearch)) return $errorMessage;
		else return '';
	}


	/**
	 * Véréfie si le paramètre est déjà dans un champ ou non
	 * @param Nom du champ
	 * @param Valeur du paramètre
	 * @param Table du champ
	 * @param Message d'erreur
	 * @return string vide ou $errorMessage
	 */
	public function isUnique($field, $value, $table, $errorMessage) {
        $sql = 'SELECT ' . $field . ' FROM ' . $table . ' WHERE ' . $field . '="' . $value . '";';
        if (count($GLOBALS['app']['db']->fetchAll($sql)) > 0) return $errorMessage;
        else return '';
    }
}
