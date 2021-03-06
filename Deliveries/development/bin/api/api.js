var fs = require('fs');

if (!isPlurial(process.argv[2])) {
	console.log('Ton controller doit toujours être au pluriel.');
	console.log('EXIT.');
	process.exit();
}

console.log('------------------');

var routePath = './config/routes.php';
var name = process.argv[2];

name = capitalizeFirstLetter(name);
routes = defineRoute(name);

controllerPath = './app/controllers/' + name + 'Controller.class.php';
modelPath = './app/models/' + name.substring(0, name.length -1) + 'Model.class.php';

copyFile('./template/TemplateController.class.php', controllerPath);
copyFile('./template/TemplateModel.class.php', modelPath);

fs.appendFile('./config/routes.php', routes, function (err) {
	addLibraryCall();
});

setTimeout(function () {
	console.log('Replace class name : ' + controllerPath);
	console.log('Replace class name : ' + modelPath);

	replaceInFile(controllerPath, new RegExp('{{CLASS_NAME}}', 'g'), name + "Controller");
	replaceInFile(modelPath, new RegExp('{{CLASS_NAME}}', 'g'), name.substring(0, name.length -1) + "Model");

	console.log('------------------');
}, 250);

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function isPlurial(word) {
	if (word[word.length -1] == 's') return true;
	else return false;
}


function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  console.log('Created file : ' + target);
  rd.pipe(wr);
}


function replaceInFile(filePath, regexp, replacement) {
	fs.readFile(filePath, 'utf8', function (err, data) {
		if (err) {
			return console.log(err);
		}

		var result = data.replace(regexp, replacement);

		fs.writeFile(filePath, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});

}

function defineRoute(name) {
	console.log('Add route ' + name.toLowerCase());
	console.log('Add route ' + name.toLowerCase() + '/{id}');
	console.log('Add route ' + name.toLowerCase() + '/create');
	console.log('Add route ' + name.toLowerCase() + '/update');
	console.log('Add route ' + name.toLowerCase() + '/destroy');
	return '\n\n\n' +
	'/*\n' +
	' * ' + name + '\n' +
	' */\n' +
	'\n' +
	'$app->get($basePath . \'/' + name.toLowerCase() + '\', function (Request $request) use ($app, $' + name + 'Controller, $' + name.substring(0, name.length -1) + 'Model) {\n' +
	'    return $' + name + 'Controller->index();\n' +
	'});\n' +
	'\n' +
	'$app->get($basePath . \'/' + name.toLowerCase() + '/{id}\', function (Request $request, $id) use ($app, $' + name + 'Controller, $' + name.substring(0, name.length -1) + 'Model) {\n' +
	'    return $' + name + 'Controller->show();\n' +
	'});\n' +
	'\n' +
	'$app->post($basePath . \'/' + name.toLowerCase() + '/create\', function (Request $request) use ($app, $' + name + 'Controller, $' + name.substring(0, name.length -1) + 'Model) {\n' +
	'	$params = $request->query->all();\n' +
	'	$errorMessage = $' + name.substring(0, name.length -1)  + 'Model->validate($params, "create");\n' +
	'	\n' +
	'	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);\n' +
	'	else return $' + name + 'Controller->create($params);\n' +
	'});\n' +
	'\n' +
	'$app->patch($basePath . \'/' + name.toLowerCase() + '/update\', function (Request $request) use ($app, $' + name + 'Controller, $' + name.substring(0, name.length -1) + 'Model) {\n' +
	'	$params = $request->query->all();\n' +
	'	$errorMessage = $' + name.substring(0, name.length -1)  + 'Model->validate($params, "update");\n' +
	'	\n' +
	'	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);\n' +
	'	else return $' + name + 'Controller->update($params);\n' +
	'});\n' +
	'\n' +
	'$app->delete($basePath . \'/' + name.toLowerCase() + '/destroy\', function (Request $request) use ($app, $' + name + 'Controller, $' + name.substring(0, name.length -1) + 'Model) {\n' +
	'	$params = $request->query->all();\n' +
	'	$errorMessage = $' + name.substring(0, name.length -1)  + 'Model->validate($params, "destroy");\n' +
	'	\n' +
	'	if ($errorMessage) return Utils::formatErrorMessage(ERROR_BAD_MODEL, $errorMessage);\n' +
	'	else return $' + name + 'Controller->destroy($params);\n' +
	'});';
}

function addLibraryCall() {
	var data = fs.readFileSync(routePath).toString().split("\n");

	console.log('Add dependency to routes');

	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i].match(/Model\(\)/)) {
			data.splice(i + 1, 0, '$' + name.substring(0, name.length -1) + 'Model = new ' + name.substring(0, name.length -1) + 'Model();');
			break;
		}
	};

	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i].match(/Controller\(\)/)) {
			data.splice(i + 1, 0, '$' + name + 'Controller = new ' + name + 'Controller();');
			break;
		}
	};
	

	for (var i = data.length - 1; i >= 0; i--) {
		if(data[i].match('require_once __DIR__')) {
			data.splice(i + 1, 0, "require_once __DIR__ . '/../app/controllers/" + name + "Controller.class.php';");
			data.splice(i + 1, 0, "require_once __DIR__ . '/../app/models/" + name.substring(0, name.length -1) + "Model.class.php';");
			break;
		}
	};

	var text = data.join("\n");

	fs.writeFile(routePath, text, function (err) {
	  if (err) return console.log(err);
	});
	
}
