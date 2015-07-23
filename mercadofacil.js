// ==UserScript==
// @name	MercadoFacil
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @author	daniel.uramg@gmail.com
// @version	0.29
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

    //  PAGINA DE AJUDA E CONTATO //
    if ( location.hfer == 'http://contato.mercadolivre.com.br/ajuda' ){
        // testa para saber se ja foi registrado o userName do usuário
        if (GM_getValue("mercadoFacil_userName")==null){
            // avisa que tera que ir a pagina de resumo para registrar o userName
            alert("Para que o chat seja mostrado nesta tela você tera que estar logado e visitar a página de resumo para que seu USERID seja registrado.\nVocê será redirecionado para a página de Resumo.");
            location.href="https://myaccount.mercadolivre.com.br/summary";
        }else{
            // mostra o link para o chat
            user_name = GM_getValue("mercadoFacil_userName");
            user_id = GM_getValue("mercadoFacil_userID");
            chat_call_button = '<p style="font-size:20px"><a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null">Iniciar o chat com um representante</a><script type="text/javascript">function runChat() {if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\';var winName = \'Chat\';var winURL = \'https://chat.mercadolibre.com/\';window.chatWindow=window.open(\'about:blank\',winName,winOpts);var webchatForm = document.createElement(\'form\');webchatForm.setAttribute(\'action\', winURL);webchatForm.style.display=\'none\';webchatForm.setAttribute(\'target\',winName);webchatForm.setAttribute(\'method\',\'post\');var e = document.createElement(\'input\');e.setAttribute(\'name\',\'userData\');e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":"","available_place_in_queue":"","allow_render":true,"user":{"user_id":"'+user_id+'","nickname":"'+user_name+'","first_name":"'+user_name+'","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","segment":"LONG_TAIL","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"group":"ML_PORTAL_HOME","idx":2,"article_number":"","articleDescription":"HomeNewPortal","sf":{"from_nw_mlportal__c":true},"lang":"pt_BR"}));webchatForm.appendChild(e);document.body.appendChild(webchatForm);webchatForm.submit();setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000);}window.chatWindow.focus();}</script></p>';
            $('.secondary-content').before(chat_call_button);
        }
    }
    //  PAGINA DE AJUDA E CONTATO //

    //  PAGINA DE REUSMO //
    if ( location.href == 'https://myaccount.mercadolivre.com.br/summary' || location.href == 'https://myaccount.mercadolivre.com.br/summary/'  ) {
        insertChatResumo();
    }
    //  PAGINA DE REUSMO //

    // NO CHAT //
    if (location.href == 'https://chat.mercadolibre.com/'){
        //$("h3").before("<span> (Autoreload)</span>"); //insere titulo
        setTimeout(function(){ //Recarregar página de chat a cada X milisegundos até aparecer alguém
            if ( $('#user').html() == "Ops! Não tem ninguém disponível agora. Por favor, tente em alguns minutos"){
                $('<span> - (reload)</span>').appendTo('#user');
                location.reload();
            }
        },1000);
    }
    // NO CHAT //

    // FUNÇÃO PARA INSERIR CHAT NA PAGINA DE RESUMO E ARMAZENAR ID DO USUARIO PARA CHAT NA PAGINA DE CONTATO //
    function insertChatResumo(){
        //Link de chat na página de Resumo
        user_name = $('#nickName').html(); //capturar nome de usuario
        user_id = userId; //capturar id do usuario
        // registra o userName e o userID para ser acessado futuramente
        GM_setValue ("mercadoFacil_userName", user_name);
        GM_setValue ("mercadoFacil_userID", user_id);
        chat_button = '<div id="chat_container" class="chat-container"> <a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null"><span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;"> Iniciar chat </span></a><script type="text/javascript">function runChat() {if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\';var winName = \'Chat\';var winURL = \'https://chat.mercadolibre.com/\';window.chatWindow=window.open(\'about:blank\',winName,winOpts);var webchatForm = document.createElement(\'form\');webchatForm.setAttribute(\'action\', winURL);webchatForm.style.display=\'none\';webchatForm.setAttribute(\'target\',winName);webchatForm.setAttribute(\'method\',\'post\');var e = document.createElement(\'input\');e.setAttribute(\'name\',\'userData\');e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":"","available_place_in_queue":"","allow_render":true,"user":{"user_id":"'+user_id+'","nickname":"'+user_name+'","first_name":"'+user_name+'","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","segment":"LONG_TAIL","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"group":"ML_PORTAL_HOME","idx":2,"article_number":"","articleDescription":"HomeNewPortal","sf":{"from_nw_mlportal__c":true},"lang":"pt_BR"}));webchatForm.appendChild(e);document.body.appendChild(webchatForm);webchatForm.submit();setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000);}window.chatWindow.focus();}</script></div>';
        $('#chat_container').remove(); //remove a div do chat
        $('.myml-title').after(chat_button); //insere a div do chat com a função de chamada
    }
    // FUNÇÃO PARA INSERIR CHAT NA PAGINA DE RESUMO E ARMAZENAR ID DO USUARIO PARA CHAT NA PAGINA DE CONTATO //


    // FUNÇÃO QUE RETORNA O CUMPRIMENTO DE ACORDO COM O HORÁRIO
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

    //aumentar area de texto da criação de anuncios, delay de 5 segundos pra carregar o frame
    setTimeout(function(){
        $('#full-description_ifr').removeAttr('style');
        $('#full-description_ifr').attr('style', 'width: 100%; height: 560px; display: block;');
    },5000);

    //remove banners de publicidade da página de gerenciamento de vendas, resumo, etc
    $('#oasTOP').remove();
    $('#oasLEFTsrc').remove();

    // FORM PARA CONFIGURAR AS RESPOSTAS PRONTAS //
    //injeta css da div de configuração das respostas
    $("head").append("<style type='text/css'>#div_mfacil{box-shadow: 0 3px 14px #333; border-radius: 5px; display:block;position:fixed;top:400px;left:50%;margin-left:-300px;margin-top:-300px;padding:10px;width:600px;border:0px solid #000;z-index:100;}</style>");
    $(document).on('click', '#mfacil_respostas', function(){ //quando for clicado no menu de config das respostas

        //armazena valores salvos nas variávels
        mf_t1 = GM_getValue("mercadoFacil_t1"); //if ( mf_t1 == 'undefined') mf_t1 = '';
        mf_t2 = GM_getValue("mercadoFacil_t2"); //if ( mf_t2 == 'undefined') mf_t2 = '';
        mf_t3 = GM_getValue("mercadoFacil_t3"); //if ( mf_t3 == 'undefined') mf_t3 = '';
        mf_t4 = GM_getValue("mercadoFacil_t4"); //if ( mf_t4 == 'undefined') mf_t4 = '';
        mf_t5 = GM_getValue("mercadoFacil_t5"); //if ( mf_t5 == 'undefined') mf_t5 = '';
        mf_t6 = GM_getValue("mercadoFacil_t6"); //if ( mf_t6 == 'undefined') mf_t6 = '';
        mf_r1 = GM_getValue("mercadoFacil_r1"); //if ( mf_r1 == 'undefined') mf_r1 = '';
        mf_r2 = GM_getValue("mercadoFacil_r2"); //if ( mf_r2 == 'undefined') mf_r2 = '';
        mf_r3 = GM_getValue("mercadoFacil_r3"); //if ( mf_r3 == 'undefined') mf_r3 = '';
        mf_r4 = GM_getValue("mercadoFacil_r4"); //if ( mf_r4 == 'undefined') mf_r4 = '';
        mf_r5 = GM_getValue("mercadoFacil_r5"); //if ( mf_r5 == 'undefined') mf_r5 = '';
        mf_r6 = GM_getValue("mercadoFacil_r6"); //if ( mf_r6 == 'undefined') mf_r6 = '';

        //injeta mascara de fundo e div com o formulário
        $('h1').after('<div id="mfacil_fundo" style="  background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1011;"></div>');
        $('#mfacil_fundo').after('<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF"> <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a> <h1 class="main-title title title--primary">Respostas Prontas:</h1> <table> <thead> <tr><th>Título</th> <th>Resposta</th></tr> </thead> <tbody> <tr><td> <input type="text" name="mfacil_tit1" value="' + mf_t1 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res1" value="' + mf_r1 + '" size="50"> </td> </tr> <tr><td> <input type="text" name="mfacil_tit2" value="' + mf_t2 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res2" value="' + mf_r2 + '" size="50"> </td> </tr> <tr><td> <input type="text" name="mfacil_tit3" value="' + mf_t3 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res3" value="' + mf_r3 + '" size="50"> </td> </tr> <tr><td> <input type="text" name="mfacil_tit4" value="' + mf_t4 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res4" value="' + mf_r4 + '" size="50"> </td> </tr> <tr><td> <input type="text" name="mfacil_tit5" value="' + mf_t5 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res5" value="' + mf_r5 + '" size="50"> </td> </tr> <tr><td> <input type="text" name="mfacil_tit6" value="' + mf_t6 + '" size="15"> </td> <td> &nbsp;<input type="text" name="mfacil_res6" value="' + mf_r6 + '" size="50"> </td> </tr> <tr><td> <button name="mfacil_salvar" id="mfacil_salvar" class="ch-btn">Salvar</button> </td></tr> </tbody>  </table> </div>');

    });
    // FORM PARA CONFIGURAR AS RESPOSTAS PRONTAS //

    // SALVAR AS RESPOSTAS PRONTAS //
    $(document).on('click', '#mfacil_salvar', function(){ //quando for clicado no menu de config das respostas
        mfacil_tit1 = $('input[name="mfacil_tit1"]').val();        
        mfacil_tit2 = $('input[name="mfacil_tit2"]').val();
        mfacil_tit3 = $('input[name="mfacil_tit3"]').val();
        mfacil_tit4 = $('input[name="mfacil_tit4"]').val();
        mfacil_tit5 = $('input[name="mfacil_tit5"]').val();
        mfacil_tit6 = $('input[name="mfacil_tit6"]').val();
        mfacil_res1 = $('input[name="mfacil_res1"]').val();        
        mfacil_res2 = $('input[name="mfacil_res2"]').val();
        mfacil_res3 = $('input[name="mfacil_res3"]').val();
        mfacil_res4 = $('input[name="mfacil_res4"]').val();
        mfacil_res5 = $('input[name="mfacil_res5"]').val();
        mfacil_res6 = $('input[name="mfacil_res6"]').val();
        GM_setValue ("mercadoFacil_t1", mfacil_tit1);
        GM_setValue ("mercadoFacil_t2", mfacil_tit2);
        GM_setValue ("mercadoFacil_t3", mfacil_tit3);
        GM_setValue ("mercadoFacil_t4", mfacil_tit4);
        GM_setValue ("mercadoFacil_t5", mfacil_tit5);
        GM_setValue ("mercadoFacil_t6", mfacil_tit6);
        GM_setValue ("mercadoFacil_r1", mfacil_res1);
        GM_setValue ("mercadoFacil_r2", mfacil_res2);
        GM_setValue ("mercadoFacil_r3", mfacil_res3);
        GM_setValue ("mercadoFacil_r4", mfacil_res4);
        GM_setValue ("mercadoFacil_r5", mfacil_res5);
        GM_setValue ("mercadoFacil_r6", mfacil_res6);
        alert("Respostas Prontas salvas com sucesso!");
        location.reload();
    })

    /******************** NA PAGINA DE PERGUNTAS ********************/
    if ( location.host == 'questions.mercadolivre.com.br' ) {
        console.log("Funções da pagina de perguntas"); //debug
        //preencher boas vindas no campo de responder perguntas
        setTimeout(function(){ //da um delay pra carregar as perguntas
            console.log("entrou na função do delay"); //debug
            $('textarea').click(function(e){
                console.log(e.target + " clicado"); //debug
                if (! $(e.target).attr('comp') && $(e.target).attr('name') == 'Answer' ){ //se existir a variaves as boas-vindas nao serao preenchidas
                    $(e.target).val(hello() + ", ");
                    $(e.target).attr('comp', '1'); //atributo para so preencher as boas vindas uma vez
                }
            })

            // Menu de configuração das Respostas Prontas //
            $('h1').after('<a id="mfacil_respostas" href="#"><span class="ch-icon-cog" title="Configurar Respostas Prontas do MercadoFacil"></span></a>');
        },3000);


        /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/
        //Injeta classe CSS do jQuery Context Menu
        cssdata = " .contextMenuPlugin {   -webkit-user-select: none;   display: none;   font-family: tahoma, arial, sans-serif;   font-size: 11px;   position: absolute;   left: 100px;   top: 100px;   min-width: 100px;   list-style-type: none;   margin: 0;   padding: 0;   background-color: #f7f3f7;   border: 2px solid #f7f7f7;   outline: 1px solid #949694; }  .contextMenuPlugin > li {   margin: 0 0 0 0;   padding: 1px;   background-repeat: no-repeat; }  .contextMenuPlugin > li > a {   position: relative;   display: block;   padding: 3px 3px 3px 28px;   color: ButtonText;   text-decoration: none;   margin: 1px; }  .contextMenuPlugin > li > a img {   position: absolute;   left: 3px;   margin-top: -2px;   width: 16px;   height: 16px; } .contextMenuPlugin > li > a:hover {   border: 1px solid #fffbff;   outline: 1px solid #b5d3ff;   margin: 0;   background: -moz-linear-gradient(top, rgba(239,239,255,0.5) 0%, rgba(223,223,255,0.5) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(239,239,255,0.5)), color-stop(100%,rgba(223,223,255,0.5))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80efefff', endColorstr='#80dfdfff',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(239,239,255,0.5) 0%,rgba(223,223,255,0.5) 100%); /* W3C */   cursor: default; }  .contextMenuPlugin > li.disabled {   pointer-events: none; }  .contextMenuPlugin > li.disabled a {   color: grey; }  .contextMenuPlugin > li.disabled > a:hover {   border: none;   outline: none; }  .contextMenuPlugin > li.divider {   border-top: 1px solid #e7e3e7;   border-bottom: 1px solid #ffffff;   height: 0;   padding: 0;   margin: 5px 0 5px 27px; }  .contextMenuPlugin > .header {   background: rgb(90,90,90); /* Old browsers */   background: -moz-linear-gradient(top, rgba(90,90,90,1) 0%, rgba(20,20,20,1) 100%); /* FF3.6+ */   background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(90,90,90,1)), color-stop(100%,rgba(20,20,20,1))); /* Chrome,Safari4+ */   background: -webkit-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Chrome10+,Safari5.1+ */   background: -o-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* Opera11.10+ */   background: -ms-linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* IE10+ */   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a5a5a', endColorstr='#141414',GradientType=0 ); /* IE6-9 */   background: linear-gradient(top, rgba(90,90,90,1) 0%,rgba(20,20,20,1) 100%); /* W3C */   position: relative;   cursor: default;   padding: 3px 3px 3px 3px;   color: #ffffff; }  .contextMenuPlugin > .gutterLine {   position: absolute;   border-left: 1px solid #e7e3e7;   border-right: 1px solid #ffffff;   width: 0;   top: 0;   bottom: 0;   left: 26px;   z-index: 0; } ";
        $("head").append("<style type='text/css'>"+cssdata+"</style>");

        setTimeout(function(){
            mf_t1 = GM_getValue("mercadoFacil_t1"); //if ( mf_t1 == 'undefined') mf_t1 = '';
            mf_t2 = GM_getValue("mercadoFacil_t2"); //if ( mf_t2 == 'undefined') mf_t2 = '';
            mf_t3 = GM_getValue("mercadoFacil_t3"); //if ( mf_t3 == 'undefined') mf_t3 = '';
            mf_t4 = GM_getValue("mercadoFacil_t4"); //if ( mf_t4 == 'undefined') mf_t4 = '';
            mf_t5 = GM_getValue("mercadoFacil_t5"); //if ( mf_t5 == 'undefined') mf_t5 = '';
            mf_t6 = GM_getValue("mercadoFacil_t6"); //if ( mf_t6 == 'undefined') mf_t6 = '';
            mf_r1 = GM_getValue("mercadoFacil_r1"); //if ( mf_r1 == 'undefined') mf_r1 = '';
            mf_r2 = GM_getValue("mercadoFacil_r2"); //if ( mf_r2 == 'undefined') mf_r2 = '';
            mf_r3 = GM_getValue("mercadoFacil_r3"); //if ( mf_r3 == 'undefined') mf_r3 = '';
            mf_r4 = GM_getValue("mercadoFacil_r4"); //if ( mf_r4 == 'undefined') mf_r4 = '';
            mf_r5 = GM_getValue("mercadoFacil_r5"); //if ( mf_r5 == 'undefined') mf_r5 = '';
            mf_r6 = GM_getValue("mercadoFacil_r6"); //if ( mf_r6 == 'undefined') mf_r6 = '';
            $('textarea').contextPopup({
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
                    },2000);
                    /******************** MENU DE CONTEXTO PARA RESPOSTAS PREDEFINIDAS ********************/

                    /******************** NA PAGINA DE PERGUNTAS ********************/
                    }

                    })