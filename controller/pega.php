<?php
	include 'funcoes.php';
	$obj = new User();
	$user_data = $obj -> view_user_by_user_id($_GET['user_id']);
	echo json_encode($user_data);
?>