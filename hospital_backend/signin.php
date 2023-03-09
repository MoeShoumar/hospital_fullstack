<?php
header('Access-Control-Allow-Origin: *');
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,email,password,first_name,last_name from users where email=?');
$query->bind_param('s', $email);
$query->execute();
