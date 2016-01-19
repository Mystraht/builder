<?php

/////////////////////////////////////////////////////
// Exemple requête SQL SELECT / UPDATE / INSERT
//
// SELECT :
$sql = "SELECT * FROM test";
$post = $GLOBALS['app']['db']->fetchAll($sql);
//
// UPDATE :
$request = $GLOBALS['app']['db']->prepare('UPDATE ...');
$request->execute(array(1, 2, 3));
//
// INSERT :
$date = date("Y-m-d H:i:s");
$request = $GLOBALS['app']['db']->prepare('INSERT INTO users VALUES (NULL, ?, ?, ?, ?)');
$request->execute(array($params['username'], $params['password'], $date, $date));
//
/////////////////////////////////////////////////////

/////////////////////////////////////////////////////
// Exemple pour récuperer les paramètre :
//
$params = $request->query->all(); // Get
//
/////////////////////////////////////////////////////
//

/////////////////////////////////////////////////////
// Exemple de test qu'on peut faire sur les paramètre d'un model :
//
$errorMessage = '';

$errorMessage .= $this->isPresent($params, 'username', 'Le nom d\'utilisateur n\'a pas été entré\n');
$errorMessage .= $this->isPresent($params, 'password', 'Le mot de passe est absent\n');
$errorMessage .= $this->isPresent($params, 'password_conf', 'Vous devez confirmaer le mot de passe\n');
$errorMessage .= ($params['password'] == $params['password_conf']) ? '' : 'Les mots de passes ne sont pas identique\n';
$errorMessage .= $this->length($params['username'], 3, 16, 'La taille de votre nom de compte est inccorect (3 caractère minimum, 16 maximum)\n');
$errorMessage .= $this->length($params['password'], 6, 1024, 'La taille de votre mot de passe est inccorect (6 caractère minimum)\n');
$errorMessage .= $this->isUnique('username', $params['username'], 'users', 'Ce nom d\'utilisateur indiqué existe déjà ! ');
//
/////////////////////////////////////////////////////

?>


Lien en vrac :

http://stackoverflow.com/questions/15209511/best-approach-to-model-validation-in-php

Load jQuery library using plain JavaScript
(function(){
  var newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
  (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();

$.post('https://fbgame.isartdigital.com/2017_builder/builder2/api/index.php/v1/users/create?username=Bonjourtoi&password=123&password_conf=123', function (data) {console.log(data)} );