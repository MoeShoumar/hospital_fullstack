<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare("SELECT * FROM users WHERE email=? AND password=?");
$query->bind_param('ss', $email, $password);
$query->execute();

$result = $query->get_result();

$data = $result->fetch_assoc();

$response["status"] = $data;

echo json_encode(["response" => $response]);
?>


<!-- You are asked to implement this cute project for Monday morning. Attached is the ER diagram (implement it on phpmyadmin - might modify it based on the below requirements). 
A patient, an employee, an admin can login and register
A patient can be assigned to a hospital by admins
An employee can be assigned to several hospitals by admins
A patient can choose a department and a room. If the room has more than one bed, he/she is able to choose which bed. 
A patient shall be able to display medications and choose whatever medication he/she wants. 
A patient can request services, and admins shall be able to approve/decline them. 
A patient shall be able to print the invoice (and download it as PDF) containing the total cost of approved services
A patient and an employee can edit their extra information after logging in
An employee can log services and assign the employee without getting approval from admins 
Admins shall be able to view statistics: how many female employees, how many patients per hospital, etc. 
Use JWT for authentication! 
add medications and sum services and sum them to get_browser

How many female employees are there?
SELECT COUNT(*) FROM user WHERE user_role_id = 2 AND gender = 'Female'; -->