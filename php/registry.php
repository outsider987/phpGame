<?php

//function
function VerifyUserData($con,$check_duplicate_name,$user){

    $result = mysqli_query($con,$check_duplicate_name);
    $count = mysqli_num_rows($result);

    if($count > 0 ){
      // echo "<h1>User name is duplicate</h1>";
      echo json_encode([false,$user]);
      return false;
    }
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

  VerifyUserData($con,$check_duplicate_name,$user);

  $check_duplicate_email = "SELECT user_mail from user_information
  WHERE user_mail = '$email'";

  VerifyUserData($con,$check_duplicate_email,$user);

  $check_duplicate_password = "SELECT user_password from user_information
  WHERE user_password = '$email'";

  VerifyUserData($con,$check_duplicate_password,$user);




  // Store.
  $insertdata = "INSERT INTO `user_information`(`user_name`,`user_mail`,`user_password`) VALUES ('{$name}','{$email}','{$pwd}')";

  if(mysqli_query($con,$insertdata))
  {
    // http_response_code(201);
    // $user = [
    //   'user_name' => $name,
    //   'user_mail' => $email,
    //   'user_password'=>$pwd,
    //   'ID'    => mysqli_insert_id($con)
    // ];
    // echo json_encode(['data'=>$user]);
  }
  else
  {
    http_response_code(422);
  }
}
?>
