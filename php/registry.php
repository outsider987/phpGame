<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->name) === ''|| trim($request->email) === ''|| trim($request->pwd) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->name));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $pwd =mysqli_real_escape_string($con, trim($request->pwd));


  // Store.
  $insertdata = "INSERT INTO `user_information`(`user_name`,`user_mail`,`user_password`) VALUES ('{$name}','{$email}','{$pwd}')";

  if(mysqli_query($con,$insertdata))
  {
    http_response_code(201);
    $user = [
      'user_name' => $name,
      'user_mail' => $email,
      'user_password'=>$pwd,
      'ID'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$user]);
  }
  else
  {
    http_response_code(422);
  }
}
