<?php
// require 'DB_Class.php';
// require 'DB_config.php';
// error_reporting();
// $users = [];
// $sql = "SELECT * FROM user_informatio";

// if($result = mysqli_query($con,$sql))
// {
//     $cr = 0;
//     while($row = mysqli_fetch_assoc($result))
//     {
//         $users[$cr]['ID'];
//         $cr++;
//     }
//     print_r($users);
//     //echo json_encode($prods);
// }
// else
// {
//     http_response_code(404);
// }


require_once("DB_config.php");
require_once("DB_class.php");

$db = new DB();
$db->connect_db($_DB['host'], $_DB['username'], $_DB['password'], $_DB['dbname']);
$db->query("SELECT * FROM user_informatio");
while($result = $db->fetch_array())
{
  print_r($result);
    // do something you want...
}

?>
