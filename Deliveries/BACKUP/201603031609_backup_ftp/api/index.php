<?php

global $app;

define("ENV", "production");
//define("ENV", "development");

require_once __DIR__ . '/Utils.class.php';
Utils::defineErrors();

require_once __DIR__ . '/vendor/autoload.php';
$app = new Silex\Application();
//$app['debug'] = (ENV == "development");

require_once __DIR__ . '/config/Database.class.php';
$Database = new Database();
$Database->register($app);

require_once __DIR__ . '/config/routes.php';
$app->run();