<?php
$mobile = $_POST["mobile"];
$username = $_POST["username"];
$password = $_POST["password"];
$confirm_password = $_POST["confirm_password"];
$country = $_POST["country"];
$profile_pic_location = $_FILES["profile_pic"]["tmp_name"];

if ($password == $confirm_password) {
      $connection = new mysqli("localhost", "root", "@JaniduChamika2001", "chat_app", 3306);
      $connection->query("INSERT INTO `user` (`mobile`, `name`, `password`, `country_id`, `profile_url`) 
      VALUES ('$mobile', '$username', '$password', '$country', 'uploads/$mobile.jpg')");

      move_uploaded_file($profile_pic_location, "uploads/" . $mobile . ".jpg");
      echo "User registered successfully.";
} else {
      echo "Passwords do not match.";
}
