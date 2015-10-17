// ==UserScript==
// @name	MercadoFacil
// @website https://github.com/danieluramg/MercadoFacil/
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @author	Daniel Plácido (daniel.uramg@gmail.com)
// @contributor	Marco Silveira (vastar@globo.com)
// @version	0.41
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @updateURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @require	http://ideias.2p.fm/js/jquery-simple-context-menu/jquery.contextmenu.js
// @match	http://*.mercadolivre.com.br/*
// @match	https://*.mercadolivre.com.br/*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_log
// @run-at	document-end
// ==/UserScript==

debug = 0; //mude para 1 para registrar os logs

$(document).ready(function(){
    version = '0.41';

    //injeta botão de configuração do MercdoFacil
    mfacil_button = '<li role="presentation" class="ch-bellows"><a href="#" id="mfacil_config" class="ch-bellows-trigger">MercadoFacil</a></li>';
    $('#CONFIG').after(mfacil_button);

    //Classe para a div de configuração e changelog
    $("head").append("<style type='text/css'>#div_mfacil{box-shadow: 0 3px 14px #333; border-radius: 5px; display:block;position:absolute;top:400px;left:50%;margin-left:-300px;margin-top:-300px;padding:10px;width:750px;border:0px solid #000;z-index:100;}</style>");

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
    mf_chat = GM_getValue("mercadoFacil_chat");
    mf_delay_chat = GM_getValue("mercadoFacil_delay_chat"); if (mf_delay_chat == null) mf_delay_chat = '1000';
    mf_textarea = GM_getValue("mercadoFacil_textarea"); if (mf_textarea == null) mf_textarea = '560';

    //Se for a primeira vez que o script é carregado exibe Div de configuração
    if (mf_first_install != "instalado"){
        mfacil_config();
    }

    // se o MercadoFacil foi atualizado exibe o Changelog //
    if ( version != mf_version){
        $('body').append('<div id="mfacil_fundo" style="  background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1011;"></div>');
        html_changelog = '<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF">   <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a> <h1 class="main-title title title--primary">O MercadoFacil foi atualizado:</h1> <div id="changelog" style="display: block;"></div></div>';
        $('#mfacil_fundo').after(html_changelog);
        $('#changelog').load('https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/changelog.html');
        GM_setValue("mercadoFacil_version", version);
    }
    // se o MercadoFacil foi atualizado exibe o Changelog //

    // VERIFICA PERGUNTAS PENDENTES //
    function verifica_perguntas(){
        contador_perguntas = $('.ml-count').html();
        if (contador_perguntas >= 1){
            if (debug == 1) GM_log("Tem perguntas para responder!"); //debug
            document.getElementById("alert").innerHTML="<embed src='https://www.webtrackerencomendas.com.br/alert.mp3' hidden=true autostart=true loop=false>";
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
        conta_vendas = $('#itemsList .item-list').length; //conta quantas vendas tem na pagina

        for (i = 1; i <= conta_vendas; i++){
            item_lista = $('.item-list:nth-child('+i+')').attr('id').replace('theItemRow', ''); //pega o ID da venda

            confere = $('#mf_pgto'+item_lista).length; //variavel que verifica quantos caractéres tem na DIV

            //verifica se existe a DIV pra injetar a informação, se existir é porque já foi inserira e não executa novamnete
            if(  confere <= 0 ){ 
                $('#noteRow'+item_lista).before('<div id="mf_pgto' + item_lista + '"></div>'); //injeta DIV pra inserir a informação
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
        $('#mf_pgto'+id_venda).load('/sales/obtainOrdersData?orderId='+ id_venda + ' #textMedioPago', function(responseTxt, statusTxt, xhr){
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
        $('.myml-title').after('<p id="mf_sit_pgtos"></p>');
        loop_pagamento();
    }
    //VERIFICAÇÃO DE PAGAMENTO LIBERADO //

    //  PAGINA DE AJUDA E CONTATO //
    if (location.href == 'http://contato.mercadolivre.com.br/ajuda' && mf_chat == 'checked'){
        // testa para saber se ja foi registrado o userName do usuário
        if (GM_getValue("mercadoFacil_userName")==null){

            //captura username e armazena
            user_name = $('label[for="nav-header-user-switch"]').html().replace('<!--[if lt IE 9]><a href="https://myaccount.mercadolivre.com.br/summary/" rel="nofollow"><![endif]-->', '').replace('<!--[if lt IE 9]></a><![endif]-->', '').replace(' <i class="nav-icon-user"></i>', '').replace(/^\s+|\s+$/g,"");
            GM_setValue ("mercadoFacil_userName", user_name);
            //capturar user_id e armazena
            $.getJSON('https://api.mercadolibre.com/sites/MLB/search?nickname=' + user_name + '#json', function(jd) {
                user_id = (jd.seller.id);
                GM_setValue ("mercadoFacil_userID", user_id);
            });
            location.reload();

        }else{
            // mostra o link para o chat
            user_name = GM_getValue("mercadoFacil_userName");
            user_id = GM_getValue("mercadoFacil_userID");
            chat_call_button = '<p style="font-size:20px"><a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null">Iniciar o chat com um representante</a><script type="text/javascript">function runChat() {if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\';var winName = \'Chat\';var winURL = \'https://chat.mercadolivre.com.br/\';window.chatWindow=window.open(\'about:blank\',winName,winOpts);var webchatForm = document.createElement(\'form\');webchatForm.setAttribute(\'action\', winURL);webchatForm.style.display=\'none\';webchatForm.setAttribute(\'target\',winName);webchatForm.setAttribute(\'method\',\'post\');var e = document.createElement(\'input\');e.setAttribute(\'name\',\'userData\');e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":"","available_place_in_queue":"","allow_render":true,"user":{"user_id":"'+user_id+'","nickname":"'+user_name+'","first_name":"'+user_name+'","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","segment":"LONG_TAIL","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"group":"ML_PORTAL_HOME","idx":2,"article_number":"","articleDescription":"HomeNewPortal","sf":{"from_nw_mlportal__c":true},"lang":"pt_BR"}));webchatForm.appendChild(e);document.body.appendChild(webchatForm);webchatForm.submit();setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000);}window.chatWindow.focus();}</script></p>';
            $('.secondary-content').before(chat_call_button);
        }
    }
    //  PAGINA DE AJUDA E CONTATO //

    //  PAGINA DE REUSMO //
    if ( location.href.search('/summary') >= 1 && mf_chat == 'checked' ) insertChatResumo();
    //  PAGINA DE REUSMO //

    // NO CHAT //
    if (location.href == 'https://chat.mercadolivre.com.br/'){
        //$("h3").before("<span> (Autoreload)</span>"); //insere titulo
        setTimeout(function(){ //Recarregar página de chat a cada X milisegundos até aparecer alguém
            if ( $('#user').html() == "Ops! Não tem ninguém disponível agora. Por favor, tente em alguns minutos" || $('#user').html() == "Ups...en este momento estamos trabajando para atenderte por chat. Por favor vuelve a contactarnos en unos minutos."){
                $('<span> - (reload)</span>').appendTo('#user');
                location.reload();
            }
        },mf_delay_chat);
    }
    // NO CHAT //

    // FUNÇÃO PARA INSERIR CHAT NA PAGINA DE RESUMO E ARMAZENAR ID DO USUARIO PARA CHAT NA PAGINA DE CONTATO //
    function insertChatResumo(){
        //Link de chat na página de Resumo
        user_name = $('#nickName').html(); //capturar nome de usuario
        user_id = userId; //capturar id do usuario

        chat_button = '<div id="chat_container" class="chat-container"> <a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null"><span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;"> Iniciar chat </span></a><script type="text/javascript">function runChat() {if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\';var winName = \'Chat\';var winURL = \'https://chat.mercadolivre.com.br/\';window.chatWindow=window.open(\'about:blank\',winName,winOpts);var webchatForm = document.createElement(\'form\');webchatForm.setAttribute(\'action\', winURL);webchatForm.style.display=\'none\';webchatForm.setAttribute(\'target\',winName);webchatForm.setAttribute(\'method\',\'post\');var e = document.createElement(\'input\');e.setAttribute(\'name\',\'userData\');e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":"","available_place_in_queue":"","allow_render":true,"user":{"user_id":"'+user_id+'","nickname":"'+user_name+'","first_name":"'+user_name+'","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","segment":"LONG_TAIL","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"group":"ML_PORTAL_HOME","idx":2,"article_number":"","articleDescription":"HomeNewPortal","sf":{"from_nw_mlportal__c":true},"lang":"pt_BR"}));webchatForm.appendChild(e);document.body.appendChild(webchatForm);webchatForm.submit();setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000);}window.chatWindow.focus();}</script></div>';
        $('#chat_container').remove(); //remove a div do chat
        $('.myml-title').after(chat_button); //insere a div do chat com a função de chamada
    }
    // FUNÇÃO PARA INSERIR CHAT NA PAGINA DE RESUMO E ARMAZENAR ID DO USUARIO PARA CHAT NA PAGINA DE CONTATO //


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
    })    
    //FUNÇÃO PARA MARCAR AS COMPRAS DE QUEM QUALIFICOU POSITIVO //

    //aumentar area de texto da criação de anuncios, delay de 5 segundos pra carregar o frame
    setTimeout(function(){
        $('#full-description_ifr').removeAttr('style');
        $('#full-description_ifr').attr('style', 'width: 100%; height: ' + mf_textarea + 'px; display: block;');
    },5000);

    //remove banners de publicidade da página de gerenciamento de vendas, resumo, etc
    if (mf_banners == 'checked'){
        $('#oasTOP').remove();
        $('#oasLEFTsrc').remove();
    }

    // FORM DE CONFIGURAÇÃO DO MERCADOFACIL //
    function mfacil_config(){
        //injeta mascara de fundo e div com o formulário
        $('body').append('<div id="mfacil_fundo" style="  background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1011;"></div>');
        html_form_mfacil = '<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF">   <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a>         <h1 class="main-title title title--primary">MercadoFacil</h1>   <input type="hidden" id="mfacil_first_install" value="instalado">         <table>     <tbody>       <tr title="Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário">         <td>Ativar/Desativar cumprimento automático</td>         <td> &nbsp;<input type="checkbox" id="mfacil_cumprimento" ' + mf_cumprimento + '></td>       </tr>       <tr title="Remover banners de publicidade da página de Resumo">         <td>Remover banners de publicidade da página de Resumo </td>         <td> &nbsp;<input type="checkbox" id="mfacil_banners" ' + mf_banners + '></td>       </tr>       <tr title="Exibe a situação de cada pagamento na página de Vendas Abertas ou Encerradas">         <td>Ativar/Desativar verificação de pagamento liberado</td>         <td> &nbsp;<input type="checkbox" id="mfacil_pagamento" ' + mf_pagamento + '></td>       </tr>       <tr title="Exibe link para o Chat na página de Resumo e Contato">         <td>Ativar/Desativar Chat</td>         <td> &nbsp;<input type="checkbox" id="mfacil_chat" ' + mf_chat + '></td>       </tr>       <tr title="Tempo em Milisegundos para o chat ser atualizdo automaticamente quando não tiver atendente disponível">         <td>Tempo para atualizar o Chat</td>         <td> &nbsp;<input type="text" id="mfacil_delay_chat" value="' + mf_delay_chat + '" size="5"> ms (padrão 1000ms {1 segundo})</td>       </tr>       <tr title="Ajusta a altura da Textarea de criação de anuncios">         <td>Altura da Textarea de criação de anúncios</td>         <td> &nbsp;<input type="text" id="mfacil_textarea" value="' + mf_textarea + '" size="5"> px (padrão 560px)</td>       </tr>       <tr title="Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta">         <td>Ativar/Desativar verificação de perguntas pendentes</td>         <td> &nbsp;<input type="checkbox" id="mfacil_perguntas" ' + mf_perguntas + '></td>       </tr>       <tr title="Quando ativo, você clica com o botão direito no campo para responder alguma pergunta e escolhe uma de suas respostas prontas para preenchimento automático">         <td>Ativar/Desativar Respostas prontas</td>         <td> &nbsp;<input type="checkbox" id="mfacil_respostas" ' + mf_respostas + '></td>       </tr>     </tbody>   </table>   <div id="respostas_prontas" style="display: none;">     <table>       <thead>         <tr>           <th>Título</th>           <th>Resposta</th>         </tr>       </thead>       <tbody>         <tr>           <td> <input type="text" id="mfacil_tit1" value="' + mf_t1 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res1" value="' + mf_r1 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit2" value="' + mf_t2 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res2" value="' + mf_r2 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit3" value="' + mf_t3 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res3" value="' + mf_r3 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit4" value="' + mf_t4 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res4" value="' + mf_r4 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit5" value="' + mf_t5 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res5" value="' + mf_r5 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit6" value="' + mf_t6 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res6" value="' + mf_r6 + '" size="50"> </td>         </tr>       </tbody>     </table>   </div>   <button id="mfacil_salvar" class="ch-btn">Salvar</button>     <center>     <h2>Esta ferramenta tem sido útil pra você? Considere uma doação!</h2>     <table>       <tr>         <td> 	    <a href="http://mpago.la/gV0b" target="_blank"><input type="image" src="http://s17.postimg.org/lsh5sy9uj/image.png"></a> </td>         <td>           <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"> <input type="hidden" name="cmd" value="_s-xclick"> <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7----- "> <input type="image" src="https://www.paypalobjects.com/pt_BR/BR/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - A maneira fácil e segura de enviar pagamentos online!"> <img alt="" border="0" src="https://www.paypalobjects.com/pt_BR/i/scr/pixel.gif" width="1" height="1"> </form>         </td>       </tr>     </table>   </center> </div>';
        $('#mfacil_fundo').after(html_form_mfacil);
        if (mf_respostas == 'checked') $('#respostas_prontas').attr('style', 'display: block;');
    }

    $(document).on('click', '#mfacil_config', function(){ //quando for clicado no menu de config das respostas
        mfacil_config();
    });

    $(document).on('click', '#mfacil_respostas', function(){
        respostas_ativas = $('#mfacil_respostas').is(":checked");
        if (respostas_ativas == true){
            $('#respostas_prontas').attr('style', 'display: block;');
        }else{
            $('#respostas_prontas').attr('style', 'display: none;');
        }
    })
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
        GM_setValue ("mercadoFacil_delay_chat", $('#mfacil_delay_chat').val());
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

        if ($("#mfacil_chat").is(":checked") == true){
            mfacil_chat = "checked";
        } else {
            mfacil_chat = "";
        }
        GM_setValue ("mercadoFacil_chat", mfacil_chat);

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
    })
    // SALVAR FORM DO MERCADOFACIL //



    /******************** NA PAGINA DE PERGUNTAS ********************/

    if ( location.host == 'questions.mercadolivre.com.br' ) {
        if (debug == 1) GM_log("Funções da pagina de perguntas"); //debug

        //*************** PREENCHER BOAS VINDAS NO CAMPO DE RESPONDER PERGUNTAS *****************//
        if (mf_cumprimento == 'checked'){
            function cumprimento() {
                $('textarea').click(function(e){
                    if (debug == 1) GM_log(e.target + " clicado"); //debug
                    if (! $(e.target).attr('comp') && $(e.target).attr('name') == 'text' ){ //se existir a variaves as boas-vindas nao serao preenchidas
                        $(e.target).val(hello() + ", ");
                        $(e.target).attr('comp', '1'); //atributo para so preencher as boas vindas uma vez
                    }
                })
            }

            function loop_cumprimento(){
                setTimeout(function(){
                    if (debug == 1) GM_log('loop cumprimento'); //debug
                    cumprimento();
                    loop_cumprimento();
                },3500)
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
                        })
                        //Injeta o attributo mf_context nas textarea para não injetar o menu de contexto novamente
                        $('textarea').attr('mf_context', 1);
                        }

                        function loop_respostas_prontas(){
                        setTimeout(function(){
                        if (debug == 1) GM_log('loop respostas prontas'); //debug
                        respostas_prontas();
                        loop_respostas_prontas();
                        },3500)
                        }

                        //Injeta classe CSS do jQuery Context Menu
                        cssdata = " .contextMenuPlugin {   -webkit-user-select: none;   display: none;   font-family: tahoma, arial, sans-serif;   font-size: 11px;   position: absolute;   left: 100px;   top: 100px;   min-width: 100px;   list-style-type: none;   margin: 0;   padding: 0;   background-color: #f7f3f7;   border: 2px solid #f7f7f7;   outline: 1px solid #949694; }  .contextMenuPlugin > li {   margin: 0 0 0 0;   padding: 1px;   background-repeat: no-repeat; }  .contextMenuPlugin > li > a {   position: relative;   display: block;   padding: 3px 3px 3px 28px;   color: ButtonText;   text-decoration: none;   margin: 1px; }  .contextMenuPlugin > li > a img {   position: absolute;   left: 3px;   margin-top: -2px;   width: 16px;   height: 16px; } .contextMenuPlugin > li > a:hover {   border: 1px solid #fffbff;   outline: 1px solid #b5d3ff;   margin: 0;   background: -moz-linear-gradient(top, rgba(239,239,255,0.5) 0%, rgba(223,223,255,0.5) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,255,0.5)), color-stop(100%,rgba(223,223,255,0.5))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80efefff', endColorstr='#80dfdfff',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* W3C */   cursor: default; }  .contextMenuPlugin > li.disabled {   pointer-events: none; }  .contextMenuPlugin > li.disabled a {   color: grey; }  .contextMenuPlugin > li.disabled > a:hover {   border: none;   outline: none; }  .contextMenuPlugin > li.divider {   border-top: 1px solid #e7e3e7;   border-bottom: 1px solid #ffffff;   height: 0;   padding: 0;   margin: 5px 0 5px 27px; }  .contextMenuPlugin > .header {   background: rgb(90,90,90); /* Old browsers */   background: -moz-linear-gradient(top, rgba(90,90,90,1) 0%, rgba(20,20,20,1) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(90,90,90,1)), color-stop(100%,rgba(20,20,20,1))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a5a5a', endColorstr='#141414',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* W3C */   position: relative;   cursor: default;   padding: 3px 3px 3px 3px;   color: #ffffff; }  .contextMenuPlugin > .gutterLine {   position: absolute;   border-left: 1px solid #e7e3e7;   border-right: 1px solid #ffffff;   width: 0;   top: 0;   bottom: 0;   left: 26px;   z-index: 0; } ";
                        $("head").append("<style type='text/css'>"+cssdata+"</style>");
                        loop_respostas_prontas();

                        }
                        /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/
                        }

                        /******************** NA PAGINA DE PERGUNTAS ********************/


                        })
