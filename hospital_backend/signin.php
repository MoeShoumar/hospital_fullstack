<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');
include('../vendor/autoload.php');

use \Firebase\JWT\JWT;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        $email = $data['email'];
        $password = $data['password'];

        $query = $mysqli->prepare("SELECT * FROM users WHERE email=? AND password=?");
        $query->bind_param('ss', $email, $password);
        $query->execute();

        $result = $query->get_result();

        while ($object = $result->fetch_assoc()) {
            $data = $object;
        }


        $payload = array(
            "sub" => $data['id'],
        );
        $token = JWT::encode($payload, "secret_key", 'HS256');
        $response = array(
            'token' => $token,
            'user_type' => $data['user_type']
        );
        echo json_encode($response);
    }
}
