<?php

$user1 = "1";
$user2 = "2";

$connection = new mysqli("localhost", "root", "@JaniduChamika2001", "chat_app", 3306);
$query = "SELECT * FROM `chat` 
          WHERE (`user_from_id` = '" . $user1 . "' AND `user_to_id` = '" . $user2 . "')
          OR (`user_from_id` = '" . $user2 . "' AND `user_to_id` = '" . $user1 . "')";

$table = $connection->query($query);
$chatArray = array();


for ($i = 0; $i < $table->num_rows; $i++) {
      $row = $table->fetch_assoc();

      $chatObject = new stdClass();
      $chatObject->id = $row["id"];
      $chatObject->msg = $row["message"];
      // $chatObject->time = $row["date_time"];
      $phpDateTimeObj = strtotime($row["date_time"]);
      $timestr = date("h i a", $phpDateTimeObj);
      $chatObject->time = $timestr;
      if ($row["user_from_id"] == $user1) {
            $chatObject->side = "right";
      } else {
            $chatObject->side = "left";
      }

      $chatObject->status = $row["status_id"];
      $chatArray[$i] = $chatObject;
}
$responseJSON = json_encode($chatArray);
echo ($responseJSON);
