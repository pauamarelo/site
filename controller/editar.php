<?php 
	include 'funcoes.php';
	$obj = new User();
	$data = json_decode(file_get_contents("php://input"));
	$result = $obj -> update_news($data);
	$message['message'] = $result;
	echo json_encode($message);
?>