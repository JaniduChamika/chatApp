<?php

$userJsonText = $_POST["userJsonText"];
// $userPhpObject =new stdClass();
$userPhpObject = json_decode($userJsonText);

$connection = new mysqli("localhost", "root", "@JaniduChamika2001", "chat_app", 3306);
$table = $connection->query("SELECT * FROM `user` WHERE `id` != '" . $userPhpObject->id . "'");

$phpResponseArray = array();
for ($x = 0; $x < $table->num_rows; $x++) {
      $phpArrayItemObject = new stdClass();

      $user = $table->fetch_assoc();
      $phpArrayItemObject->pic = $user["profile_url"];
      $phpArrayItemObject->name = $user["name"];
      $table2 = $connection->query("SELECT * FROM `chat` WHERE 
    `user_from_id`='" . $userPhpObject->id . "' AND `user_to_id`='" . $user["id"] . "' 
    OR 
    `user_from_id`='" . $user["id"] . "' AND `user_to_id`='" . $userPhpObject->id . "' 
    ORDER BY `date_time` DESC");
      if ($table2->num_rows == 0) {
            $phpArrayItemObject->msg = "";
            $phpArrayItemObject->time = "";
            $phpArrayItemObject->count = "0";
      } else {
            //unseen chat count
            $unseenChatCount = 0;
            //first row
            $lastChatRow = $table2->fetch_assoc();
            if ($lastChatRow["status_id"] == 1) {
                  $unseenChatCount++;
            }

            $phpArrayItemObject->msg = $lastChatRow["message"];

            $phpDateTimeObj = strtotime($lastChatRow["date_time"]);
            $timeStr = date("h i a", $phpDateTimeObj);

            $phpArrayItemObject->time = $timeStr;

            for ($i = 0; $i < $table2->num_rows-1; $i++) {
                  //other rows
                  $newChatRow = $table2->fetch_assoc();
                  if ($newChatRow["status_id"] == 3) {
                        $unseenChatCount++;
                  }
            }
            $phpArrayItemObject->count = $unseenChatCount;
      }
      array_push($phpResponseArray, $phpArrayItemObject);
}

$jsonResponseText = json_encode($phpResponseArray);
echo ($jsonResponseText);
