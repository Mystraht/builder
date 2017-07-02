#include "SFTPEx.au3"
#include <File.au3>

;~ $server = 'ftp.example.com'
;~ $username = 'secretusers'
;~ $pass = 'hiddenpass'

;~ $Open = _FTPOpen('MyFTP Control')
;~ $Conn = _FTPConnect($Open, $server, $username, $pass)
;~ $Ftpp = _FtpPutFile($Conn, 'Fragment.jar', '/www/api/test.exe')
;~ $Ftpc = _FTPClose($Open)

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

; GAME
dirPutContents($connexion, $game_dir & 'assets/json', '/www/assets/json')