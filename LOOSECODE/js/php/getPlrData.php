<?php
/*
    if(!isset($_POST["tsl"]) OR !isset($_POST["pId"]) OR !isset($_POST["gId"])){
        echo "ERR_INVLD_DTA";
        //echo print_r(array_values($_POST));
    }
    else{
    */
    if($_POST){
        $location = 'localhost';
		$user = 'user';
		$pass = 'pass';
		&databaseid = 'id';
        $con = new mysqli($location, $user, $pass, $databaseid);
        if ($con->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $q="SELECT `".$_POST["tsl"]."` FROM `".$_POST["gId"]."` WHERE `playerId`='".$_POST["pId"]."'";
        $rslt=$con->query($q);
        echo implode('%', mysqli_fetch_assoc($rslt));
    }
?>