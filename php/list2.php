<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';

$users = [];
$sql = "SELECT * FROM user_information";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    // $users[$cr]['ID']    = $row['id'];
    // $users[$cr]['user_name'] = $row['model'];
    $users[$cr]['user_name']= $row['user_name'];
    $users[$cr]['user_password'] = $row['user_password'];
    $users[$cr]['user_email'] = $row['user_email'];
    $cr++;
  }
  // print_r($users);
  echo json_encode(['data'=>$users]);
}
else
{
  http_response_code(404);
}
