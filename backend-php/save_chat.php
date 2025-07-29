<?php

$requestJSON = $_POST['requestJSON'];
$requestObject = json_decode($requestJSON);

// Access the properties of the request object
$msg = $requestObject->msg;
$from_user_id = $requestObject->from_user_id;
$to_user_id = $requestObject->to_user_id;
$datetime = date("Y-m-d H:i:s");
$status = 1; // Assuming 1 means 'unseen'

$connection = new mysqli("localhost", "root", "@JaniduChamika2001", "chat_app", 3306);
$connection->query("INSERT INTO `chat` (`user_from_id`, `user_to_id`, `message`, `date_time`, `status_id`) 
  VALUES ('$from_user_id', '$to_user_id', '$msg', '$datetime', '$status')");
echo "Chat saved successfully.";
