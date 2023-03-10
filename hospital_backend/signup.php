<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$date_of_birth = $POST['date_of_birth'];

$check_email = $mysqli->prepare('select name, password, date_of_birth, email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();

$hashed = hash("sha256", $password);

while ($check_email = $result->fetch_assoc()) {
    $data = $check_email;
}

$response["status"] = $data;

echo json_encode(["response" => $response]);
