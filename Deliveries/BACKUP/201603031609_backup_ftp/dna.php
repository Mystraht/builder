<?php

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_POST["url"]);
if ($_POST["json"]!=undefined) {
	curl_setopt($ch, CURLOPT_POSTFIELDS, $_POST["json"]);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
}

curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POST, 1);

$data = curl_exec($ch);
curl_close($ch);

echo $data;
?>