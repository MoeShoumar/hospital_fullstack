<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');
include('../vendor/autoload.php');

// use \Firebase\JWT\JWT;



// $headers = getallheaders();
// $token = $headers['Authorization'];

// if (preg_match('/Bearer\s(\S+)/', $auth_header, $matches)) {
//     $token = $matches[1];
// }
// try {
//     $decoded = JWT::decode($token, $secret_key, array('HS256'));
// } catch (Exception $e) {
//     http_response_code(401);
//     exit();
// }


// $data = json_decode(file_get_contents("php://input"));

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

// $secret_key = "secret_key";
// $token = $_SERVER['Authorization'];

// echo "hyhhhhhhhh" . $_SERVER['Authorization'];
// JWT::decode($token, new Key($secret_key, 'HS256'));
// $secret_key = "secret_key";
// $token = $_SERVER['Authorization'];
// $decoded_token = JWT::decode($token, new Key($secret_key, 'HS256'));


if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_SERVER['CONTENT_TYPE'] === 'application/json') { //check data form (json)
        $json_data = file_get_contents('php://input'); //gwet data from body
        $data = json_decode($json_data, true); //true to store them as an array
        $hospital_id = $data['hospital_id'];
        echo $hospital_id;
        $user_id = $data['user_id'];
        $query = $mysqli->prepare('SELECT * FROM  hospital_users WHERE user_id = ?');
        $query->bind_param('s', $user_id);
        $query->execute();
        $result = $query->get_result();
        $data = $result->fetch_assoc();
        if (isset($data)) {
            $response = ['Patient is already assigned to a hospital'];
        } else {
            $query = $mysqli->prepare('INSERT INTO hospital_users (hospital_id, user_id) VALUES (?, ?)');
            $query->bind_param('ss', $hospital_id, $user_id);
            $query->execute();
            $response = ['Patient assigned successfully'];
        }
        echo json_encode($response);
    }
}
