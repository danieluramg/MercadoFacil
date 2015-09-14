// ==UserScript==
// @name	MercadoFacil
// @website https://github.com/danieluramg/MercadoFacil/
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @author	Daniel Plácido (daniel.uramg@gmail.com)
// @contributor	Marco Silveira (vastar@globo.com)
// @version	0.35
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @updateURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @require	http://ideias.2p.fm/userscripts/jquery-2.1.1.min.js
// @require	http://ideias.2p.fm/js/jquery-simple-context-menu/jquery.contextmenu.js
// @match	http://*.mercadolivre.com.br/*
// @match	https://*.mercadolivre.com.br/*
// @match	https://chat.mercadolibre.com/*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_log
// @run-at	document-end
// ==/UserScript==

debug = 0; //mude para 1 para registrar os logs

$(document).ready(function(){

	//injeta botão de configuração do MercdoFacil
	mfacil_button = '<li role="presentation" class="ch-bellows"><a href="#" id="mfacil_config" class="ch-bellows-trigger">MercadoFacil</a></li>';
	$('#CONFIG').after(mfacil_button);

	//variávels das configurações salvas do MercadoFacil
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
	mf_delay_chat = GM_getValue("mercadoFacil_delay_chat"); if (mf_delay_chat == null) mf_delay_chat = '1000';
	mf_textarea = GM_getValue("mercadoFacil_textarea"); if (mf_textarea == null) mf_textarea = '560';

	//Se for a primeira vez que o script é carregado exibe Div de configuração
	if (mf_first_install != "instalado"){
		mfacil_config();
	}

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
		$('#mf_pgto'+id_venda).load('/sales/obtainOrdersData?orderId='+ id_venda + ' #textMedioPago');
		if (debug == 1) GM_log('Informação de pagamento adicionada, venda: ' + id_venda); //debug
	}

	if(location.href.search('/sales/list') >=1 && mf_pagamento == 'checked'){
		loop_pagamento();
	}
	//VERIFICAÇÃO DE PAGAMENTO LIBERADO //

	//  PAGINA DE AJUDA E CONTATO //
	if ( location.href == 'http://contato.mercadolivre.com.br/ajuda' ){
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
		},mf_delay_chat);
	}
	// NO CHAT //

	// FUNÇÃO PARA INSERIR CHAT NA PAGINA DE RESUMO E ARMAZENAR ID DO USUARIO PARA CHAT NA PAGINA DE CONTATO //
	function insertChatResumo(){
		//Link de chat na página de Resumo
		user_name = $('#nickName').html(); //capturar nome de usuario
		user_id = userId; //capturar id do usuario

		chat_button = '<div id="chat_container" class="chat-container"> <a id="null" href="javascript://chat" onclick="runChat();return false;" class="null" style="null"><span id="balloon" style="padding-left: 20px;background: url(\'https://secure.mlstatic.com/org-img/CHAT/icono_chat2.gif\') no-repeat scroll 0% 0% transparent;"> Iniciar chat </span></a><script type="text/javascript">function runChat() {if (typeof (window.chatWindow) == \'undefined\' || window.chatWindow.closed){var winOpts = \'directories=no,titlebar=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=633,height=550\';var winName = \'Chat\';var winURL = \'https://chat.mercadolibre.com/\';window.chatWindow=window.open(\'about:blank\',winName,winOpts);var webchatForm = document.createElement(\'form\');webchatForm.setAttribute(\'action\', winURL);webchatForm.style.display=\'none\';webchatForm.setAttribute(\'target\',winName);webchatForm.setAttribute(\'method\',\'post\');var e = document.createElement(\'input\');e.setAttribute(\'name\',\'userData\');e.setAttribute(\'value\',JSON.stringify({"validate":true,"render":true,"agents_online":true,"available_agents":"","available_place_in_queue":"","allow_render":true,"user":{"user_id":"'+user_id+'","nickname":"'+user_name+'","first_name":"'+user_name+'","last_name":"","site":"MLB","user_type":"MERCADO_LIDER","segment":"LONG_TAIL","queue_id":"MEJORES_VENDEDORES_MLB"},"from_plugin":true,"group":"ML_PORTAL_HOME","idx":2,"article_number":"","articleDescription":"HomeNewPortal","sf":{"from_nw_mlportal__c":true},"lang":"pt_BR"}));webchatForm.appendChild(e);document.body.appendChild(webchatForm);webchatForm.submit();setTimeout(function(){webchatForm.parentNode.removeChild(webchatForm);},1000);}window.chatWindow.focus();}</script></div>';
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
		html_form_mfacil = '<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF">   <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a>   <h1 class="main-title title title--primary">MercadoFacil</h1>   <input type="hidden" id="mfacil_first_install" value="instalado">   <table>     <tbody>       <tr title="Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário">         <td>Ativar/Desativar cumprimento automático</td>         <td> &nbsp;<input type="checkbox" id="mfacil_cumprimento" ' + mf_cumprimento + '></td>       </tr>       <tr title="Remover banners de publicidade da página de Resumo">         <td>Remover banners de publicidade da página de Resumo </td>         <td> &nbsp;<input type="checkbox" id="mfacil_banners" ' + mf_banners + '></td>       </tr>       <tr title="Exibe a situação de cada pagamento na página de Vendas Abertas ou Encerradas">         <td>Ativar/Desativar verificação de pagamento liberado</td>         <td> &nbsp;<input type="checkbox" id="mfacil_pagamento" ' + mf_pagamento + '></td>       </tr>       <tr title="Tempo em Milisegundos para o chat ser atualizdo automaticamente quando não tiver atendente disponível">         <td>Tempo para atualizar o Chat</td>         <td> &nbsp;<input type="text" id="mfacil_delay_chat" value="' + mf_delay_chat + '" size="5"> ms (padrão 1000ms {1 segundo})</td>       </tr>       <tr title="Ajusta a altura da Textarea de criação de anuncios">         <td>Altura da Textarea de criação de anúncios</td>         <td> &nbsp;<input type="text" id="mfacil_textarea" value="' + mf_textarea + '" size="5"> px (padrão 560px)</td>       </tr>       <tr title="Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta">         <td>Ativar/Desativar verificação de perguntas pendentes</td>         <td> &nbsp;<input type="checkbox" id="mfacil_perguntas" ' + mf_perguntas + '></td>       </tr>       <tr title="Quando ativo, você clica com o botão direito no campo para responder alguma pergunta e escolhe uma de suas respostas prontas para preenchimento automático">         <td>Ativar/Desativar Respostas prontas</td>         <td> &nbsp;<input type="checkbox" id="mfacil_respostas" ' + mf_respostas + '></td>       </tr>     </tbody>   </table>   <div id="respostas_prontas" style="display: none;">     <table>       <thead>         <tr>           <th>Título</th>           <th>Resposta</th>         </tr>       </thead>       <tbody>         <tr>           <td> <input type="text" id="mfacil_tit1" value="' + mf_t1 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res1" value="' + mf_r1 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit2" value="' + mf_t2 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res2" value="' + mf_r2 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit3" value="' + mf_t3 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res3" value="' + mf_r3 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit4" value="' + mf_t4 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res4" value="' + mf_r4 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit5" value="' + mf_t5 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res5" value="' + mf_r5 + '" size="50"> </td>         </tr>         <tr>           <td> <input type="text" id="mfacil_tit6" value="' + mf_t6 + '" size="15"> </td>           <td> &nbsp;<input type="text" id="mfacil_res6" value="' + mf_r6 + '" size="50"> </td>         </tr>       </tbody>     </table>   </div>   <button id="mfacil_salvar" class="ch-btn">Salvar</button> </div>';
		$('#mfacil_fundo').after(html_form_mfacil);
		if (mf_respostas == 'checked') $('#respostas_prontas').attr('style', 'display: block;');
	}
	//injeta css da div de configuração das respostas
	$("head").append("<style type='text/css'>#div_mfacil{box-shadow: 0 3px 14px #333; border-radius: 5px; display:block;position:fixed;top:400px;left:50%;margin-left:-300px;margin-top:-300px;padding:10px;width:650px;border:0px solid #000;z-index:100;}</style>");
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
					if (! $(e.target).attr('comp') && $(e.target).attr('name') == 'Answer' ){ //se existir a variaves as boas-vindas nao serao preenchidas
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