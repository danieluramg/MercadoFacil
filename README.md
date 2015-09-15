# MercadoFacil - Ferramenta para facilitar o gerenciamento das vendas no MercadoLivre
- Esta ferramente é em formato de UserScript (não é uma API do MercadoLivre), e é totalmente grátis e de código aberto para quem dezejar contribuir com melhorias e correções!
- Desenvolvido por: Daniel Plácido (daniel.uramg@gmail.com)
- Colaborador: Marco Silveira (vastar@globo.com)

**Se esta ferramenta tem te ajudado considere fazer uma doação:** https://goo.gl/gRlz5t

## Instalação:
- Para usar instale o complemento Tampermonkey no Google Chrome: [https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Depois instale o Userscript do MercadoFacil: [http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js](http://raw.githubusercontent.com/danieluramg/MercadoFacil/master/mercadofacil.user.js)

# O que isto faz?
- Depois de instalado, vai ser criado um novo menu em sua página do MercadoLivre para efetuar as configurações do MercadoFacil:

![](http://s4.postimg.org/jlax7p159/menu.png)
![](http://s30.postimg.org/mp59ibfo1/formulario.png)

## Explicando cada opção:
- Ativar/Desativar cumprimento automático:
 - Quando ativo, ao clicar no campo para responder uma pergunta, preenche automaticamente Bom dia/tarde/noite de acordo com o horário;
![](http://s9.postimg.org/plf50xh27/image.png)

- Remover banners de publicidade da página de Resumo (Auto explicativo);

- Ativar/Desativar verificação de pagamento liberado:
 - Com frequencia acontece de o MercadoLivre "esquecer" de nos pagar sobre uma determinada venda, e normalmente só ficamos sabendo disto quando acessamos os Detalhes de cada venda.
Com esta opção ativa, o MercadoFacil vai verificar automaticamente a situação do pagamento de todas suas vendas de uma vez, e exibir a situação de cada uma na lista de vendas;
![](http://s1.postimg.org/r4p7e9rwf/vifig_pag.jpg)


- Tempo para atualizar o Chat (enquanto não tiver atendentes disponíveis, fica atualizando o chat automaticamente nesse tempo até aparecer alguém):
 - O MercadoFacil injeta link de  Chat na página de Resumo do MercadoLivre, este link para contato direto com atendentes do ML aparece por padrão aleatoriamente (geralmente só para usuários com muitas vendas), agora sempre estará disponível!
![](http://s14.postimg.org/v8t1psc01/Resumo_Mercado_Livre.png)

- Altura da Textarea de criação de anúncios:
 - Particularmente acho o tamanho padrão desta área de texto muito pequena para criar anuncios, então com esta opção ajuste a seu gosto a a altura da Textarea de criação de anuncios;
![](http://s3.postimg.org/3m16ceujn/antes.png)
![](http://s3.postimg.org/n2lvyxpnn/depois.png)

- Ativar/Desativar verificação de perguntas pendentes:
 - Quando ativo, a cada 30 segundos ser verificado se existem perguntas pendentes, e quando identificar toca um som de alerta;


- Ativar/Desativar Respostas prontas:
 - Crie até 6 respostas prontas que irão aparecer no menu de contexto (botão direito) no campo de 
respoder as perguntas:
![](http://s17.postimg.org/pbbj841n3/image.png)
![](http://s17.postimg.org/b2bwq1n4f/image.png)
