<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Credentials: true");
	header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
	header('Access-Control-Max-Age: 1000');
	header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
	header('Content-Type: text/html; charset=utf-8');
	require_once("conexao.php");

	include 'funcoes.php';
	$obj = new User();
	$list_news = $obj -> list_news();
	echo json_encode($list_news);
?>