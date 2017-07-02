<?php
use Silex\Application;
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/../app/controllers/UsersController.class.php';
require_once __DIR__ . '/../app/models/UserModel.class.php';
require_once __DIR__ . '/../Utils.class.php';
require_once __DIR__ . '/../app/models/ResourceModel.class.php';
require_once __DIR__ . '/../app/controllers/ResourcesController.class.php';
require_once __DIR__ . '/../app/models/BuildingModel.class.php';
require_once __DIR__ . '/../app/controllers/BuildingsController.class.php';
require_once __DIR__ . '/../app/models/LanternModel.class.php';
require_once __DIR__ . '/../app/controllers/LanternsController.class.php';
require_once __DIR__ . '/../app/models/GiftModel.class.php';
require_once __DIR__ . '/../app/controllers/GiftsController.class.php';

$basePath = '/v1';

$UsersController = new UsersController();
$ResourcesController = new ResourcesController();
$BuildingsController = new BuildingsController();
$LanternsController = new LanternsController();
$GiftsController = new GiftsController();

$UserModel = new UserModel();
$ResourceModel = new ResourceModel();
$BuildingModel = new BuildingModel();
$LanternModel = new LanternModel();
$GiftModel = new GiftModel();

/*
 * Main path
 */

$app->get('/', function (Request $request) use ($app, $UsersController) {
    return $app->redirect('doc/index.html');
});


/*
 * Users
 */

$app->get($basePath . '/userInfos', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, "index");
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->index($params);
});

$app->get($basePath . '/users/login', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'login');

    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->login($params);
});

$app->post($basePath . '/users/create', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'create');

    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->create($params);
});

$app->post($basePath . '/users/createFB', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'createFB');
	
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->createFB($params);
});

$app->get($basePath . '/users/dailyreward', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'dailyreward');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->dailyreward($params);
});

$app->post($basePath . '/users/dailyreward/update', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'dailyrewardUpdate');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->dailyrewardUpdate($params);
});

$app->get($basePath . '/users/parade', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'parade');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->parade($params);
});

$app->post($basePath . '/users/parade/update', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'paradeUpdate');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->paradeUpdate($params);
});

$app->get($basePath . '/users/ftue', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'ftue');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->ftue($params);
});

$app->post($basePath . '/users/ftue/complet', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'ftueComplet');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->ftueComplet($params);
});

$app->post($basePath . '/users/buy', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'buy');
 
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->buy($params);
});

$app->get($basePath . '/users/experience', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'experience');
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->experience($params);
});

$app->post($basePath . '/users/destroy', function (Request $request) use ($app, $UsersController, $UserModel) {
    $params = $request->query->all();
    $errorMessage = $UserModel->validate($params, 'destroy');

    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $UsersController->destroy($params);
});


/*
 * Resources
 */

$app->get($basePath . '/resources', function (Request $request) use ($app, $ResourcesController, $ResourceModel) {
	$params = $request->query->all();
	$errorMessage = $ResourceModel->validate($params);
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $ResourcesController->index($params);
});

$app->get($basePath . '/resources/offering', function (Request $request) use ($app, $ResourcesController, $ResourceModel) {
	$params = $request->query->all();
	$errorMessage = $ResourceModel->validate($params);
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $ResourcesController->offering($params);
});

$app->get($basePath . '/resources/gold', function (Request $request) use ($app, $ResourcesController, $ResourceModel) {
	$params = $request->query->all();
	$errorMessage = $ResourceModel->validate($params);
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $ResourcesController->gold($params);
});

$app->get($basePath . '/resources/spice', function (Request $request) use ($app, $ResourcesController, $ResourceModel) {
	$params = $request->query->all();
	$errorMessage = $ResourceModel->validate($params);
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $ResourcesController->spice($params);
});


/*
 * Buildings
 */

$app->get($basePath . '/buildings', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
    $params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "index");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->index($params);
});

$app->post($basePath . '/buildings/{name}/create', function (Request $request, $name) use ($app, $BuildingsController, $BuildingModel) {
    $params = $request->query->all();
    $params['name'] = $name;
    $errorMessage = $BuildingModel->validate($params, "create");
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $BuildingsController->createBuilding($params);
});

$app->post($basePath . '/buildings/move', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "move");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->move($params);
});

$app->post($basePath . '/buildings/collect', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "collect");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->collect($params);
});

$app->post($basePath . '/buildings/upgrade', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "upgrade");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->upgrade($params);
});

$app->post($basePath . '/buildings/changeColor', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "changeColor");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->changeColor($params);
});

$app->post($basePath . '/buildings/hardBuild', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "hardBuild");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->hardBuild($params);
});

$app->post($basePath . '/buildings/destroy', function (Request $request) use ($app, $BuildingsController, $BuildingModel) {
	$params = $request->query->all();
	$errorMessage = $BuildingModel->validate($params, "destroy");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $BuildingsController->destroy($params);
});



/*
 * Lanterns
 */

$app->get($basePath . '/lanterns', function (Request $request) use ($app, $LanternsController, $LanternModel) {
    $params = $request->query->all();
	$errorMessage = $LanternModel->validate($params, "index");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $LanternsController->index($params);
});

$app->post($basePath . '/lanterns/create', function (Request $request) use ($app, $LanternsController, $LanternModel) {
	$params = $request->query->all();
	$errorMessage = $LanternModel->validate($params, "create");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $LanternsController->create($params);
});


/*
 * Gifts
 */

$app->get($basePath . '/gifts', function (Request $request) use ($app, $GiftsController, $GiftModel) {
    $params = $request->query->all();
    $errorMessage = $GiftModel->validate($params, "index");
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $GiftsController->index($params);
});

$app->post($basePath . '/gifts/create', function (Request $request) use ($app, $GiftsController, $GiftModel) {
	$params = $request->query->all();
	$errorMessage = $GiftModel->validate($params, "create");
	
	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
	else return $GiftsController->create($params);
});

$app->post($basePath . '/gifts/collect', function (Request $request) use ($app, $GiftsController, $GiftModel) {
    $params = $request->query->all();
    $errorMessage = $GiftModel->validate($params, "collect");
    
    if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);
    else return $GiftsController->collect($params);
});
