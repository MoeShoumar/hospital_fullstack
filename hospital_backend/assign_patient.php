<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
include('connection.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if ($_SERVER['CONTENT_TYPE'] === 'application/json') { //check data form (json)
        $json_data = file_get_contents('php://input'); //gwet data from body
        $data = json_decode($json_data, true); //true to store them as an aray
        $hostpital_id = $data['hospital_id'];
        $user_id = $data['user_id'];
        $query = $mysqli->prepare('SELECT * FROM  hospital_users WHERE user_id = ?');
        $query->bind_param('i', $user_id);
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




// <!-- You are asked to implement this cute project for Monday morning. Attached is the ER diagram (implement it on phpmyadmin - might modify it based on the below requirements). 
// A patient, an employee, an admin can login and register
// A patient can be assigned to a hospital by admins
// An employee can be assigned to several hospitals by admins
// A patient can choose a department and a room. If the room has more than one bed, he/she is able to choose which bed. 
// A patient shall be able to display medications and choose whatever medication he/she wants. 
// A patient can request services, and admins shall be able to approve/decline them. 
// A patient shall be able to print the invoice (and download it as PDF) containing the total cost of approved services
// A patient and an employee can edit their extra information after logging in
// An employee can log services and assign the employee without getting approval from admins 
// Admins shall be able to view statistics: how many female employees, how many patients per hospital, etc. 
// Use JWT for authentication! 
// add medications and sum services and sum them to get_browser

// How many female employees are there?
// SELECT COUNT(*) FROM user WHERE user_role_id = 2 AND gender = 'Female'; -->