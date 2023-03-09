<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$date_of_birth=$POST['date_of_birth']

$check_email = $mysqli-> prepare('select name, password, date_of_birth, email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

$hashed= hash("sha256", $password)