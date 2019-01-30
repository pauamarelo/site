<?php
$servidor = "localhost";
$usuario = "id3322157_pau";
$senha = "gremio13";

// $conexao = @mysql_connect($servidor, $usuario, $senha);

// if ($conexao == false) {
// 	echo "impossivel conectar-se ao MySQL";
// 	mysql_error();
// 	exit;
// } else {
// 	$base = @mysql_select_db("crud", $conexao);
// 	if ($base == false) {
// 		echo "nao foi possivel selecionar o banco de dados";
// 		mysql_error();
// 		exit;
// 	}
// }

define('DB_HOST', $servidor);
define('DB_USER', $usuario);
define('DB_PASS', $senha);
define('DB_DATABASE', 'id3322157_paudb');

//-----------
class db
{
    // propriedades
    public $con;
    public $res = array();
    public $op;
	public $id='';
	public $status='';
    //Funções
    public function __construct()
        // -----------------------------------------
    {
        $this->con = @mysql_connect(DB_HOST, DB_USER, DB_PASS);
        @mysql_select_db(DB_DATABASE, $this->con);
		@mysql_query("SET NAMES 'utf8'");
        @mysql_query('SET character_set_connection=utf8');
        @mysql_query('SET character_set_client=utf8'); 
        @mysql_query('SET character_set_results=utf8');
  
    }

    
    public function query($sql, $op = 1)
        // -----------------------------------------
    {
        $this->res[$op] = @mysql_query($sql, $this->con) or die($this->trata_erro());
    }

    // -----------------------------------------

    public function trata_erro()
        // --------------------------------------------------
    {
        $erro = mysql_error();
        $var = array();
        $var['erro'] = true;
        $var['msg'] = $erro;

        if (@mysql_errno($this->con) == '1062') {
            $campo = explode("'", $erro);
            $campo = $campo[1];
            $var['msg'] = "Informação duplicada($campo) Já existem um cadastro com este informação. $erro";

        }

        if (@mysql_errno($this->con) == '1451') {
            $campo = explode("`", $erro);
            $campo = $campo[3];
            $var['msg'] = "Registro não pode ser deletado Pois possui ($campo) vinculado. $erro";

        }

        return json_encode($var, JSON_NUMERIC_CHECK);
    }

    // -----------------------------------------

    public function num_rows($op = 1)
    {
        return mysql_num_rows($this->res[$op]);
    }

    // -----------------------------------------

    public function fetch($op = 1)

        // -----------------------------------------

    {
        return mysql_fetch_object($this->res[$op]);
    }

 

    public function __destruct()
        // -----------------------------------------
    {
        @mysql_close($this->con);
    }

    //------------------------------------------------------

    public function delete($tab, $id)
    {
        $sql = "select * from " . $tab . " limit 0,1";
        $this->query($sql);
        $c = $this->fetch_campos();

        $primary = $c->name;

        $sql = "delete from $tab where $primary = '$id' limit 1";
        $this->query($sql);

        if (@mysql_affected_rows() > 0) {
            $this->status = true;
        } else {
            $this->status = false;
        }
    }

    //----

    public function fetch_campos($op = 1)
        // -----------------------------------------
    {
        return @mysql_fetch_field($this->res[$op]);
    }

    //----

    public function getId($tab, $tab_id, $param)
    {
        $n = rand(9, 99);
        $sql = "select $tab_id from $tab $param";
        $this->query($sql, $n);
        if ($this->num_rows($n) > 0) {
            $l = $this->fetch($n);
            $l->status = true;
            return $l;
        } else {
            $l->status = false;
            return $l;
        }
    }

    //----

    public function popSession($id)
    {
        $sql = "select * from clientes c where c.idCliente = '$id' limit 1";
        $this->query($sql);
        if ($this->num_rows() > 0) {
            $l = $this->fetch();
			$l = $this->preOut($l);
            $_SESSION['U'] = array();
            $_SESSION['U'] = (array)$l;
            $_SESSION['U']['LOGADO'] = true;
        }
    }

    //----

    public function delSession()
    {
        unset($_SESSION['U']);
        $_SESSION['U'] = array();
    }

    //------------------------------------------------------

    public function inserir($tab,$dados)
    {
		 $dados = $this->preIn($dados);
	
		
        $sql = "select * from " . $tab . " limit 0,1";
        $this->query($sql);

        $campos = '';
        $valores = "";

        while ($c = $this->fetch_campos()) {
            $campo = $c->name;
            if (isset($dados->$campo)) {
                $campos .= "$campo,";
                $valores .= "'" . addslashes($dados->$campo) . "',";
            }
        }

        $campos = substr($campos, 0, -1);
        $valores = substr($valores, 0, -1);

        $sql = "insert into " . $tab . " ($campos) values($valores)";
        $this->query($sql);
		$v = (object)array("id" => '', "status" => false);
        if (@mysql_insert_id() > 0) {
            $v->id = @mysql_insert_id();
            $v->status = true;
            return $v;
        } else {
            $v->status = false;
            return $v;
        }
    }

    //-----------

    public function update($tab, $dados)
    {
		$v = (object)array("id" => '', "status" => false);
		$dados = $this->preIn($dados);
		
        $query_campos = '';
        $sql = "select * from " . $tab . " limit 0,1";
        $this->query($sql);
		$index = "";
        while ($c = $this->fetch_campos()) {

            $campo = $c->name;

            

			if ($index == ''){$index = "$c->name";}
            if (isset($dados->$campo) && $dados->$campo != '' || $campo == 'ativo' || $campo == 'principal' || $campo == 'tipo') {
 
                    $query_campos .= "$campo = '" . @addslashes($dados->$campo) . "',";
                 
            }
        }

        $query_campos = substr($query_campos, 0, -1);
        $v->status = false;
		
        if (strlen($query_campos) > 5) {
            $sql = "update " . $tab . " set
					 $query_campos
					where $index = '".$dados->$index."' limit 1";

                   // exit($sql);
            $this->query($sql);

            if (mysql_affected_rows() > 0) {
                $v->status = true;
            }
        }
        return $v;
    }
	
	//////////////////
	
	public function preIn($info)
	{
		foreach($info as $i => $v)
		{
			switch($i)
			{
				case 'cep':
					@$info->cep = soNumero(str_replace(' ','',$info->cep));
					break;
				case 'cpf':
					@$info->cpf = soNumero(str_replace(' ','',$info->cpf));
					break;
					
				case 'email':
					@$info->email = str_replace(" ", "", strtolower(@$info->email));
					break;
				case 'dataNascimento':
					if (!@eregi('-',$info->dataNascimento)){
						@$info->dataNascimento = data2mysql(@$info->dataNascimento);}
					break;
				case 'validade':
                $info->validade = substr($info->validade,0,10);
					if (!@eregi('-',$info->validade)){
						@$info->validade = data2mysql(@$info->validade);}
					break;
				case 'confirmCliente':
					if ($info->confirmCliente == true){$info->confirmCliente = 1;}
					else{$info->confirmCliente = 0;}
 					break;
				case 'confirmProfissional':
					if ($info->confirmProfissional == true){$info->confirmProfissional = 1;}
					else{$info->confirmProfissional = 0;}
					break;
				case 'dataHora':
                if (!@eregi('-', $info->dataHora)){


					$d = "".soNumero(str_replace(' ','',$info->dataHora));
				 	
					$info->dataHora  = $d[4].$d[5].$d[6].$d[7]."-".$d[2].$d[3]."-".$d[0].$d[1]." ".$d[8].$d[9].":".$d[10].$d[11];
					// echo $info->dataHora;
                    }
					break;
				 
			}
		}
		return $info;
	}
	public function preOut($info)
	{
		foreach($info as $i => $v)
		{
			$info->$i = stripslashes( ($v));
			switch($i)
			{
				case 'dataNascimento':
					if (!@eregi('/',$info->dataNascimento)){
						@$info->dataNascimento = mysql2data(@$info->dataNascimento);}
					break;
				case 'validade':
					if (!@eregi('/',$info->validade)){
						@$info->validade = mysql2data(@$info->validade);}
					break;
				case 'confirmCliente':
					if ($info->confirmCliente == 1){$info->confirmCliente = true;}
					else{$info->confirmCliente = false;}
 					break;
				case 'confirmProfissional':
					if ($info->confirmProfissional == 1){$info->confirmProfissional = true;}
					else{$info->confirmProfissional = false;}
					break;
				case 'dataHora2':
					 $d = "".soNumero(str_replace(' ','',$info->dataHora));
					 $info->dataHora  = $d[6].$d[7]."/".$d[4].$d[5]."/".$d[0].$d[1].$d[2].$d[3]." as ".$d[8].$d[9].":".$d[10].$d[11];
					 
					break;
			}
		}
		return $info;
	}
}

//-----------
?>