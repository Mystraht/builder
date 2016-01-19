#include "SFTPEx.au3"

;~ $server = 'ftp.example.com'
;~ $username = 'secretusers'
;~ $pass = 'hiddenpass'

;~ $Open = _FTPOpen('MyFTP Control')
;~ $Conn = _FTPConnect($Open, $server, $username, $pass)
;~ $Ftpp = _FtpPutFile($Conn, 'Fragment.jar', '/var/www/2017_builder/builder2/api/test.exe')
;~ $Ftpc = _FTPClose($Open)

$session = _SFTP_Open()

$connexion = _SFTP_Connect($session, 'fbgame.isartdigital.com', 'builder2_2017', 'GQ7*<qk3', 10022)

_SFTP_DirPutContents($connexion, 'app', '/var/www/2017_builder/builder2/api/app')
_SFTP_DirPutContents($connexion, 'config', '/var/www/2017_builder/builder2/api/config')
_SFTP_DirPutContents($connexion, 'app', '/var/www/2017_builder/builder2/api/app')
_SFTP_FilePut($connexion, 'Utils.class.php', '/var/www/2017_builder/builder2/api/Utils.class.php')