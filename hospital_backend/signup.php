<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
        $json_data = file_get_contents('php://input');
        $data = json_decode($json_data, true);

        $name = $data['name'];
        $email = $data['email'];
        $password = $data['password'];
        $date_of_birth = $data['date_of_birth'];
        $user_type = $data['user_type'];
        $gender = $data['gender'];

        $sign_up = $mysqli->prepare('SELECT * from users where email=?');
        $sign_up->bind_param('s', $email);
        $sign_up->execute();
        $results = $sign_up->get_result();
        $data = null;
        while ($object = $results->fetch_assoc()) {
            $data = $object;
        }

        $response["status"] = $data;

        if ($data != null) {
            $response = ["user already exist"];
        } else {
            $sign_up = $mysqli->prepare("INSERT INTO users (name,email,password,date_of_birth,user_type,gender) VALUES (?,?,?,?,?,?)");
            $sign_up->bind_param('ssssss', $name, $email, $password, $date_of_birth, $user_type, $gender);
            $sign_up->execute();
            $results = $sign_up->get_result();
            $response = ["user added"];
        }

        echo json_encode(["response" => $response]);
    }
}
