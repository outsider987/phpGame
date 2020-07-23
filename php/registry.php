<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);


  // Validate.
  if(trim($request->name) === '')
  {
    return http_response_code(400);
  }

  // Sanitize.
  $name = mysqli_real_escape_string($con, trim($request->name));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $pwd =mysqli_real_escape_string($con, trim($request->pwd));


  // Store.
  $sql = "INSERT INTO `user_information`(`user_name`,`user_password`,`user_mail`) VALUES ('{$name}','{$email}','{$pwd}')";

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $car = [
      'model' => $model,
      'price' => $price,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode(['data'=>$car]);
  }
  else
  {
    http_response_code(422);
  }
}
