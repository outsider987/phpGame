<?php

abstract class ValidateUserEnum
{
    const UserName = 0;
    const UserEmail = 1;
    const Userpas = 2;
    const Sucess = 3;
}
//function
function VerifyUserData($con,$check_duplicate_name,$validateUserEnum){

    $result = mysqli_query($con,$check_duplicate_name);
    $count = mysqli_num_rows($result);
    ;
    if($count > 0 ){

      $user = [
        'validate' =>false,
        'user_failed_Enum' =>$validateUserEnum
      ];
      echo json_encode(['data'=>$user]);
      return false;
    }
    else
      return true;
}


require 'connect.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $user = [];
  // Validate.
  if(trim($request->name) === ''|| trim($request->email) === ''|| trim($request->pwd) === '')
  {
    return http_response_code(400);
  }

  $name = mysqli_real_escape_string($con, trim($request->name));
  $email = mysqli_real_escape_string($con, trim($request->email));
  $pwd =mysqli_real_escape_string($con, trim($request->pwd));


  $check_duplicate_name = "SELECT user_name from user_information
  WHERE user_name = '$name'";

  if( !VerifyUserData($con,$check_duplicate_name,ValidateUserEnum::UserName))
    return false;
  $check_duplicate_email = "SELECT user_mail from user_information
  WHERE user_mail = '$email'";

  if(!VerifyUserData($con,$check_duplicate_email,ValidateUserEnum::Userpas))
  return false;

  $check_duplicate_password = "SELECT user_password from user_information
  WHERE user_password = '$email'";

  if(!VerifyUserData($con,$check_duplicate_password,ValidateUserEnum::UserEmail))
  return false;




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
?>
