// Este evendo é acionado após o carregamento da página
jQuery(document).ready(function() {
    //Após a leitura da pagina o evento fadeOut do loader é acionado, esta com delay para ser perceptivo em ambiente fora do servidor.
    jQuery("#loader").delay(1000).fadeOut("slow");
});