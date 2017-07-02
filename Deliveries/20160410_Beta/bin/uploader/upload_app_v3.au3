#include "SFTPEx.au3"
#include <File.au3>

;~ $server = 'ftp.example.com'
;~ $username = 'secretusers'
;~ $pass = 'hiddenpass'

;~ $Open = _FTPOpen('MyFTP Control')
;~ $Conn = _FTPConnect($Open, $server, $username, $pass)
;~ $Ftpp = _FtpPutFile($Conn, 'Fragment.jar', '/www/api/test.exe')
;~ $Ftpc = _FTPClose($Open)

$ans = MsgBox(3, "Uploader", 'Voulez vous uploader le dossier "bin/assets" ?')

If $ans = 6 Then $openAsset = 1 ;yes
If $ans = 7 Then $openAsset = 0 ;no


$session = _SFTP_Open()

$connexion = _SFTP_Connect($session, 'fbgame.isartdigital.com', 'builder2_2017', 'GQ7*<qk3', 10022)

$game_dir = '../'
$api_dir = '../api/'

$fileUploadedCount = 1
$fileUploadedTotal = 12
$domainDev = 'com_isartdigital_builder_api_Api.domain = com_isartdigital_builder_api_Api.domainDev'
$domainProd = 'com_isartdigital_builder_api_Api.domain = com_isartdigital_builder_api_Api.domainProd'

func dirPutContents($connexion, $sourceDir, $destDir)
   ToolTip('Upload : ' & $sourceDir & ' | (' & $fileUploadedCount & '/' & $fileUploadedTotal & ')', 0, 0)
   _SFTP_DirPutContents($connexion, $sourceDir, $destDir)
   $fileUploadedCount += 1
EndFunc

func filePut($connexion, $sourceDir, $destDir)
   ToolTip('Upload : ' & $sourceDir & ' | (' & $fileUploadedCount & '/' & $fileUploadedTotal & ')', 0, 0)
   _SFTP_FilePut($connexion, $sourceDir, $destDir)
   $fileUploadedCount += 1
EndFunc

; Replace API domain to prod
_ReplaceStringInFile($game_dir & 'Builder.js', $domainDev, $domainProd)

; MAIN GAME FILE
filePut($connexion, $game_dir & 'Builder.js', '/www/Builder.js')

; API
dirPutContents($connexion, $api_dir & 'app', '/www/api/app')
dirPutContents($connexion, $api_dir & 'config', '/www/api/config')
filePut($connexion, $api_dir & 'Utils.class.php', '/www/api/Utils.class.php')

; GAME
dirPutContents($connexion, $game_dir & 'css', '/www/css')
dirPutContents($connexion, $game_dir & 'js', '/www/js')
dirPutContents($connexion, $game_dir & 'lib', '/www/lib')
filePut($connexion, $game_dir & 'Builder.js.map', '/www/Builder.js.map')
filePut($connexion, $game_dir & 'config.json', '/www/config.json')
filePut($connexion, $game_dir & 'textsUI.json', '/www/textsUI.json')
filePut($connexion, $game_dir & 'ui.js', '/www/ui.js')

if ($openAsset == 1) Then
   dirPutContents($connexion, $game_dir & 'assets', '/www/assets')
EndIf

_ReplaceStringInFile($game_dir & 'Builder.js', $domainProd, $domainDev)