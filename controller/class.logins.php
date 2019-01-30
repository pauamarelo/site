<?php    header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
require_once("conexao.php");

$post_date = file_get_contents("php://input");
$data = json_decode($post_date);
 
 
//--------------------------------
class banco extends db
{

    public $var = array();
	public $tabela = array(1=>"admins");
    public $nome = array(1=>"Administrador");
	public $tipo = 1;
	public function login($login)
    {
		$this->tipo = $login->tipo;
       
		$sql = "SELECT * FROM ".$this->tabela[$this->tipo]." WHERE login = '" . $login->login . "' AND senha = ('" . $login->senha  . "')    LIMIT 0,1";
        $this->query($sql);
 
        if ($this->num_rows() > 0) {
			$l = $this->fetch();
            $this->popSessionLogin($login->login);

            echo json_encode(array(
                "status" => true,
                "msg" => "Login efetuado com sucesso!",
				"tipo"=> $this->tipo,
                "dados" => $_SESSION['U']), JSON_NUMERIC_CHECK);

        } else {
            $this->delSession();
            echo json_encode(array("erro" => true, "msg" => "Usuário ou senha inválida!"), JSON_NUMERIC_CHECK);
        }
    }
      
    public function verificaLogin()
    {
 
        if (isset($_SESSION['U']['LOGADO']) && $_SESSION['U']['LOGADO'] == true) {
            echo json_encode(array(
                "status" => true,
                "msg" => "Logado",
				"logado" => true,
			 	"tipo" => $_SESSION['U']['tipo'],
                "dados" => $_SESSION['U']), JSON_NUMERIC_CHECK); 
        } else {
            echo json_encode(array("erro" => true, "status" => false,"tipo" => '0',"dados" => (object)array()), JSON_NUMERIC_CHECK);
        }
    }
	
	 public function popSessionLogin($id)
    {
        $sql = "select * from ".$this->tabela[$this->tipo]." c where login = '$id' limit 1";
        $this->query($sql);
        if ($this->num_rows() > 0) {
            $l = $this->fetch();
			$l = $this->preOut($l);
            $_SESSION['U'] = array();
            $_SESSION['U'] = (array)$l;
			$_SESSION['U']['tipo'] = $this->tipo;
            $_SESSION['U']['LOGADO'] = true;
        }
    }

    //Esqueci minha senha
    public function senha($d)
    {
        $this->tipo = $d->dados->tipo;
       $email = $d->dados->email;
 
        $sql = "SELECT * FROM ".$this->tabela[$this->tipo]." WHERE email = '" . $email . "' LIMIT 0,1";
        $this->query($sql);

        $nome = $this->nome[$this->tipo];

        if ($this->num_rows() > 0) {
            $l = $this->fetch();
            if (!isset($l->nome)){
                $l->nome = $l->fantasia;
            }
            $html = "Olá $l->nome,<br /><br />
                    Realize o login com os seguintes dados:<br /><br />
                    Usuário: $l->email<br />
                    Senha: $l->senha<br />
                    Tipo de conta: $nome
                    <br />
                    att,<br />
                    Atendimento
            ";
            $e = new senderMail();
            $e->destino = $l->email;
            $e->_mail("Dados de acesso", $html);
            echo json_encode(array("status" => true, "msg" => "Dados de acesso enviados com sucesso!"));
        } else {
            echo json_encode(array("erro" => true, "msg" => "E-mail não encontrado!"));
        }
    }
	  
	   
}

 
 
 

//---------------------------------

if (isset($data->acao) && $data->acao != '') {
    $v = new banco();
    switch ($data->acao) {
		case 'logar':
            $data->dados->tipo = 1;
			$v->login($data->dados);
            break;
		case 'logout':
             unset($_SESSION['U']);
        	$_SESSION['U'] = array();
            break;
 
		default:
		 
			if (method_exists($v,$data->acao))
			{
				$metodo = $data->acao;
				$v->$metodo($data);
			}
			break;		 
    }
}
?>