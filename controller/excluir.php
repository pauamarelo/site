<?php
	include 'funcoes.php';
	$obj = new User();
	$result = $obj -> delete_news($_GET['idNoticia']);
	$message['message'] = $result;
	echo json_encode($message);
?>