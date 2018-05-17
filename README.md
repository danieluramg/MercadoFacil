# MercadoFacil - Ferramenta para facilitar o gerenciamento das vendas no MercadoLivre
**Esta ferramente é em formato de UserScript (não é uma API do MercadoLivre), e é totalmente grátis e de código aberto para quem dezejar contribuir com melhorias e correções!**

- Desenvolvido por: Daniel Plácido (daniel.uramg@gmail.com)
- Colaborador: Marco Silveira (vastar@globo.com)

**Se esta ferramenta tem te ajudado considere fazer uma doação:**
[Doar com PagSeguro](https://pagseguro.uol.com.br/checkout/v2/donation.html?currency=BRL&receiverEmail=daniel.uramg@gmail.com)

## Instalação:
- Primeiro instale o complemento Tampermonkey no Google Chrome: [https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Depois instale o Userscript do MercadoFacil: [http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js](http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js)

# O que isto faz?
- Depois de instalado, vai ser criado um novo menu em sua página do MercadoLivre para efetuar as configurações do MercadoFacil:

![](http://s4.postimg.cc/jlax7p159/menu.png)
![](http://s29.postimg.cc/t4woay9g7/config.png)

## Explicando cada opção:
- Ativar/Desativar cumprimento automático:
 - Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário;
![](http://s9.postimg.cc/plf50xh27/image.png)

- Remover banners de publicidade da página de Resumo (Auto explicativo);

- Ativar/Desativar verificação de pagamento liberado:
 - Com frequencia acontece de o MercadoLivre "esquecer" de nos pagar sobre uma determinada venda, e normalmente só ficamos sabendo disto quando acessamos os Detalhes de cada venda.
Com esta opção ativa, o MercadoFacil vai verificar automaticamente a situação do pagamento de todas suas vendas de uma vez, e exibir a situação de cada uma na lista de vendas;
![](http://s24.postimg.cc/ndb7i9i79/download.png)
![](http://s1.postimg.cc/l7ixrk4r3/download.png)

- Ativar/Desativar Chat (Auto explicativo);

- Tempo para atualizar o Chat (enquanto não tiver atendentes disponíveis, fica atualizando o chat automaticamente nesse tempo até aparecer alguém):
 - O MercadoFacil injeta link de  Chat na página de Resumo do MercadoLivre, este link para contato direto com atendentes do ML aparece por padrão aleatoriamente (geralmente só para usuários com muitas vendas), agora sempre estará disponível!
![](http://s14.postimg.cc/v8t1psc01/Resumo_Mercado_Livre.png)

- Altura da Textarea de criação de anúncios:
 - Particularmente acho o tamanho padrão desta área de texto muito pequena para criar anuncios, então com esta opção ajuste a seu gosto a altura da Textarea de criação de anuncios;
![](http://s3.postimg.cc/3m16ceujn/antes.png)
![](http://s3.postimg.cc/n2lvyxpnn/depois.png)

- Ativar/Desativar verificação de perguntas pendentes:
 - Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta;


- Ativar/Desativar Respostas prontas:
 - Crie até 6 respostas prontas que irão aparecer no menu de contexto (botão direito) no campo de 
respoder as perguntas:
![](http://s17.postimg.cc/pbbj841n3/image.png)
![](http://s17.postimg.cc/b2bwq1n4f/image.png)

- Marcar Positivos:
 - Qualifique quem te qualificou Positivo: Acesse suas vendas Encerradas, então filtre por Estado: "Sem Qualificar" (pessoas que você não qualificou), então clique no botão "Marcar Positivos", daí clique na engrenagem e clique em Qualificar para você qualificar todos que te qualificaram Positivo!
 - ![](http://s29.postimg.cc/d5e0redef/marcar_qualif.png)
