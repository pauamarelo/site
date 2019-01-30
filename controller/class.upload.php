<?php    header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
require_once("conexao.php");

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
 

function noSpecials($texto){
	/* função que gera uma texto limpo pra virar URL:
	- limpa acentos e transforma em letra normal
	- limpa cedilha e transforma em c normal, o mesmo com o ñ
	- transforma espaços em hifen (-)
	- tira caracteres invalidos
	by Micox - elmicox.blogspot.com - www.ievolutionweb.com
	*/
	//desconvertendo do padrão entitie (tipo á para á)
	$texto = trim(html_entity_decode($texto));
	//tirando os acentos
	$texto= preg_replace('![áàãâä]+!u','a',$texto);
	$texto= preg_replace('![éèêë]+!u','e',$texto);
	$texto= preg_replace('![íìîï]+!u','i',$texto);
	$texto= preg_replace('![óòõôö]+!u','o',$texto);
	$texto= preg_replace('![úùûü]+!u','u',$texto);
	//parte que tira o cedilha e o ñ
	$texto= preg_replace('![ç]+!u','c',$texto);
	$texto= preg_replace('![ñ]+!u','n',$texto);
	//tirando outros caracteres invalidos
	$texto= preg_replace('[^a-z0-9\-]','-',$texto);
	//tirando espaços
	$texto = str_replace(' ','-',$texto);
	//trocando duplo espaço (hifen) por 1 hifen só
	$texto = str_replace('--','-',$texto);

	return strtolower($texto);
}

//--------------------------------
class banco extends db
{

    public $var = array();

    
 
	public function upload($d)
    { 
     
    	//print_r($_FILES); 


		$uploaddir = '../storage/files/';
		$uploadfile = $uploaddir . basename(date('YmdHis')."_".noSpecials($_FILES['photo']['name']));

		 if (move_uploaded_file($_FILES['photo']['tmp_name'], $uploadfile)) {
 			 
			
            echo json_encode(array(
                "status" => true,
				"msg" => "upload realizado com sucesso!",
				"arquivo" => $uploadfile)) ;
        } else {
            echo json_encode(array("erro" => true, "msg" => "Houve um erro, por favor tente novamente.!"));
        }

	}
	
	 

   
    
}

 
 		
 

//---------------------------------

 $v = new banco();
 $v->upload($data);

?>