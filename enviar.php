<?php

//Variáveis

$nome = $_POST['nome'];
$email = $_POST['email'];
$idade = $_POST['idade'];
$patente = $_POST['patente'];
$msg = $_POST['msg'];


// Corpo E-mail

$arquivo = "
<html>
	<b>Informa&ccedil;ões</b><br><br>
  	<b>Nome:</b> $nome<br>
	<b>E-mail:</b> $email<br>
  	<b>Idade:</b> $idade<br>
  	<b>Patente:</b> $patente<br><br>
 	<b>Mensagem:</b> $msg<br>
</html>
";


//enviar

// emails para quem será enviado o formulário

$emailenviar = "clanpauamarelo@hotmail.com";
$destino = $emailenviar;
$assunto = "Peneira PAU AMARELO";


// É necessário indicar que o formato do e-mail é html

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= "From: $email Reply-to: $email\n";
//$headers .= "Bcc: $EmailPadrao\r\n";


$enviaremail = mail($destino, $assunto, $arquivo, $headers);
	if($enviaremail){
		echo " <meta http-equiv='refresh' content='2;URL=index.html'>";
	} else {
		echo " <meta http-equiv='refresh' content='2;URL=index.html'>";
	}

?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>E-mail enviado</title>
    

    <!-- Google Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Titillium+Web:400,200,300,700,600' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Raleway:400,100' rel='stylesheet' type='text/css'>

    

    <!-- Bootstrap -->
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="stylesheet" href="css/owl.carousel.css">


    <link rel="shortcut icon" href="images/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="images/ico/apple-touch-icon-57-precomposed.png">
</head><!--/head-->

<body>
	<div class="container" align="center" style="margin-top: 100px;">
    	<h1 style="color: #000;">
    		<i class="fa fa-check" style="color: green;" aria-hidden="true"></i>
			E-mail enviado com sucesso!
		</h1>

		<h3 style="color: #000;">Entraremos em contato</h3>
		<img src="images/logo.png" width="50%">
	</div>
</body>
</html>