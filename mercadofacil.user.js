// ==UserScript==
// @name	MercadoFacil
// @author	Daniel Plácido (daniel.uramg@gmail.com)
// @website https://www.ideias.pw/mercadofacil-scriptaplicativo-para-mercadolivre/
// @description	Modificações na página do ML para facilitar o gerenciamento das vendas
// @version	2.1.190528.1038
// @downloadURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @updateURL	https://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js
// @require	https://www.ideias.pw/userscripts/jquery-2.1.1.min.js
// @require	https://www.ideias.pw/js/jquery-simple-context-menu/jquery.contextmenu.js
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
    var version = GM_info.script.version;

    //Capturar Username e UserID
    function getUsernameID(){
        if (debug == 1) GM_log('Capturar Username e ID do usuário');
        //Primeiro captura o Username do usuário
        $.get("https://myaccount.mercadolivre.com.br/profile", function(data, status){
            username = $('span', $('.field-value__group__value', $(data))).html().replace(' ', '+');
            GM_setValue('mf_username', username);
            if (debug == 1) GM_log("Username capturado: " + username);
            //Agora captura a ID com o Username
            $.getJSON("https://api.mercadolibre.com/sites/MLB/search?nickname=" + username, function(data){
                user_id = data.seller.id;
                GM_setValue('mf_userid', user_id);
                if (debug == 1) GM_log("user_id capturada: " + user_id);
            });
        });
    }
    //Capturar Username e UserID

    //injeta botão de configuração do MercdoFacil
    setTimeout(function(){
        var mfacil_button = '<section class="myml-nav__section "> <input class="myml-nav__section-toggle-trigger" type="checkbox" id="myml-menu-section-toggle-my_mercadofacil"> <span class="myml-nav__section-heading myml-nav__section-heading--has-items"> <label for="myml-menu-toggle" class="myml-nav__section-icon myml-nav__section-icon--my_purchases" data-tooltip="MercadoFacil"> <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700.000000 663.000000" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,663.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"> <path d="M6050 6430 c-36 -11 -75 -19 -87 -20 -11 0 -38 -9 -60 -19 -21 -11 -54 -26 -74 -35 -20 -9 -42 -22 -49 -31 -7 -8 -17 -15 -22 -15 -10 0 -120 -78 -129 -93 -4 -5 -17 -14 -29 -20 -13 -7 -31 -24 -39 -38 -9 -14 -36 -51 -61 -82 -25 -31 -59 -82 -75 -114 -16 -32 -37 -70 -47 -85 -10 -14 -18 -37 -18 -51 0 -14 -3 -27 -8 -29 -4 -1 -16 -43 -26 -92 -11 -54 -28 -105 -43 -127 -23 -35 -81 -79 -103 -79 -5 0 -34 -11 -64 -25 -30 -14 -58 -25 -63 -25 -4 0 -44 -17 -88 -39 -253 -124 -334 -161 -348 -161 -9 0 -19 -4 -22 -10 -3 -5 -15 -10 -26 -10 -10 0 -19 -4 -19 -10 0 -5 -7 -10 -15 -10 -8 0 -15 -4 -15 -10 0 -5 -6 -10 -14 -10 -7 0 -40 -13 -72 -29 -109 -54 -214 -101 -224 -101 -6 0 -18 -4 -28 -9 -9 -5 -62 -31 -117 -57 -55 -27 -101 -52 -103 -56 -2 -5 -10 -8 -18 -8 -8 0 -22 -4 -32 -9 -9 -5 -44 -21 -77 -36 -33 -15 -87 -40 -119 -56 -32 -16 -65 -29 -74 -29 -16 0 -95 -41 -100 -52 -2 -5 -9 -8 -16 -8 -7 0 -50 -18 -95 -40 -45 -22 -85 -40 -89 -40 -4 0 -45 -18 -92 -41 -47 -23 -103 -50 -125 -60 -156 -71 -199 -89 -216 -89 -10 0 -19 -4 -19 -10 0 -5 -6 -10 -12 -10 -7 0 -47 -19 -88 -43 -41 -23 -91 -49 -110 -56 -19 -7 -62 -26 -95 -41 -33 -16 -80 -36 -105 -46 -25 -9 -49 -21 -55 -26 -5 -4 -17 -8 -27 -8 -10 0 -18 -4 -18 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10 -20 -10 -11 0 -20 -4 -20 -10 0 -5 -9 -10 -19 -10 -11 0 -22 -4 -25 -9 -3 -5 -52 -28 -108 -52 -57 -24 -127 -56 -157 -71 -29 -16 -62 -28 -72 -28 -10 0 -19 -4 -19 -10 0 -5 -7 -10 -15 -10 -8 0 -30 -9 -50 -20 -19 -11 -50 -28 -67 -38 -18 -10 -57 -26 -87 -36 -29 -9 -70 -27 -90 -39 -20 -13 -67 -38 -106 -56 -38 -18 -78 -37 -87 -42 -10 -5 -40 -9 -67 -9 -48 0 -58 4 -236 97 -164 86 -536 86 -700 0 -101 -52 -127 -68 -171 -100 -65 -47 -67 -59 -62 -320 3 -175 8 -218 21 -183 3 7 33 22 66 32 33 10 61 22 61 27 0 4 7 7 15 7 8 0 30 9 50 20 57 32 182 26 215 -10 8 -9 119 -60 130 -60 5 0 26 -9 47 -21 21 -12 56 -31 78 -42 46 -25 95 -66 95 -81 0 -6 9 -22 20 -36 21 -27 28 -124 10 -135 -5 -3 -10 -19 -10 -35 0 -16 -4 -32 -10 -35 -5 -3 -10 -21 -10 -40 0 -19 -4 -37 -10 -40 -5 -3 -10 -22 -10 -41 0 -19 -4 -34 -10 -34 -5 0 -10 -18 -10 -39 0 -22 -4 -43 -10 -46 -5 -3 -10 -16 -10 -27 0 -24 -65 -108 -83 -108 -7 1 -82 -34 -167 -77 -85 -42 -168 -82 -185 -89 -64 -26 -185 -86 -190 -94 -10 -15 7 -40 31 -46 13 -3 24 -10 24 -15 0 -5 9 -9 20 -9 11 0 20 -4 20 -10 0 -5 8 -10 18 -10 10 0 22 -3 25 -6 12 -12 112 -43 139 -44 15 0 30 -4 33 -10 3 -5 37 -10 75 -10 38 0 72 -4 75 -10 8 -13 72 -13 80 0 3 6 33 10 65 10 32 0 62 4 65 10 3 5 21 10 38 10 18 1 57 10 87 21 30 11 63 23 73 26 9 3 17 9 17 14 0 5 9 9 20 9 11 0 20 3 20 8 0 4 13 13 29 20 16 7 39 22 52 34 13 11 40 31 60 43 55 35 134 117 154 158 9 20 21 37 26 37 5 0 9 6 9 13 0 8 10 23 23 35 13 12 29 38 37 57 8 19 17 35 22 35 4 0 8 9 8 20 0 11 3 20 8 20 9 0 30 88 39 162 3 28 12 62 18 75 19 35 94 113 110 113 8 0 15 5 15 10 0 6 6 10 13 10 6 0 30 9 52 19 22 11 63 30 90 41 28 12 77 35 109 51 32 16 67 29 77 29 11 0 19 5 19 10 0 6 9 10 19 10 11 0 21 4 23 8 4 10 172 92 190 92 7 0 94 41 192 90 99 50 183 90 188 90 4 0 31 11 60 25 28 14 57 25 64 25 11 0 75 32 157 78 21 12 44 22 52 22 8 0 31 10 52 21 21 12 56 30 78 41 22 11 48 24 57 29 10 5 25 9 33 9 8 0 15 5 15 10 0 6 12 10 26 10 14 0 38 8 52 18 33 22 184 95 232 112 19 7 82 35 140 62 58 28 125 60 150 71 25 12 56 29 70 38 14 9 50 25 80 34 30 9 64 21 75 27 75 41 131 68 142 68 7 0 13 5 13 10 0 6 9 10 20 10 19 0 59 18 70 31 8 9 139 69 150 69 6 0 18 4 28 9 84 45 273 131 286 131 9 0 16 5 16 10 0 6 7 10 15 10 14 0 85 30 95 40 15 15 53 30 74 30 14 0 27 4 31 9 10 17 151 87 250 125 86 34 159 68 163 79 2 4 12 7 23 7 10 0 19 5 19 10 0 6 40 10 99 10 75 0 102 -4 111 -15 22 -27 161 -85 223 -92 20 -3 40 -9 43 -14 3 -5 29 -9 59 -9 30 0 57 -4 60 -10 3 -5 44 -10 90 -10 46 0 87 5 90 10 3 6 28 10 55 10 27 0 52 5 55 10 3 6 21 10 39 10 19 0 47 7 62 15 16 8 36 15 45 15 23 0 120 51 126 66 3 8 11 14 19 14 8 0 14 4 14 8 0 5 11 14 25 20 l25 12 0 235 0 235 -32 -7 c-18 -3 -48 -15 -65 -25 -18 -10 -49 -27 -68 -38 -27 -15 -54 -20 -113 -20 -78 0 -93 5 -207 68 -11 6 -60 30 -110 54 -49 23 -91 46 -93 50 -2 4 -10 8 -19 8 -22 0 -43 25 -43 52 0 13 -9 34 -20 48 -20 26 -29 110 -11 110 8 0 14 23 27 113 4 20 10 40 15 43 5 3 9 20 9 39 0 19 5 37 10 40 6 3 10 19 10 35 0 16 5 32 10 35 6 3 10 21 10 39 0 56 94 146 151 146 10 0 38 11 61 25 24 13 86 45 138 71 52 25 103 50 112 55 10 5 24 9 31 9 25 0 122 57 125 74 5 24 -77 86 -113 86 -7 0 -30 9 -52 20 -105 54 -381 76 -503 40z"></path> <path d="M2302 6267 c-19 -20 -22 -35 -22 -99 0 -76 0 -77 -46 -132 l-45 -56 -78 0 -77 0 -67 55 c-93 77 -102 76 -209 -32 -110 -113 -113 -126 -41 -188 36 -32 53 -54 53 -70 0 -13 5 -27 10 -30 16 -10 12 -109 -6 -144 -9 -17 -42 -49 -74 -71 -55 -38 -63 -40 -132 -40 -114 0 -118 -5 -118 -149 0 -110 1 -119 23 -139 20 -19 35 -22 99 -22 67 0 80 -3 106 -25 17 -14 34 -25 39 -25 10 0 41 -35 61 -68 14 -26 16 -118 2 -127 -5 -3 -10 -16 -10 -28 0 -14 -24 -46 -65 -87 -36 -35 -65 -68 -65 -73 0 -18 196 -199 217 -201 16 -1 42 18 85 61 52 52 68 63 98 64 19 1 49 4 65 8 52 12 106 -21 152 -93 17 -26 23 -48 21 -68 -5 -29 6 -46 17 -28 3 5 15 10 26 10 10 0 19 3 19 8 0 4 10 12 23 18 12 5 62 31 110 57 49 26 94 47 100 47 6 0 43 15 81 34 109 53 165 76 181 76 8 0 15 5 15 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 7 10 16 10 9 0 27 9 41 20 14 11 43 25 64 30 32 9 39 15 39 35 0 13 -4 27 -10 30 -5 3 -10 33 -10 65 0 66 20 98 94 151 35 26 47 29 118 29 112 0 117 7 118 162 0 143 -4 148 -120 148 -83 0 -97 6 -167 74 -42 39 -43 41 -43 107 0 38 5 71 10 74 6 3 10 16 10 28 0 14 21 44 55 77 34 34 55 63 55 77 0 15 -29 51 -85 108 -108 107 -122 109 -203 30 -53 -51 -60 -55 -104 -55 -27 0 -57 -5 -67 -12 -24 -15 -74 8 -117 54 -47 50 -54 69 -54 156 0 110 -3 112 -162 112 -117 0 -126 -1 -146 -23z m276 -536 c199 -99 203 -103 304 -313 11 -23 10 -224 -1 -246 -5 -9 -16 -33 -25 -52 -36 -77 -111 -170 -156 -195 -23 -13 -35 -19 -99 -49 -14 -6 -80 -11 -160 -11 -123 0 -140 3 -173 23 -21 12 -54 31 -74 43 -45 25 -114 93 -114 112 0 8 -9 22 -20 32 -11 10 -20 26 -20 35 0 9 -6 22 -12 29 -9 8 -13 55 -13 159 0 138 2 150 25 191 14 24 31 54 38 66 13 25 124 125 138 125 5 0 20 9 34 20 14 11 35 20 47 20 12 0 25 5 28 10 8 12 228 13 253 1z"></path> <path d="M5378 4176 c-46 -49 -280 -284 -295 -296 -52 -45 -164 -56 -225 -22 -18 10 -61 27 -95 38 -35 10 -63 22 -63 27 0 4 -13 7 -30 7 -16 0 -30 5 -30 10 0 6 -6 10 -14 10 -8 0 -23 11 -34 25 l-20 25 -68 -35 c-38 -19 -77 -35 -86 -35 -10 0 -18 -4 -18 -10 0 -5 -7 -10 -16 -10 -9 0 -28 -6 -42 -14 -48 -24 -137 -69 -152 -76 -8 -4 -53 -25 -100 -48 -47 -22 -107 -48 -135 -57 -61 -21 -139 -57 -143 -67 -2 -5 -12 -8 -23 -8 -10 0 -19 -3 -19 -7 0 -9 -48 -33 -65 -33 -6 0 -64 -27 -128 -60 -65 -33 -126 -60 -137 -60 -10 0 -22 -4 -25 -10 -3 -5 -15 -10 -26 -10 -10 0 -19 -4 -19 -10 0 -5 -7 -10 -15 -10 -8 0 -15 -4 -15 -10 0 -5 -6 -10 -14 -10 -7 0 -40 -13 -72 -29 -106 -52 -171 -81 -182 -81 -5 0 -30 -10 -54 -21 -80 -40 -143 -72 -176 -91 -18 -10 -39 -18 -47 -18 -8 0 -17 -11 -21 -25 -3 -14 -10 -25 -15 -25 -5 0 -9 -9 -9 -20 0 -11 -4 -20 -8 -20 -5 0 -15 -19 -22 -42 -32 -110 -57 -153 -109 -197 l-49 -41 -239 0 c-237 0 -240 0 -261 -23 -22 -23 -22 -28 -22 -343 l0 -321 23 -21 c23 -21 31 -22 268 -22 l245 0 29 -30 c16 -16 34 -30 41 -30 13 0 44 -54 44 -76 0 -8 9 -28 20 -46 11 -18 20 -43 20 -55 0 -13 5 -23 10 -23 6 0 10 -9 10 -20 0 -11 5 -20 10 -20 6 0 10 -9 10 -19 0 -11 5 -23 10 -26 6 -3 10 -30 10 -60 0 -30 -4 -57 -10 -60 -5 -3 -10 -16 -10 -29 0 -15 -51 -73 -170 -192 -185 -185 -198 -206 -142 -241 26 -17 80 -70 167 -165 22 -24 65 -66 95 -95 30 -28 76 -73 102 -100 68 -69 74 -73 110 -73 29 0 52 19 198 165 130 131 170 165 191 165 15 0 40 7 55 15 42 22 54 20 151 -30 48 -25 95 -45 105 -45 9 0 20 -4 23 -10 3 -5 16 -10 29 -10 23 0 59 -33 89 -82 15 -24 17 -61 17 -281 0 -252 0 -254 23 -275 23 -22 28 -22 358 -22 247 0 338 3 347 12 9 9 12 84 12 275 0 169 4 263 10 263 6 0 10 7 10 16 0 27 74 94 104 94 14 0 26 5 26 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 9 10 20 10 11 0 34 8 52 18 133 74 128 73 151 60 12 -6 41 -10 65 -9 l43 3 179 -180 c106 -107 188 -182 202 -184 18 -3 48 21 144 117 67 66 127 126 135 134 133 130 213 218 214 234 1 14 -56 78 -182 203 -177 176 -183 183 -183 222 0 23 -4 44 -10 47 -25 15 -8 68 76 238 13 27 24 55 24 63 0 18 44 64 62 64 7 0 19 9 26 20 12 19 23 20 272 20 247 0 261 1 280 20 19 19 20 33 20 345 0 312 -1 326 -20 345 -19 19 -33 20 -269 20 l-248 0 -49 42 c-69 60 -67 59 -83 103 -7 22 -33 81 -57 132 -43 89 -56 154 -34 168 6 3 10 19 10 36 0 25 28 57 181 208 115 114 180 185 177 196 -1 9 -111 124 -243 256 -242 242 -265 259 -297 225z m-1050 -1087 c98 -23 168 -53 213 -90 26 -22 51 -39 57 -39 6 0 37 -29 69 -64 57 -62 123 -175 123 -209 0 -9 5 -17 10 -17 6 0 10 -13 10 -30 0 -16 5 -30 10 -30 6 0 10 -26 10 -59 0 -33 5 -63 10 -66 6 -3 10 -26 10 -50 0 -24 -4 -47 -10 -50 -5 -3 -10 -33 -10 -66 0 -33 -4 -59 -10 -59 -5 0 -10 -11 -10 -25 0 -14 -4 -33 -9 -43 -5 -9 -24 -48 -42 -85 -31 -64 -139 -197 -161 -197 -6 0 -24 -11 -40 -25 -38 -32 -166 -95 -221 -108 -48 -12 -277 -14 -322 -3 -62 16 -185 73 -185 87 0 5 -9 9 -19 9 -11 0 -23 9 -26 20 -3 11 -11 20 -16 20 -17 0 -107 74 -121 100 -7 14 -16 27 -20 30 -14 11 -88 163 -88 181 0 10 -4 21 -10 24 -5 3 -10 26 -10 50 0 24 -4 47 -10 50 -5 3 -10 44 -10 90 0 46 5 87 10 90 6 3 10 26 10 50 0 24 5 47 10 50 6 3 10 15 10 27 0 11 8 32 19 46 10 15 24 44 32 65 7 21 21 46 31 57 10 11 18 23 18 28 0 12 177 166 195 170 8 2 15 8 15 13 0 5 9 9 19 9 11 0 23 5 26 10 3 6 16 10 29 10 12 0 26 3 30 8 4 4 47 15 94 24 92 18 197 17 280 -3z"></path> </g> </svg> </label> <label for="myml-menu-section-toggle-my_mercadofacil" class="myml-nav__section-title">MercadoFacil</label> </span> <div class="myml-nav__section-list"> <span class="myml-nav__menu-item" style="cursor: pointer;" id="mfacil_config">Configurações</span> </div> <div class="myml-nav__section-list"> <span class="myml-nav__menu-item" style="cursor: pointer;" id="mfacil_bl_users">Usuários Bloqueados</span> </div> </section>';
        $('.myml-nav__section:last').after(mfacil_button);
        if (debug == 1) GM_log("Link do MercadoFacil injetado"); //debug
    },1500);

    //Classe para a div de configuração e changelog
    $("head").append("<style type='text/css'>#div_mfacil{box-shadow: 0 3px 14px #333; border-radius: 5px; display:block;position:absolute;top:400px;left:50%;margin-left:-300px;margin-top:-300px;padding:10px;width:750px;border:0px solid #000;z-index:100;}</style>");
    var div_mfacil_fundo = '<div id="mfacil_fundo" style="  background-color: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 1011;"></div>';
    var div_mfacil = '<div id="div_mfacil" style="z-index: 1011;background-color: #FFFFFF">   <a class="ch-close" onclick="$(\'#div_mfacil, #mfacil_fundo\').remove();" style="z-index:1010"></a> ';

    //variávels das configurações salvas do MercadoFacil
    var mf_username = GM_getValue("mf_username");
    var mf_userid = GM_getValue("mf_userid");
    var mf_version = GM_getValue("mercadoFacil_version");
    var mf_t1 = GM_getValue("mercadoFacil_t1");
    var mf_t2 = GM_getValue("mercadoFacil_t2");
    var mf_t3 = GM_getValue("mercadoFacil_t3");
    var mf_t4 = GM_getValue("mercadoFacil_t4");
    var mf_t5 = GM_getValue("mercadoFacil_t5");
    var mf_t6 = GM_getValue("mercadoFacil_t6");
    var mf_r1 = GM_getValue("mercadoFacil_r1");
    var mf_r2 = GM_getValue("mercadoFacil_r2");
    var mf_r3 = GM_getValue("mercadoFacil_r3");
    var mf_r4 = GM_getValue("mercadoFacil_r4");
    var mf_r5 = GM_getValue("mercadoFacil_r5");
    var mf_r6 = GM_getValue("mercadoFacil_r6");
    var mf_first_install = GM_getValue("mercadoFacil_first_install");
    var mf_cumprimento = GM_getValue("mercadoFacil_cumprimento");
    var mf_respostas = GM_getValue("mercadoFacil_respostas");
    var mf_perguntas = GM_getValue("mercadoFacil_perguntas");
    var mf_banners = GM_getValue("mercadoFacil_banners");
    var mf_pagamento = GM_getValue("mercadoFacil_pagamento");
    var mf_textarea = GM_getValue("mercadoFacil_textarea"); if (mf_textarea == null) mf_textarea = '560';

    //Se for a primeira vez que o script é carregado exibe Div de configuração
    if (mf_first_install != "instalado"){
        getUsernameID();
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
            $('.myml-menu-advertising').remove(); //banner lateral da págida ne resumo (nova)
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

        //chama função para capturar Username e ID
        getUsernameID();

        setTimeout(function(){
            alert("Configurações salvas com sucesso!");
            location.reload();
        },1000);


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
    if (debug == 1) GM_log("Link do Bloqueio de usuários injetado"); //debug

    //Quando clica no botão de Usuários Bloqueados
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
                //Chama a função pra exibir os bloqueados
                getlocks();
            },
            onerror: function(res){
                alert("Houve um erro ao tentar receber a tabela de usuários bloqueados, atualize a página e tente novamente.");
            }
        });
    });

    //requisita o access_token
    function getToken(param1){
        if (debug == 1) GM_log("Dentro da getToken()");
        var expires_in = GM_getValue('mf_expires_in');
        //Define variavel com timestrap atual para comparar com o vencimento do token
        var agora = Math.round(new Date().getTime()/1000);

        if (expires_in < agora || !expires_in || param1 == 'force'){
            if (debug == 1) GM_log('Token venceu, renovar..');
            if (debug == 1) GM_log('Agora: ' + agora);
            if (debug == 1) GM_log('expires_in: ' + expires_in);
            $.getJSON("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x72\x65\x6E\x65\x77\x5F\x74\x6F\x6B\x65\x6E\x2E\x70\x68\x70\x3F\x75\x73\x65\x72\x5F\x69\x64\x3D" + mf_userid, function(retorno){
                //se recebeu o token, grava ele
                if (retorno.access_token){
                    GM_setValue('mf_access_token', retorno.access_token);
                    GM_setValue('mf_expires_in', retorno.expires_in);
                    //se não existir o token provavelmente o usuario nunca se autenticou, então abre a janela para autorizar o app
                }else{
                    if (debug == 1) GM_log('Token não existe, abre janela para autenticar');
                    window.open("\x68\x74\x74\x70\x73\x3A\x2F\x2F\x6D\x65\x72\x63\x61\x64\x6F\x66\x61\x63\x69\x6C\x2E\x69\x64\x65\x69\x61\x73\x2E\x70\x77\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70","janela1","width=600, height=600, directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no");
                }
            });
        }
    }
    //requisita o access_token

    //Mostrar usuários bloqueados
    function getlocks(){
        var mf_access_token = GM_getValue('mf_access_token');
        //Se não existir access_token requisita ele, da um tempo e chama novamente a getlocks()
        if (mf_access_token){
            if (debug == 1) GM_log('dentro do getlocks()');
            $('#employeed_table').empty();
            $('#employeed_table').append('<tr id="mf_loading"><td align="center" colspan="5"> Carregando lista de usuários, pode demorar um pouco... <img id="webtracker_loading" src="https://http2.mlstatic.com/secure/org-img/ch/assets/0.3/loading.gif"/></td></tr>');

            //Requisita a lista de usuarios bloqueados
            $.getJSON("https://api.mercadolibre.com/users/" + mf_userid + "/order_blacklist?access_token=" + mf_access_token, function(data){
                //Cria um laço para percorrer cada usuário bloqueado
                for (var i = 0; i < data.length; i++) {
                    $('#contador').remove();$('.table').before('<span id="contador">Total de usuários bloqueados: '+(i+1)+'</span>');
                    employee_data = '<tr>';
                    //Define a variável com os dados do usuário armazenados
                    if (GM_getValue('blocked_user_id_'+data[i].user.id)){
                        tempuser = JSON.parse(GM_getValue('blocked_user_id_'+data[i].user.id));
                    }else{
                        tempuser = '';
                    }
                    //Se não existir os dados então faz o request dos dados dele
                    if (! tempuser){
                        $.getJSON("https://api.mercadolibre.com/users/" + data[i].user.id + "?access_token=" + mf_access_token, function(valor){
                            username = valor.nickname;
                            registration_date = valor.registration_date;
                            registration_date = registration_date.substr(8,2) + "/" + registration_date.substr(5,2) + "/" + registration_date.substr(0,4) + " - " + registration_date.substr(11,2) + ":" + registration_date.substr(14,2);
                            city = valor.address.state + " - " + valor.address.city;
                            points = valor.points;
                            permalink = valor.permalink;
                            //cria uma array temporária com os dados do usuário
                            tempuserdata = [username, registration_date, city, points, permalink];
                            //Armazena os dados do usuário
                            GM_setValue('blocked_user_id_'+valor.id,  JSON.stringify(tempuserdata));
                            //Injeta os dados na página
                            employee_data += "<td><a target='_blank' href='" + permalink + "'>" + username + " (" + points + ")</a></td>";
                            employee_data += '<td>' + city + '</td>';
                            employee_data += '<td>' + registration_date + '</td>';
                            employee_data += '<td>' + valor.id + '</td>';
                            employee_data += '<td align="center"><a href="#" id="unlock" username="' + username + '" user_id="' + valor.id + '"><font color="#FF0000"><b>X</b></font></a></td>';
                            employee_data += '</tr>';
                            $('#employeed_table').append(employee_data);
                        })
                        //Se já existe os dados armazenados, apenas injeta na página
                    }else{
                        employee_data += "<td><a target='_blank' href='" + tempuser[4] + "'>" + tempuser[0] + " (" + tempuser[3] + ")</a></td>";
                        employee_data += '<td>' + tempuser[2] + '</td>';
                        employee_data += '<td>' + tempuser[1] + '</td>';
                        employee_data += '<td>' + data[i].user.id + '</td>';
                        employee_data += '<td align="center"><a href="#" id="unlock" username="' + tempuser[0] + '" user_id="' + data[i].user.id + '"><font color="#FF0000"><b>X</b></font></a></td>';
                        employee_data += '</tr>';
                        $('#employeed_table').append(employee_data);
                    }
                }
            })
            //Remove o "loading" quando terminar de preencher
                .done(function() {
                $('#mf_loading').empty();
            })
                .fail(function(data) {
                //if (data.responseJSON.message == "invalid_token"){
                if (debug == 1) GM_log("Token inválido, renovar o token");
                getToken('force');
                setTimeout(function(){
                    getlocks();
                },5000);
                //}
            });
        }else{
            if (debug == 1 ) GM_log('access_token não encontrado dentro da getlocks()....');
            getToken();
            setTimeout(function(){
                getlocks();
            },5000);
        }
    }
    //Mostrar usuários bloqueados

    //Desbloquear usuário
    $(document).on('click', '#unlock', function(){
        var mf_access_token = GM_getValue('mf_access_token');
        var user_id = $(this).attr('user_id');
        var username = $(this).attr('username');
        x = confirm('Deseja desbloquear o ' + username + '?');
        if (x == true){
            GM_xmlhttpRequest({
                url: "https://api.mercadolibre.com/users/" + mf_userid + "/order_blacklist/" + user_id + "?access_token=" + mf_access_token,
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
        var mf_access_token = GM_getValue('mf_access_token');
        var username = $('#username').val();
        if(username){
            $.getJSON("https://api.mercadolibre.com/sites/MLB/search?nickname=" + username, function(data){
                var user_id = data.seller.id;
                $.ajax({
                    url: "https://api.mercadolibre.com/users/" + mf_userid + "/order_blacklist?access_token=" + mf_access_token,
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
    /******************** BLOQUEIO DE USUÁRIOS ********************/
});
