<?php
include_once('ApplicationModel.class.php');

class UserModel extends ApplicationModel
{
	public function __construct()
	{
		
	}

	public function validate($params, $type) {
		$errorMessage = '';

		if ($type == 'index') {
			$errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");
		}
		
		if ($type == 'parade') {
			$errorMessage .= $this->isPresent($params, 'token', "Le token est absent\n");	
			$errorMessage .= $this->isPresent($params, 'hard', "Le paramètre hard est absent\n");	
		}
		
		if ($type == 'login') {
			$errorMessage .= $this->isPresent($params, 'username', "Le nom d'utilisateur n'a pas été entré\n");
			$errorMessage .= $this->isPresent($params, 'password', "Le mot de passe est absent\n");
		}

		if ($type == 'create') {
			$errorMessage .= $this->isPresent($params, 'username', "Le nom d'utilisateur n'a pas été entré\n");
			$errorMessage .= $this->isPresent($params, 'password', "Le mot de passe est absent\n");
			$errorMessage .= $this->isPresent($params, 'password_conf', "Vous devez confirmaer le mot de passe\n");

			if ($errorMessage) return $errorMessage;

			if (isset($params['email'])) {
				$errorMessage .= filter_var($params['email'], FILTER_VALIDATE_EMAIL) ? '' : "L'email entré est invalide\n";
				$errorMessage .= $this->isUnique('mail', $params['email'], 'users', "Ce mail existe déjà ! ");
			}

			$errorMessage .= ($params['password'] == $params['password_conf']) ? '' : "Les mots de passes ne sont pas identique\n";
			$errorMessage .= $this->length($params['username'], 3, 16, "La taille de votre nom de compte est inccorect (3 caractère minimum, 16 maximum)\n");
			$errorMessage .= $this->length($params['password'], 6, 1024, "La taille de votre mot de passe est inccorect (6 caractère minimum)\n");
			$errorMessage .= $this->isUnique('username', $params['username'], 'users', "Ce nom d'utilisateur indiqué existe déjà ! ");
		}

		if ($type == 'buy') {
			$errorMessage .= $this->isPresent($params, 'token', "Le token doit être présent\n");
			$errorMessage .= $this->isPresent($params, 'name', "Le nom de la transaction n'a pas été entré\n");
 
			if ($errorMessage) return $errorMessage;
		}
		
		if ($type == 'createFB') {
			$errorMessage .= $this->isPresent($params, 'mail', "Le mail n'a pas été entré\n");
			$errorMessage .= $this->isPresent($params, 'token', "le token n'a pas été entré\n");
			$errorMessage .= $this->isPresent($params, 'username', "Le username n'a pas été entré\n");

			if ($errorMessage) return $errorMessage;

			$errorMessage .= $this->isUnique('token', $params['token'], 'users', "Ce token existe déjà");
		}

		if ($type == 'destroy' ||
			$type == 'dailyreward' ||
			$type == 'dailyrewardUpdate' ||
			$type == 'parade' ||
			$type == 'ftue' ||
			$type == 'ftueComplet' ||
			$type == 'experience')
		{
			$errorMessage .= $this->isPresent($params, 'token', "Le token doit être présent\n");
		}

		if ($type == 'paradeUpdate') {
			$errorMessage .= $this->isPresent($params, 'token', "Le token doit être présent\n");
			$errorMessage .= $this->isPresent($params, 'bonusHarvested', "Le nombre de bonus est absent\n");
			$errorMessage .= $this->isPresent($params, 'hardPurchase', "Le champ hardPurchase est absent\n");
		}

		return $errorMessage;
	}


	/**
	 * Récupère le username
	 * @param userId user_id du username à récuperer
	 * @return string username
	 */
	public static function getUsername($userId) {
		$sql = "SELECT username FROM users WHERE id = '" . $userId . "'";
			
		$result = $GLOBALS['app']['db']->fetchAll($sql);
		return $result[0]['username'];
	}


	public static function generateGifts()
	{
		$gifts = file_get_contents(__DIR__ . "./../../../assets/json/giftsSettings.json", FILE_USE_INCLUDE_PATH);
		$gifts = json_decode($gifts, true);
		
		$rValue = rand(0,100);
		asort($gifts);
		$lucky = 0;
		
		foreach($gifts as $name => $gift)
		{
			$lucky += $gift['drop_luck'];
			if ($lucky > $rValue) 
			{
				return $name;
			}
		}
	}
}
