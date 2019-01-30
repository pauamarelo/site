<?php
	class User {
		private $conexao;
		function __construct() {
    		session_start();
	    	$servidor = "localhost";
			$usuario = "id3322157_pau";
			$senha = "gremio13";
    		$dbname = "id3322157_paudb";

			// Create connection
			$conexao = new mysqli($servidor, $usuario, $senha, $dbname);
			// Check connection
			if ($conexao -> connect_error) {
				die("Connection failed: " . $conexao -> connect_error);
			} else {
				$this -> conexao = $conexao;  
			}
		}


		// Listar
		public function list_news(){     
			$sql = "SELECT * FROM news";
			$query = $this -> conexao -> query($sql);
			$noticias = array();
			if ($query -> num_rows > 0) {
				while ($row = $query -> fetch_assoc()) {
				  // $noticias['lista'][] = $row;
					$noticias[] = $row;
				}
       		}
       
    		return $noticias;
    	}


    	// Adicionar
		public function add_news($post_data = array()){
			$titulo = '';
			if(isset($post_data -> titulo)){
				$titulo = mysqli_real_escape_string($this -> conexao, trim($post_data -> titulo));
			}
			$autor = '';
			if(isset($post_data -> autor)){
				$autor = mysqli_real_escape_string($this -> conexao, trim($post_data -> autor));
			}
			$urlNoticia = '';
			if(isset($post_data -> urlNoticia)){
				$urlNoticia = mysqli_real_escape_string($this -> conexao, trim($post_data -> urlNoticia));
			}
	    	$conteudo = '';
			if(isset($post_data -> conteudo)){
				$conteudo = mysqli_real_escape_string($this -> conexao, trim($post_data -> conteudo));
	   		}
			$dtNoticia = '';
			if(isset($post_data -> dtNoticia)){
				$dtNoticia = mysqli_real_escape_string($this -> conexao, trim($post_data -> dtNoticia));
			}
			$capa = '';
			if(isset($post_data -> capa)){
				$capa = mysqli_real_escape_string($this -> conexao, trim($post_data -> capa));
			}
	     
			$sql = "INSERT INTO news (titulo, autor, urlNoticia, conteudo, dtNoticia, capa) VALUES ('$titulo', '$autor', '$urlNoticia', '$conteudo', '$dtNoticia', '$capa')";

			$result = $this -> conexao -> query($sql);

			if($result){
		  		return 'Sucesso!';     
			} else {
		   		return 'Houve um erro.';     
			}
		}


    	// Editar
		public function update_news($post_data = array()){
			if(isset($post_data -> idNoticia)){
       			$idNoticia = mysqli_real_escape_string($this -> conexao, trim($post_data -> idNoticia));

				$titulo = '';
				if(isset($post_data -> titulo)){
					$titulo = mysqli_real_escape_string($this -> conexao, trim($post_data -> titulo));
				}
				$autor = '';
				if(isset($post_data -> autor)){
					$autor = mysqli_real_escape_string($this -> conexao, trim($post_data -> autor));
				}
				$urlNoticia = '';
				if(isset($post_data -> urlNoticia)){
					$urlNoticia = mysqli_real_escape_string($this -> conexao, trim($post_data -> urlNoticia));
				}
		    	$conteudo = '';
				if(isset($post_data -> conteudo)){
					$conteudo = mysqli_real_escape_string($this -> conexao, trim($post_data -> conteudo));
		   		}
				$capa = '';
				if(isset($post_data -> capa)){
					$capa = mysqli_real_escape_string($this -> conexao, trim($post_data -> capa));
				}
		     
				$sql = "UPDATE news SET titulo = '$titulo', autor = '$autor', urlNoticia = '$urlNoticia', conteudo = '$conteudo', capa = '$capa' WHERE idNoticia = '$idNoticia'";

				$result = $this -> conexao -> query($sql);

				unset($post_data -> idNoticia);
				if($result){
			  		return 'Sucesso!';
				} else {
			   		return 'Houve um erro.';
				}

			}
		}


    	// Excluir
    	public function delete_news($id){
			if(isset($id)){
				$idNoticia = mysqli_real_escape_string($this -> conexao, trim($id));

				$sql = "DELETE FROM news WHERE idNoticia = $idNoticia";
				$result = $this -> conexao -> query($sql);

			 	if($result){
			  		return 'Sucesso!';
				} else {
		 			return 'Houve um erro.';
				}
			}
		}



		function __destruct() {
	    	mysqli_close($this -> conexao);  
	    }
	}
?>