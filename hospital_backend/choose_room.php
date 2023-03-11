<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, OPTIONS");
include('connection.php');

$user_id = $_GET['user_id'];
$department_id = $_GET['department_id'];
$room_id = $_GET['room_id'];
$bed_id = $_GET['bed_id'];

$query = $mysqli->prepare('SELECT * FROM users WHERE id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$result = $query->get_result();
$data = $result->fetch_assoc();

if (!$data) {
    $response = ["Patient not found"];
} else {
    $query = $mysqli->prepare('SELECT * FROM user_rooms WHERE room_id = ? AND bed_id = ? AND user_id = ? ');
    $query->bind_param('iii', $room_id, $bed_id, $user_id);
    $query->execute();
    $result = $query->get_result();
    $data = $result->fetch_assoc();

    if ($data != null) {
        $response = ["Bed not available"];
    } else {
        $query = $mysqli->prepare('UPDATE user_rooms SET user_id = ? WHERE room_id = ? AND bed_id = ?');
        $query->bind_param('iii', $user_id, $room_id, $bed_id);
        $query->execute();
        $response = ["Bed assigned to patient"];
    }
}

echo json_encode(["response" => $response]);

// <!-- A patient can choose a department and a room. If the room has more than one bed, he/she is able to choose which bed.  -->
