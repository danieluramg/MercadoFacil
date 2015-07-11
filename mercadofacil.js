// ==UserScript==
// @name	MercadoFacil
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @author	daniel.uramg@gmail.com
// @version	0.27
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.js
// @updateURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @require	http://ideias.2p.fm/js/jquery-simple-context-menu/jquery.contextmenu.js
// @match	http://*.mercadolivre.com.br/*
// @match	https://*.mercadolivre.com.br/*
// @match	https://chat.mercadolibre.com/*
// @run-at	document-end
// ==/UserScript==

$(document).ready(function(){

    /******************** RESPOSTAS PREDEFINIDAS PARA PREENCHIMENTO ********************/
    if (typeof user != "undefined") { //Define variável com o nome de usuário para poder usar nas respostas prontas
        user_name = user.nickname;
    } else {
        user_name = $('#nickName').html();
    }

    /* Altere somente os 'Pergunta x' e as 'Resposta X' mantendo a formatação do código
       O Titulo é o que aparece no menu de contexto (breve descrição), já a resposta o texto que será preenchido 
       Siga os exemplos das respostas já definidas */
    var resposta = [
        { 'title': 'Boleto', 'message': 'o pagamento por boleto demora até 2 dias úteis para ser confirmado' },
        { 'title': 'Frete e prazo', 'message': 'o valor do frete e prazo é calculado diretamente no anuncio' },
        { 'title': 'Saudação', 'message': 'Atenciosamente, ' + user_name },
        { 'title': 'Pergunta 4', 'message': 'Resposta quatro' },
        { 'title': 'Pergunta 5', 'message': 'Resposta cinco' },
        { 'title': 'Pergunta 6', 'message': 'Resposta seis' }
    ];
    /******************** RESPOSTAS PREDEFINIDAS PARA PREENCHIMENTO ********************/


    /******************** OUTRAS MODIFICACOES ********************/
    //aumentar area de texto da criação de anuncios, delay de 5 segundos pra carregar o frame
    setTimeout(function(){
        $('#full-description_ifr').removeAttr('style');
        $('#full-description_ifr').attr('style', 'width: 100%; height: 560px; display: block;');
    },5000);

    //Injetar botão Chat e botao 'Quero que me liguem' na pagina de contato
    if ( location.hfer = 'http://contato.mercadolivre.com.br/' ){
        chat_call_button = '<div class="sections ch-box" id="section-three"><input id="j_id0:j_id1:j_id2:portal-contact:autoGestionCase" name="j_id0:j_id1:j_id2:portal-contact:autoGestionCase" onclick="A4J.AJAX.Submit(\'j_id0:j_id1:j_id2:portal\x2Dcontact\',event,{\'similarityGroupingId\':\'j_id0:j_id1:j_id2:portal\x2Dcontact:autoGestionCase\',\'parameters\':{\'j_id0:j_id1:j_id2:portal\x2Dcontact:autoGestionCase\':\'j_id0:j_id1:j_id2:portal\x2Dcontact:autoGestionCase\'} } );return false;" style="display:none" type="button"><input class="ch-btn ch-btn-big btn-action-margin" id="j_id0:j_id1:j_id2:portal-contact:auxprueba" name="j_id0:j_id1:j_id2:portal-contact:auxprueba" onclick="A4J.AJAX.Submit(\'j_id0:j_id1:j_id2:portal\x2Dcontact\',event,{\'oncomplete\':function(request,event,data){changeStep(2);loadDatePicker(\'Janeiro\',\'Fevereiro\',\'Março\',\'Abril\',\'Maio\',\'Junho\',\'Julho\',\'Agosto\',\'Setembro\',\'Outubro\',\'Novembro\',\'Dezembro\',\'Seg\',\'Ter\',\'Qua\',\'Qui\',\'Sex\',\'Sab\',\'Dom\');},\'similarityGroupingId\':\'j_id0:j_id1:j_id2:portal\x2Dcontact:auxprueba\',\'parameters\':{\'j_id0:j_id1:j_id2:portal\x2Dcontact:auxprueba\':\'j_id0:j_id1:j_id2:portal\x2Dcontact:auxprueba\'} } );return false;" value="Enviar e-mail" style="display:none" type="button"><div class="sub-sections-btn" id="channelBtn"><p style="margin: 0px; padding: 0px;"><div id="buttonChatPortal" style="margin-right: 1em;background: transparent;padding: 0;border: 0;outline: 0;width: 150px; height: 40px; overflow: hidden; float: center; vertical-align: middle;display: inline;"><a id="online-link" href="javascript:\/\/chat" onclick="runChat();return false;" class="online">Iniciar chat<\/a><\/div><\/p><\/div><\/div><button class="ch-btn-skin ch-btn-small" id="startClickToCall" onclick="" aria-label="ch-modal-1">Quero que me liguem</button>';
        $('a[href="contato"]').after(chat_call_button);
    }

    // NA PAGINA DE REUSMO //
    if ( location.href == 'https://myaccount.mercadolivre.com.br/summary' ) {
        //Link de chat na página de Resumo
        user_name = $('#nickName').html(); //capturar nome de usuario
        user_id = userId; //capture id do usuario
        chat_button = '<div id="chat_container" class="chat-container"> <a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null"> <span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;"> Iniciar chat </span> </a><script type="text/javascript"> function runChat() { if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){ var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\'; var winName = \'Chat\'; var winURL = \'https://chat.mercadolibre.com/\'; window.chatWindow=window.open(\'about:blank\',winName,winOpts); var webchatForm = document.createElement(\'form\'); webchatForm.setAttribute(\'action\', winURL); webchatForm.style.display=\'none\'; webchatForm.setAttribute(\'target\',winName); webchatForm.setAttribute(\'method\',\'post\'); var e = document.createElement(\'input\'); e.setAttribute(\'name\',\'userData\'); e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":false,"available_place_in_queue":true,"allow_render":true,"random_access":true,"user":{"user_id":"' + user_id + '","nickname":"' + user_name + '","first_name":" ' + user_name + ' ","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"lang":"pt_BR"})); webchatForm.appendChild(e); document.body.appendChild(webchatForm); webchatForm.submit(); setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000); } window.chatWindow.focus(); } </script> </div>';
        $('#chat_container').remove(); //remove a div do chat
        $('.myml-title').after(chat_button); //insere a div do chat com a função de chamada
    }
    //remove banners de publicidade da página de gerenciamento de vendas, resumo, etc
    $('#oasTOP').remove();
    $('#oasLEFTsrc').remove();
    // NA PAGINA DE REUSMO //


    data = new Date();
    cont = 0; //variavel para so preencher as boas vindas uma vez

    // FUNÇÃO QUE RETORNA O CUMPRIMENTO DE ACORDO COM O HORÁRIO
    function hello(){ //cria variavel de boas vindas
        if (data.getHours() >= 0 && data.getHours() <= 12){
            return "Bom dia";
        } else if (data.getHours() >= 13 && data.getHours() <= 17){
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    }



    /******************** NA PAGINA DE PERGUNTAS ********************/
    if ( location.host == 'questions.mercadolivre.com.br' ) {
        console.log("Funções da pagina de perguntas"); //debug
        //preencher boas vindas no campo de responder perguntas
        setTimeout(function(){
            $('textarea').click(function(e){
                console.log(e.target + " clicado"); //debug
                if (! $(e.target).attr('comp') && $(e.target).attr('name') == 'Answer' ){ //se existir a variaves as boas-vindas nao serao preenchidas
                    $(e.target).val(hello() + ", ");
                    $(e.target).attr('comp', '1'); //atributo para so preencher as boas vindas uma vez
                }
            })
        },2000);

        /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/

        //Injeta classe CSS do jQuery Context Menu
        cssdata = " .contextMenuPlugin {   -webkit-user-select: none;   display: none;   font-family: tahoma, arial, sans-serif;   font-size: 11px;   position: absolute;   left: 100px;   top: 100px;   min-width: 100px;   list-style-type: none;   margin: 0;   padding: 0;   background-color: #f7f3f7;   border: 2px solid #f7f7f7;   outline: 1px solid #949694; }  .contextMenuPlugin > li {   margin: 0 0 0 0;   padding: 1px;   background-repeat: no-repeat; }  .contextMenuPlugin > li > a {   position: relative;   display: block;   padding: 3px 3px 3px 28px;   color: ButtonText;   text-decoration: none;   margin: 1px; }  .contextMenuPlugin > li > a img {   position: absolute;   left: 3px;   margin-top: -2px;   width: 16px;   height: 16px; } .contextMenuPlugin > li > a:hover {   border: 1px solid #fffbff;   outline: 1px solid #b5d3ff;   margin: 0;   background: -moz-linear-gradient(top, rgba(239,239,255,0.5) 0%, rgba(223,223,255,0.5) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,255,0.5)), color-stop(100%,rgba(223,223,255,0.5))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80efefff', endColorstr='#80dfdfff',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* W3C */   cursor: default; }  .contextMenuPlugin > li.disabled {   pointer-events: none; }  .contextMenuPlugin > li.disabled a {   color: grey; }  .contextMenuPlugin > li.disabled > a:hover {   border: none;   outline: none; }  .contextMenuPlugin > li.divider {   border-top: 1px solid #e7e3e7;   border-bottom: 1px solid #ffffff;   height: 0;   padding: 0;   margin: 5px 0 5px 27px; }  .contextMenuPlugin > .header {   background: rgb(90,90,90); /* Old browsers */   background: -moz-linear-gradient(top, rgba(90,90,90,1) 0%, rgba(20,20,20,1) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(90,90,90,1)), color-stop(100%,rgba(20,20,20,1))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a5a5a', endColorstr='#141414',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* W3C */   position: relative;   cursor: default;   padding: 3px 3px 3px 3px;   color: #ffffff; }  .contextMenuPlugin > .gutterLine {   position: absolute;   border-left: 1px solid #e7e3e7;   border-right: 1px solid #ffffff;   width: 0;   top: 0;   bottom: 0;   left: 26px;   z-index: 0; } ";
        $("head").append("<style type='text/css'>"+cssdata+"</style>");

        setTimeout(function(){
            $('textarea').contextPopup({
                title: 'Respostas Prontas:',
                items: [
                    {label:resposta[0].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[0].message);
                    }
                    },
                    {label:resposta[1].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[1].message);
                    }
                    },
                    {label:resposta[2].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[2].message);
                    }
                    },
                    {label:resposta[3].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[3].message);
                    }
                    },
                    {label:resposta[4].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[4].message);
                    }
                    },
                    {label:resposta[5].title, action:function(e) {
                        currentText = $(e.target).val();
                        $(e.target).val(currentText + resposta[5].message);
                    }
                    },
                ]
                    })
                    },2000);

                    /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/

                    /******************** NA PAGINA DE PERGUNTAS ********************/
                    }

                    //Recarregar página de chat até aparecer alguém
                    //$("h3").before("<span> (Autoreload)</span>"); //insere titulo

setTimeout(function(){
if ( $('#user').html() == "Ops! Não tem ninguém disponível agora. Por favor, tente em alguns minutos"){
    $('<span> - (reload)</span>').appendTo('#user');
    location.reload();
}
},500);
                    

                    /******************** OUTRAS MODIFICACOES ********************/

                    })
