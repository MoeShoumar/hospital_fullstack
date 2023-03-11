<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400");

$host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "hospital_db";
$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);
