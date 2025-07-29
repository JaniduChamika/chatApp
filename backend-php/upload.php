<?php
$mobile=$_POST["mobile"];
$profile_pic_location=$_FILES["profile_pic"]["tmp_name"];

echo $mobile;
echo $profile_pic_location;
echo(move_uploaded_file($profile_pic_location, "uploads/" . $mobile.".jpg"));
?>
