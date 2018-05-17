# MercadoFacil - Ferramenta para facilitar o gerenciamento das vendas no MercadoLivre
**Esta ferramente é em formato de UserScript (não é uma API do MercadoLivre), e é totalmente grátis e de código aberto para quem dezejar contribuir com melhorias e correções!**

- Desenvolvedor: Daniel Plácido (daniel.uramg@gmail.com)
- Agradecimento por colaborações: Marco Silveira (vastar@globo.com)

**Se esta ferramenta tem te ajudado considere fazer uma doação:**
[Doar com PagSeguro](https://pagseguro.uol.com.br/checkout/v2/donation.html?currency=BRL&receiverEmail=daniel.uramg@gmail.com)

## Instalação:
- Primeiro instale o complemento Tampermonkey no Google Chrome: [https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Depois instale o Userscript do MercadoFacil: [http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js](http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js)

# O que isto faz?
- Depois de instalado, vai ser criado um novo menu em sua página do MercadoLivre para efetuar as configurações do MercadoFacil:

![](https://mercadofacil.ideias.pw/imagens/menu.png)
![](https://mercadofacil.ideias.pw/imagens/config.png)

## Explicando cada opção:
- Ativar/Desativar cumprimento automático:
 - Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário;
![](https://mercadofacil.ideias.pw/imagens/cumprimento.png)

- Remover banners de publicidade da página de Resumo (Auto explicativo);

- Ativar/Desativar verificação de pagamento liberado:
 - Com frequencia acontece de o MercadoLivre "esquecer" de nos pagar sobre uma determinada venda, e normalmente só ficamos sabendo disto quando acessamos os Detalhes de cada venda.
Com esta opção ativa, o MercadoFacil vai verificar automaticamente a situação do pagamento de todas suas vendas de uma vez, e exibir a situação de cada uma na lista de vendas;
![](https://mercadofacil.ideias.pw/imagens/pgto_bloq1.png)
![](https://mercadofacil.ideias.pw/imagens/pgto_bloq2.png)

- Ativar/Desativar Chat (**DESATIVADO**);
 - O MercadoFacil injeta link de  Chat na página de Resumo do MercadoLivre, este link para contato direto com atendentes do ML aparece por padrão aleatoriamente (geralmente só para usuários com muitas vendas), agora sempre estará disponível!
![](https://mercadofacil.ideias.pw/imagens/chat.png)
Volta e meia o MercadoLivre dava um jeito de bloquear o acesso ao chat pelo script por muita gente usar, aí até eu mesmo quando precisava não conseguia acessar.

Ainda tenho script de acesso ao chat mas vendo pelo valor simbólico de R$10,00, esta pequena contribuição diminui 99% do número de usuários então o ML não fica bloqueando, e se houer bloqueio forneço um novo script à quem tiver comprado.

[https://www.ideias.pw/script-de-chat-de-suporte-do-mercadolivre/](https://www.ideias.pw/script-de-chat-de-suporte-do-mercadolivre/)

- Altura da Textarea de criação de anúncios:
 - Particularmente acho o tamanho padrão desta área de texto muito pequena para criar anuncios, então com esta opção ajuste a seu gosto a altura da Textarea de criação de anuncios;
![](https://mercadofacil.ideias.pw/imagens/textarea.png)
![](https://mercadofacil.ideias.pw/imagens/textarea_depois.png)

- Ativar/Desativar verificação de perguntas pendentes:
 - Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta;


- Ativar/Desativar Respostas prontas:
 - Crie até 6 respostas prontas que irão aparecer no menu de contexto (botão direito) no campo de 
respoder as perguntas:
![](https://mercadofacil.ideias.pw/imagens/respostas.png)
![](https://mercadofacil.ideias.pw/imagens/respostas2.png)

- Marcar Positivos:
 - Qualifique quem te qualificou Positivo: Acesse suas vendas Encerradas, então filtre por Estado: "Sem Qualificar" (pessoas que você não qualificou), então clique no botão "Marcar Positivos", daí clique na engrenagem e clique em Qualificar para você qualificar todos que te qualificaram Positivo!
  ![](https://mercadofacil.ideias.pw/imagens/marcarpositivos.png)
  
  - Usuários Bloqueados:
   - Acesse de maneira prática e rápida a lista com os usuários que você bloqueou para não comprarem em seus anuncios, também é possível desbloquear os usuários ou bloquear através do Username. (Esta funcionalidade requer acesso à API do MercadoLivre, portanto é preciso autorizar o uso do aplicativo na primeira vez que usar.)
   ![](https://mercadofacil.ideias.pw/imagens/lockusers.png)

