// ==UserScript==
// @name	MercadoFacil
// @author	Daniel Plácido (daniel.uramg@gmail.com)
// @website https://www.ideias.pw/mercadofacil-scriptaplicativo-para-mercadolivre/
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @version	2.0.180518.0940
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @updateURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @require	https://www.ideias.pw/userscripts/jquery-2.1.1.min.js
// @require	https://www.ideias.pw/js/jquery-simple-context-menu/jquery.contextmenu.js
// @require	https://www.ideias.pw/userscripts/jquery.cookie.js
// @connect mercadofacil.ideias.pw
// @connect raw.githubusercontent.com
// @connect api.mercadolibre.com
// @connect myaccount.mercadolivre.com.br
// @match	http*://*.mercadolivre.com.br/*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_log
// @grant GM_notification
// @grant window.focus
// @run-at	document-end
// ==/UserScript==

var debug = 0; //mude para 1 para registrar os logs

$(document).ready(function(){
    var version = '2.0.180518.0940';

    //injeta botão de configuração do MercdoFacil
    mfacil_button = '<li role="presentation" id="mfacil_button" class="ch-bellows"><span style="cursor: pointer;" id="mfacil_config" class="ch-bellows-trigger">MercadoFacil</span></li>';
    $('#CONFIG').after(mfacil_button);
    if (debug == 1) GM_log("Link do MercadoFacil injetado"); //debug

    //Classe para a div de configuração e changelog
    $("head").append("<style type='text/css'>#div_mfacil{box-shadow: 0 3px 14px #333; border-radius: 5px; display:block;position:absolute;top:400px;left:50%;margin-left:-300px;margin-top:-300px;padding:10px;width:750px;border:0px solid #000;z-index:100;}</style>");
    div_mfacil_fundo = '<div id="mfacil_fundo" style="  background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1011;"></div>';
    div_mfacil = '<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF">   <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a> ';

    //variávels das configurações salvas do MercadoFacil
    mf_version = GM_getValue("mercadoFacil_version");
    mf_t1 = GM_getValue("mercadoFacil_t1");
    mf_t2 = GM_getValue("mercadoFacil_t2");
    mf_t3 = GM_getValue("mercadoFacil_t3");
    mf_t4 = GM_getValue("mercadoFacil_t4");
    mf_t5 = GM_getValue("mercadoFacil_t5");
    mf_t6 = GM_getValue("mercadoFacil_t6");
    mf_r1 = GM_getValue("mercadoFacil_r1");
    mf_r2 = GM_getValue("mercadoFacil_r2");
    mf_r3 = GM_getValue("mercadoFacil_r3");
    mf_r4 = GM_getValue("mercadoFacil_r4");
    mf_r5 = GM_getValue("mercadoFacil_r5");
    mf_r6 = GM_getValue("mercadoFacil_r6");
    mf_first_install = GM_getValue("mercadoFacil_first_install");
    mf_cumprimento = GM_getValue("mercadoFacil_cumprimento");
    mf_respostas = GM_getValue("mercadoFacil_respostas");
    mf_perguntas = GM_getValue("mercadoFacil_perguntas");
    mf_banners = GM_getValue("mercadoFacil_banners");
    mf_pagamento = GM_getValue("mercadoFacil_pagamento");
    mf_textarea = GM_getValue("mercadoFacil_textarea"); if (mf_textarea == null) mf_textarea = '560';

    //Se for a primeira vez que o script é carregado exibe Div de configuração
    if (mf_first_install != "instalado"){
        mfacil_config();
        if (debug == 1) GM_log("Primeira instalação!"); //debug
    }
    //Se for a primeira vez que o script é carregado exibe Div de configuração

    // se o MercadoFacil foi atualizado exibe o Changelog //
    if (version != mf_version && mf_first_install == "instalado"){
        if (debug == 1) GM_log("MercadoFacil foi atualizado, exibe o Changelog"); //debug
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/changelog.html#" + version,
            //se conseguiu carregar exibe o Changelog e grava a versão para não exibir mais
            onload: function(response){
                $('body').append(div_mfacil_fundo);
                html_changelog = '<h1 class="main-title title title--primary">O MercadoFacil foi atualizado:</h1><hr> <div id="changelog" style="display: block;"></div></div>';
                $('#mfacil_fundo').after(div_mfacil + html_changelog);
                $('#changelog').append(response.responseText);
                GM_setValue("mercadoFacil_version", version);
            },
            onerror: function(res){
                alert("O MercadoFacil foi atualizado mas houve um erro ao carregar o Changelog para te mostrar as alterações, atualize a página para tentar novamente");
            }
        });
    }
    // se o MercadoFacil foi atualizado exibe o Changelog //

    // VERIFICA PERGUNTAS PENDENTES //
    var alertHtml5 = {
        title: 'MercadoFácil',
        text: 'Você tem perguntas para responder!',
        image: 'https://www.ideias.pw/logo-ml.jpg',
        timeout: 10000,
        onclick: function() { window.focus(); },
    };
    function verifica_perguntas(){
        contador_perguntas = $('.ml-count').html();
        if (contador_perguntas >= 1 && location.host == "questions.mercadolivre.com.br"){
            if (debug == 1) GM_log("Tem perguntas para responder!"); //debug
            GM_notification(alertHtml5);
            //document.getElementById("alert").innerHTML="<embed src='https://www.ideias.pw/alert.mp3' hidden=true autostart=true loop=false>";
            var player = document.createElement('audio');
            player.src = 'https://www.ideias.pw/alert.mp3';
            player.preload = 'auto';
            player.volume = 1.0;
            player.controls = false;
            player.play();
            document.getElementById("alert").innerHTML="<embed src='https://www.ideias.pw/alert.mp3' hidden=true autostart=true loop=false>";
        }
    }
    function loop_perguntas(){
        setTimeout(function(){
            if (debug == 1) GM_log("verificou perguntas"); //debug
            verifica_perguntas();
            loop_perguntas();
        },30000);
    }
    if (mf_perguntas == 'checked'){
        $('body').after('<div id="alert"></div>');
        loop_perguntas();
    }
    // VERIFICA PERGUNTAS PENDENTES //

    //VERIFICAÇÃO DE PAGAMENTO LIBERADO //
    function verifica_pagamento(){
        if (debug == 1) GM_log('Verificando pagamentos...'); //debug
        conta_vendas = $('.myml-ui-item-container').length+1;  //conta quantas vendas tem na pagina
        for (i = 2; i <= conta_vendas; i++){
            item_lista = $('input', $('.myml-ui-item-container:nth-child('+i+')')).attr('data-order-id');
            if (debug == 1) GM_log('Verificando venda: ' + item_lista); //debug
            confere = $('#mf_pgto'+item_lista).length; //variavel que verifica quantos caractéres tem na DIV

            //verifica se existe a DIV pra injetar a informação, se existir é porque já foi inserira e não executa novamenete
            if(  confere <= 0 ){
                //$('div[data-note-id='+item_lista+']').before('<div id="mf_pgto' + item_lista + '"></div>'); //injeta DIV pra inserir a informação
                $('input[data-order-id='+item_lista+']').before('<div id="mf_pgto' + item_lista + '"></div>'); //injeta DIV pra inserir a informação
                carregar_pagamento(item_lista);
            }
        }
    }

    function loop_pagamento(){
        setTimeout(function(){
            verifica_pagamento();
            loop_pagamento();
        },8000);
    }

    function carregar_pagamento(id_venda){

        $('#mf_pgto'+id_venda).load('/sales/'+ id_venda + '/detail .sales-payment-received__description', function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success"){
                if (debug == 1) GM_log('Informação de pagamento adicionada, venda: ' + id_venda); //debug
                if (responseTxt.search('hoje') >= 1) pgto_hoje += 1;
                if (responseTxt.search('a partir de amanhã') >= 1) pgto_amanha += 1;
                if (responseTxt.search('Por um erro nosso') >= 1) pgto_erro += 1;
                $('#mf_sit_pgtos').empty();
                $('#mf_sit_pgtos').append('<b>Foi encontrado <span style="color: red;">' + pgto_erro + '</span> pagamento(s) com erro, hoje será liberado <span style="color: red;">' + pgto_hoje + '</span> pagamento(s), e amanhã sera liberado <span style="color: red;">' + pgto_amanha + '</span> pagamento(s)!</b>');
            }
            if(statusTxt == "error")
                alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }

    if(location.href.search('/sales/list') >=1 && mf_pagamento == 'checked'){
        pgto_hoje = 0; pgto_amanha = 0; pgto_erro = 0;
        $('.ch-tabs-triggers').after('<p id="mf_sit_pgtos"></p>');
        loop_pagamento();
    }
    //VERIFICAÇÃO DE PAGAMENTO LIBERADO //

    // FUNÇÃO QUE RETORNA O CUMPRIMENTO DE ACORDO COM O HORÁRIO //
    data = new Date();
    function hello(){ //cria variavel de boas vindas
        if (data.getHours() >= 0 && data.getHours() <= 12){
            return "Bom dia";
        } else if (data.getHours() >= 13 && data.getHours() <= 17){
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    }
    // FUNÇÃO QUE RETORNA O CUMPRIMENTO DE ACORDO COM O HORÁRIO //

    //FUNÇÃO PARA MARCAR AS COMPRAS DE QUEM QUALIFICOU POSITIVO //
    //da um delay pra pagina carregar as vendas
    setTimeout(function(){
        //verifica se está na página de vendas Encerradas
        if(location.href.search('type=archived') >=1 ){
            //injeta o botão
            $('#tab-archived').after('<input type="button" id="mf_mk_qualif" value="Marcar Positivos" class="ch-btn-skin ch-btn-small">');
        }
    },6000);

    //função que roda depois do clique
    $(document).on('click', '#mf_mk_qualif', function(){
        //conta quantas vendas tem na pagina
        conta_vendas = $('#itemsList .item-list').length;

        for (i = 1; i <= conta_vendas; i++){
            //pega o ID da venda
            id_venda = $('.item-list:nth-child('+i+')').attr('id').replace('theItemRow', '');
            //retorna a string de qualificação
            qualif = $('#itemRow' + id_venda + ' #calificationBuyer' + id_venda + ' .item-status-aligner').html();
            //se foi qualificado Positivo da um clique para marcar esta venda
            if (qualif == 'Você foi qualificado positivo'){
                $('#' + id_venda).click();
            }
        }
    });
    //FUNÇÃO PARA MARCAR AS COMPRAS DE QUEM QUALIFICOU POSITIVO //

    //aumentar area de texto da criação de anuncios, delay de 5 segundos pra carregar o frame
    setTimeout(function(){
        $('#full-description_ifr').removeAttr('style');
        $('#full-description_ifr').attr('style', 'width: 100%; height: ' + mf_textarea + 'px; display: block;');
    },5000);

    //remove banners de publicidade da página de gerenciamento de vendas, resumo, etc
    if (mf_banners == 'checked'){
        setTimeout(function(){
            $('#oas').remove(); //banner lateral da págida ne resumo
            $('#oasLEFT').remove();  //banner lateral da págida ne resumo
            $('#oasTOP').remove(); //banner no topo da págida ne vendas
            $('.banner-container').remove(); //banner no topo na página de buscas
        },3000);
    }

    // FORM DE CONFIGURAÇÃO DO MERCADOFACIL //
    function mfacil_config(){
        //injeta mascara de fundo e div com o formulário
        $('body').append(div_mfacil_fundo);
        html_form_mfacil = '<a href="https://www.ideias.pw/mercadofacil-scriptaplicativo-para-mercadolivre/" target="_blank"><h1 class="main-title title title--primary">MercadoFacil</h1></a><a href="https://www.ideias.pw/script-de-chat-de-suporte-do-mercadolivre/" target="_blank"> <span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;position: absolute;right: 50px;top: 25px;" title="Iniciar Chat com MercadoLivre!"> Iniciar chat </span> </a><hr>   <input type="hidden" id="mfacil_first_install" value="instalado">         <table>     <tbody>       <tr title="Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário">         <td>Ativar/Desativar cumprimento automático</td>         <td> &nbsp;<input type="checkbox" id="mfacil_cumprimento" ' + mf_cumprimento + '></td>       </tr>       <tr title="Remover banners de publicidade da página de Resumo">         <td>Remover banners de publicidade da página de Resumo </td>         <td> &nbsp;<input type="checkbox" id="mfacil_banners" ' + mf_banners + '></td>       </tr>       <tr title="Exibe a situação de cada pagamento na página de Vendas Abertas ou Encerradas">         <td>Ativar/Desativar verificação de pagamento liberado</td>         <td> &nbsp;<input type="checkbox" id="mfacil_pagamento" ' + mf_pagamento + '></td>       </tr>       <tr title="Ajusta a altura da Textarea de criação de anuncios">         <td>Altura da Textarea de criação de anúncios</td>         <td> &nbsp;<input type="text" id="mfacil_textarea" value="' + mf_textarea + '" size="5"> px (padrão 560px)</td>       </tr>       <tr title="Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta">         <td>Ativar/Desativar verificação de perguntas pendentes</td>         <td> &nbsp;<input type="checkbox" id="mfacil_perguntas" ' + mf_perguntas + '></td>       </tr>       <tr title="Quando ativo, você clica com o botão direito no campo para responder alguma pergunta e escolhe uma de suas respostas prontas para preenchimento automático">         <td>Ativar/Desativar Respostas prontas</td>         <td> &nbsp;<input type="checkbox" id="mfacil_respostas" ' + mf_respostas + '></td>       </tr>     </tbody>   </table>   <div id="respostas_prontas" style="display: none;">     <table>       <thead>         <tr>           <th>Título</th>           <th>Resposta</th>         </tr>       </thead>       <tbody>         <tr>           <td> <input type="text" id="mfacil_tit1" value="' + mf_t1 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res1" value="' + mf_r1 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit2" value="' + mf_t2 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res2" value="' + mf_r2 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit3" value="' + mf_t3 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res3" value="' + mf_r3 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit4" value="' + mf_t4 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res4" value="' + mf_r4 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit5" value="' + mf_t5 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res5" value="' + mf_r5 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit6" value="' + mf_t6 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res6" value="' + mf_r6 + '" size="50"> </td>         </tr>       </tbody>     </table>   </div>   <button id="mfacil_salvar" class="ch-btn">Salvar</button>     <hr/> <center>     <h2>Esta ferramenta tem sido útil pra você? Considere uma doação!</h2>     <table>       <tr>         <td> <!-- INICIO FORMULARIO BOTAO PAGSEGURO --> <form action="https://pagseguro.uol.com.br/checkout/v2/donation.html" method="post"> <!-- NÃO EDITE OS COMANDOS DAS LINHAS ABAIXO --> <input type="hidden" name="currency" value="BRL" /> <input type="hidden" name="receiverEmail" value="daniel.uramg@gmail.com" /> <input type="image" src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/doacoes/120x53-doar-laranja.gif" name="submit" alt="Doar com PagSeguro - é rápido, grátis e seguro!" /> </form> <!-- FINAL FORMULARIO BOTAO PAGSEGURO --></td>   <td> </td> <td> <a target="_blank" href="https://www.mercadopago.com/mlb/checkout/start?pref_id=152504742-5ace1e3c-2f5b-455f-bc11-00cff180a598"><img src="https://www.ideias.pw/doar-mp.png"/></a><td>    </tr>     </table>   </center>';
        $('#mfacil_fundo').after(div_mfacil + html_form_mfacil);
        if (mf_respostas == 'checked') $('#respostas_prontas').attr('style', 'display: block;');
    }

    $(document).on('click', '#mfacil_config', function(){ //quando for clicado no menu de config das respostas
        mfacil_config();
    });

    //exibir e ocultar os campos de respostas prontas
    $(document).on('click', '#mfacil_respostas', function(){
        respostas_ativas = $('#mfacil_respostas').is(":checked");
        if (respostas_ativas == true){
            $('#respostas_prontas').attr('style', 'display: block;');
        }else{
            $('#respostas_prontas').attr('style', 'display: none;');
        }
    });
    // FORM DE CONFIGURAÇÃO DO MERCADOFACIL //

    // SALVAR FORM DO MERCADOFACIL //
    $(document).on('click', '#mfacil_salvar', function(){
        GM_setValue ("mercadoFacil_t1", $('#mfacil_tit1').val());
        GM_setValue ("mercadoFacil_t2", $('#mfacil_tit2').val());
        GM_setValue ("mercadoFacil_t3", $('#mfacil_tit3').val());
        GM_setValue ("mercadoFacil_t4", $('#mfacil_tit4').val());
        GM_setValue ("mercadoFacil_t5", $('#mfacil_tit5').val());
        GM_setValue ("mercadoFacil_t6", $('#mfacil_tit6').val());
        GM_setValue ("mercadoFacil_r1", $('#mfacil_res1').val());
        GM_setValue ("mercadoFacil_r2", $('#mfacil_res2').val());
        GM_setValue ("mercadoFacil_r3", $('#mfacil_res3').val());
        GM_setValue ("mercadoFacil_r4", $('#mfacil_res4').val());
        GM_setValue ("mercadoFacil_r5", $('#mfacil_res5').val());
        GM_setValue ("mercadoFacil_r6", $('#mfacil_res6').val());
        GM_setValue ("mercadoFacil_textarea", $('#mfacil_textarea').val());
        GM_setValue ("mercadoFacil_first_install", $('#mfacil_first_install').val());

        if ($("#mfacil_cumprimento").is(":checked") == true){
            mfacil_cumprimento = "checked";
        } else {
            mfacil_cumprimento = "";
        }
        GM_setValue ("mercadoFacil_cumprimento", mfacil_cumprimento);

        if ($("#mfacil_banners").is(":checked") == true){
            mfacil_banners = "checked";
        } else {
            mfacil_banners = "";
        }
        GM_setValue ("mercadoFacil_banners", mfacil_banners);

        if ($("#mfacil_pagamento").is(":checked") == true){
            mfacil_pagamento = "checked";
        } else {
            mfacil_pagamento = "";
        }
        GM_setValue ("mercadoFacil_pagamento", mfacil_pagamento);

        if ($("#mfacil_respostas").is(":checked") == true){
            mfacil_respostas = "checked";
        } else {
            mfacil_respostas = "";
        }
        GM_setValue ("mercadoFacil_respostas", mfacil_respostas);

        if ($("#mfacil_perguntas").is(":checked") == true){
            mfacil_perguntas = "checked";
        } else {
            mfacil_perguntas = "";
        }
        GM_setValue ("mercadoFacil_perguntas", mfacil_perguntas);

        alert("Configurações salvas com sucesso!");
        location.reload();
    });
    // SALVAR FORM DO MERCADOFACIL //



    /******************** NA PAGINA DE PERGUNTAS ********************/

    if ( location.host == 'questions.mercadolivre.com.br' ) {
        if (debug == 1) GM_log("Funções da pagina de perguntas"); //debug

        //*************** PREENCHER BOAS VINDAS NO CAMPO DE RESPONDER PERGUNTAS *****************//
        if (mf_cumprimento == 'checked'){
            function cumprimento(){
                $('textarea').click(function(e){
                    if (debug == 1) GM_log(e.target + " clicado"); //debug
                    if (! $(e.target).attr('comp') && $(e.target).attr('name') == 'text' ){ //se existir a variaves as boas-vindas nao serao preenchidas
                        $(e.target).val(hello() + ", ");
                        $(e.target).attr('comp', '1'); //atributo para so preencher as boas vindas uma vez
                    }
                });
            }

            function loop_cumprimento(){
                setTimeout(function(){
                    if (debug == 1) GM_log('loop cumprimento'); //debug
                    cumprimento();
                    loop_cumprimento();
                },3500);
            }
            loop_cumprimento();
        }
        //*************** PREENCHER BOAS VINDAS NO CAMPO DE RESPONDER PERGUNTAS *****************//

        /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/
        if (mf_respostas == 'checked'){
            function respostas_prontas(){
                //Injeta menu de contexto somente mas textarea que NÃO contém o o atributo 'mf_context=1'
                $('textarea:not([mf_context="1"])').contextPopup({
                    title: 'Respostas Prontas:',
                    items: [
                        {label:mf_t1, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r1);
                        }
                        },
                        {label:mf_t2, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r2);
                        }
                        },
                        {label:mf_t3, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r3);
                        }
                        },
                        {label:mf_t4, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r4);
                        }
                        },
                        {label:mf_t5, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r5);
                        }
                        },
                        {label:mf_t6, action:function(e) {
                            currentText = $(e.target).val();
                            $(e.target).val(currentText + mf_r6);
                        }
                        },
                    ]
                });
                //Injeta o attributo mf_context nas textarea para não injetar o menu de contexto novamente
                $('textarea').attr('mf_context', 1);
            }

            function loop_respostas_prontas(){
                setTimeout(function(){
                    if (debug == 1) GM_log('loop respostas prontas'); //debug
                    respostas_prontas();
                    loop_respostas_prontas();
                },3500);
            }

            //Injeta classe CSS do jQuery Context Menu
            cssdata = " .contextMenuPlugin {   -webkit-user-select: none;   display: none;   font-family: tahoma, arial, sans-serif;   font-size: 11px;   position: absolute;   left: 100px;   top: 100px;   min-width: 100px;   list-style-type: none;   margin: 0;   padding: 0;   background-color: #f7f3f7;   border: 2px solid #f7f7f7;   outline: 1px solid #949694; }  .contextMenuPlugin > li {   margin: 0 0 0 0;   padding: 1px;   background-repeat: no-repeat; }  .contextMenuPlugin > li > a {   position: relative;   display: block;   padding: 3px 3px 3px 28px;   color: ButtonText;   text-decoration: none;   margin: 1px; }  .contextMenuPlugin > li > a img {   position: absolute;   left: 3px;   margin-top: -2px;   width: 16px;   height: 16px; } .contextMenuPlugin > li > a:hover {   border: 1px solid #fffbff;   outline: 1px solid #b5d3ff;   margin: 0;   background: -moz-linear-gradient(top, rgba(239,239,255,0.5) 0%, rgba(223,223,255,0.5) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,255,0.5)), color-stop(100%,rgba(223,223,255,0.5))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80efefff', endColorstr='#80dfdfff',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* W3C */   cursor: default; }  .contextMenuPlugin > li.disabled {   pointer-events: none; }  .contextMenuPlugin > li.disabled a {   color: grey; }  .contextMenuPlugin > li.disabled > a:hover {   border: none;   outline: none; }  .contextMenuPlugin > li.divider {   border-top: 1px solid #e7e3e7;   border-bottom: 1px solid #ffffff;   height: 0;   padding: 0;   margin: 5px 0 5px 27px; }  .contextMenuPlugin > .header {   background: rgb(90,90,90); /* Old browsers */   background: -moz-linear-gradient(top, rgba(90,90,90,1) 0%, rgba(20,20,20,1) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(90,90,90,1)), color-stop(100%,rgba(20,20,20,1))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a5a5a', endColorstr='#141414',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* W3C */   position: relative;   cursor: default;   padding: 3px 3px 3px 3px;   color: #ffffff; }  .contextMenuPlugin > .gutterLine {   position: absolute;   border-left: 1px solid #e7e3e7;   border-right: 1px solid #ffffff;   width: 0;   top: 0;   bottom: 0;   left: 26px;   z-index: 0; } ";
            $("head").append("<style type='text/css'>"+cssdata+"</style>");
            loop_respostas_prontas();

        }
        /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/
    }

    /******************** NA PAGINA DE PERGUNTAS ********************/

    /******************** BLOQUEIO DE USUÁRIOS ********************/

    //injeta botão de usuários bloqueados do MercdoFacil
    mfacil_block_users = '<li role="presentation" class="ch-bellows"><span style="cursor: pointer;" id="mfacil_bl_users" class="ch-bellows-trigger">Usuários Bloqueados</span></li>';
    $('#mfacil_button').after(mfacil_block_users);
    if (debug == 1) GM_log("Link do Bloqueio de usuários injetado"); //debug
    $(document).on('click', '#mfacil_bl_users', function(){
        //Define Timestrap atual pra tornar a HTML "incacheavel", para em caso de alterações não ter problema em função do cache
        var agora = Math.round(new Date().getTime()/1000);
        GM_xmlhttpRequest({
            method: "GET",
            overrideMimeType: "text/html; charset=UTF-8",
            url: "https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/lockusers.html?time=" + agora,
            //se conseguiu carregar exibe o Changelog e grava a versão para não exibir mais
            onload: function(response){
                $('body').append(div_mfacil_fundo);
                html_bloqueio = '<a href="https://www.ideias.pw/mercadofacil-scriptaplicativo-para-mercadolivre/" target="_blank"><h1 class="main-title title title--primary">MercadoFacil</h1></a><a href="https://www.ideias.pw/script-de-chat-de-suporte-do-mercadolivre/" target="_blank"> <span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;position: absolute;right: 50px;top: 25px;" title="Iniciar Chat com MercadoLivre!"> Iniciar chat </span> </a><hr> <div id="mf_lockusers" style="display: block;"> </div>';
                $('#mfacil_fundo').after(div_mfacil + html_bloqueio);
                $('#mf_lockusers').append(response.responseText);
            },
            onerror: function(res){
                alert("Houve um erro ao tentar receber a tabela de usuários bloqueados, atualize a página e tente novamente.");
            }
        });
    });

    $(document).on('click', '#mfacil_bl_users', function(){
        /** CRIAR COOKIE
 * strCookie = Nome do cookie
 * strValor = Valor que sera salvo no cookie
 * lngDias = Dias de validade do cookie
 */
        function gerarCookie(strCookie, strValor, lngDias) {
            $.cookie(strCookie, strValor, {
                expires : lngDias
            });
        }

        /** LER COOKIE
 * nomeCookie = Nome que foi dado ao cookie durante a criação
 */
        function LerCookie(nomeCookie) {
            if ( $.cookie(nomeCookie) )
                return $.cookie(nomeCookie);
            else
                return false;
        }

        /** APAGAR COOKIE
 * strCookie = Nome do cookie
 */
        function apagarCookie(strCookie) {
            $.cookie(strCookie, null);
        }

        //Le a ID do usuário gravada no cookie
        my_id = LerCookie('my_id');
        mf_access_token = LerCookie('mf_access_token');

        function get_id(){
            if (debug == 1) GM_log('Não existe a ID do usuário armazenada, requisita a ID...');
            //Primeiro captura o Username do usuário
            $.get("https://myaccount.mercadolivre.com.br/profile", function(data, status){
                username = $('.ch-form-row span', $(data)).html();
                if (debug == 1) GM_log("Username capturado: " + username);
                //Agora captura a ID com o Username
                $.getJSON("https://api.mercadolibre.com/sites/MLB/search?nickname=" + username, function(data){
                    user_id = data.seller.id;
                    if (debug == 1) GM_log("user_id capturada: " + user_id);
                    gerarCookie('my_id', user_id, 365);
                });
            });
        }
        //Le a ID do usuário gravada no cookie

        //Obter o Token
        //Define a variável de refeência para o getToken() ser executado somente uma vez
        var contador = 0;
        function getToken(){
            //Soma +1 na variável de refeência para garantir a execuição do getToken() apenas uma vez
            if (contador < 1){
                contador += 1;
                if (debug == 1) GM_log('dentro da func. contador = ' + contador);
                var my_id = LerCookie('my_id');
                //Se não existir my_id requisita ela, da um tempo e chama novamente a getToken()
                if (my_id == ''){
                    if (debug == 1 ) GM_log('my_id não encontrado dentro da getToken()....');
                    get_id();
                    setTimeout(function(){
                        getToken();
                    },3500);
                }
                else{
                    my_id = LerCookie('my_id');
                    if (debug == 1) GM_log("Dentro da getToken()..");
                    //Define variavel com timestrap atual para comparar com o vencimento do token
                    var agora = Math.round(new Date().getTime()/1000);
                    //requisita o access_token previamente armazenado
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x75\x73\x65\x72\x73\x2F"+my_id+"\x2E\x78\x6D\x6C\x3F\x74\x69\x6D\x65\x3D"+agora,
                        overrideMimeType: "text/xml",
                        onload: function(xml){
                            if (debug == 1) GM_log('Dentro do request do xml');
                            console.log(xml);
                            //se o status do XML for 404 é porque o usuário não se autenticou então abre a janela para autorizar o app
                            if (xml.status == '404'){
                                if (debug == 1) GM_log("O XML do usuário não foi encontrado. " + xml.status);
                                if (debug == 1) GM_log('Token não existe, abre janela para autenticar');
                                window.open("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70","janela1","width=600, height=600, directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no");
                            }
                            //se foi encontrado HTML no XML é porque o usuário não se autenticou então abre a janela para autorizar o app
                            $(xml.responseXML).find('html').each(function () {
                                if (debug == 1) GM_log("O XML do usuário não foi encontrado. " + xml.status);
                                if (debug == 1) GM_log('Token não existe, abre janela para autenticar');
                                window.open("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70","janela1","width=600, height=600, directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no");
                            });
                            $(xml.responseXML).find('users').each(function () {
                                mf_access_token = $(this).find('access_token').text();
                                if (debug == 1) GM_log('acces_token recebido do XML: ' + mf_access_token);
                                expires_in = $(this).find('expires_in').text();
                                //se o token ja tiver expirado, chama o script que renova o token
                                if (expires_in < agora){
                                    if (debug == 1) GM_log('Token venceu, renovar..');
                                    if (debug == 1) GM_log('Agora: ' + agora);
                                    if (debug == 1) GM_log('expires_in: ' + expires_in);
                                    $.getJSON("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x72\x65\x6E\x65\x77\x5F\x74\x6F\x6B\x65\x6E\x2E\x70\x68\x70\x3F\x75\x73\x65\x72\x5F\x69\x64\x3D" + my_id, function(retorno){
                                        //se não existir o token provavelmente o usuario nunca se autenticou, então abre a janela para autorizar o app
                                        if (retorno.access_token == ''){
                                            if (debug == 1) GM_log('Token não existe, abre janela para autenticar');
                                            window.open("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70","janela1","width=600, height=600, directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no");
                                        }
                                        //se recebeu o token, grava ele no cookie
                                        else{
                                            apagarCookie('mf_access_token');
                                            gerarCookie('mf_access_token', retorno.access_token, 1);
                                        }
                                    });
                                }
                                //token gravado no servidor ainda ta valendo, grava ele no cookie
                                else{
                                    if (debug == 1) GM_log("access_token já gravado: " + mf_access_token);
                                    apagarCookie('mf_access_token');
                                    gerarCookie('mf_access_token', mf_access_token, 1);
                                }
                            });
                        },
                        onerror: function(res){
                            if (debug == 1) GM_log("Ocorreu um erro inesperado durante a requisição do token. " + res.statusText);
                            if (debug == 1) GM_log('Token não existe, abre janela para autenticar');
                            window.open("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70","janela1","width=600, height=600, directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no");
                        }
                    });
                    setTimeout(function(){
                        getlocks();
                    },2500);
                }
            }
            else{
                if (debug == 1) GM_log('fora da func. contador = ' + contador);
            }
        }
        //Obter o Token

        //Mostrar usuários bloqueados
        function getlocks(){
            mf_access_token = LerCookie('mf_access_token');
            my_id = LerCookie('my_id');
            //Se não existir access_token requisita ele, da um tempo e chama novamente a getlocks()
            if (mf_access_token == ''){
                if (debug == 1 ) GM_log('access_token não encontrado dentro da getlocks()....');
                getToken();
                setTimeout(function(){
                    getlocks();
                },3500);
            }
            else{
                if (debug == 1) GM_log('dentro do getlocks()');
                //Limpa a tabela com os dados
                $('#employeed_table').empty();
                //Requisita a lista de usuarios bloqueados
                $.getJSON("https://api.mercadolibre.com/users/" + my_id + "/order_blacklist?access_token=" + mf_access_token, function(data){
                    // cria um "for assíncrono", passando o ponteiro inicial '0', a variável 'data' e um 'callback'
                    forAsync(0, data, function(employee_data){
                        // após a função executar todas as requisições, será retornada a variável employee_data
                        $('#employeed_table').append(employee_data);
                    });
                })
                    .fail(function(data) {
                    if (data.responseJSON.message == "invalid_token"){
                        if (debug == 1) GM_log("Token inválido, renovar o token");
                    }
                    getToken();
                });
                //Cria um loop sobre cada usuario bloqueado, para capturar os dados de cada usuario pela ID
                function forAsync(i, data, callback, employee_data = null) {
                    if(employee_data == null) {
                        employee_data = '';
                    }
                    if(data.length > 0) {
                        employee_data += '<tr>';
                        //Captura os dados do respectivo usuário
                        $.getJSON("https://api.mercadolibre.com/users/" + data[i].user.id + "?access_token=" + mf_access_token, function(valor){
                            username = valor.nickname;
                            registration_date = valor.registration_date;
                            registration_date = registration_date.substr(8,2) + "/" + registration_date.substr(5,2) + "/" + registration_date.substr(0,4) + " - " + registration_date.substr(11,2) + ":" + registration_date.substr(14,2);
                            city = valor.address.state + " - " + valor.address.city;
                            points = valor.points;
                            permalink = valor.permalink;
                            employee_data += "<td><a target='_blank' href='" + permalink + "'>" + username + " (" + points + ")</a></td>";
                            employee_data += '<td>' + city	 + '</td>';
                            employee_data += '<td>' + registration_date + '</td>';
                            employee_data += '<td>' + data[i].user.id + '</td>';
                            employee_data += '<td align="center"><a href="#" id="unlock" username="' + username + '" user_id="' + data[i].user.id + '"><font color="#FF0000"><b>X</b></font></a></td>';
                            employee_data += '</tr>';
                            i++;

                            if(i < data.length) {
                                forAsync(i, data, callback, employee_data);
                            }
                            else {
                                callback(employee_data);
                            }
                        });
                    }
                    else {
                        callback(employee_data);
                    }
                }
            }
        }
        //Mostrar usuários bloqueados

        //Desbloquear usuário
        $(document).on('click', '#unlock', function(){
            mf_access_token = LerCookie('mf_access_token');
            my_id = LerCookie('my_id');
            user_id = $(this).attr('user_id');
            username = $(this).attr('username');
            x = confirm('Deseja desbloquear o ' + username + '?');
            if (x == true){
                GM_xmlhttpRequest({
                    url: "https://api.mercadolibre.com/users/" + my_id + "/order_blacklist/" + user_id + "?access_token=" + mf_access_token,
                    method: 'DELETE',
                    overrideMimeType: "application/json",
                    headers: {"Accept": "application/json"},
                    onload: function(retorno){
                        if (debug == 1) GM_log(retorno);
                        getlocks();
                    },
                    onerror: function(result){
                        alert("Ocorreu um erro: " + result.message);
                    }
                });
            }
        });
        //Desbloquear usuário

        //Bloquear usuário
        $(document).on('click', '#block', function(){
            mf_access_token = LerCookie('mf_access_token');
            my_id = LerCookie('my_id');
            username = $('#username').val();
            if(username){
                $.getJSON("https://api.mercadolibre.com/sites/MLB/search?nickname=" + username, function(data){
                    var user_id = data.seller.id;
                    $.ajax({
                        url: "https://api.mercadolibre.com/users/" + my_id + "/order_blacklist?access_token=" + mf_access_token,
                        type: 'POST',
                        data: JSON.stringify({ user_id: user_id }),
                        success: function(result){
                            if (debug == 1) GM_log("Usuário bloqueado: " + result.user_blocked);
                            getlocks();
                        },
                        error: function(result){
                            alert("Ocorreu um erro: " + result.message);
                        }
                    });
                });
            }
        });
        //Bloquear usuário

        //Chama a função pra exibir os bloqueados
        getlocks();
    });
    /******************** BLOQUEIO DE USUÁRIOS ********************/

});
