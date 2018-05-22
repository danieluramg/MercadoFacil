
# Usuários Bloqueados
**A lista de Usuários Bloqueados nunca aparece**
Ao requisitar a lista de Usuários Bloqueados, o MercadoFacil primeiro requisita esta lista através da API do MercadoLivre, que retorna a lista com a ID de cada usuário bloqueado, no entanto para requisitar outras informações (como Username e Localização por exemplo), o aplicativo precisa fazer uma nova requisição para **cada** usuário bloqueado, então se você tiver mil usuários bloqueados serão 1.000 requisições!
Para se ter uma ideia de como isto é "cansativo" para o aplicativo, assista o vídeo abaixo:
[![](https://www.awesomescreenshot.com/upload//15384/e10b6864-c8e8-494d-727f-bc755620f155.png)](https://www.youtube.com/watch?v=1AaBntFQ0Os)

O MercadoFacil só vai mostrar a lista de usuários depois que ele capturar os dados de todos os usuários, então como você pôde ver o processo é demasiadamente longo se você tiver muitos usuários bloqueados!

 - Para tirar a prova-real do seu caso: 
   - Antes de clicar no "Usuários Bloqueados" na sua página, pressione F12, em seguida clique na guia Network (pra você ver como no vídeo acima), aí vai estar carregando todas as requisições uma por linha, se tiver aparecendo várias linhas em seguida (como no vídeo), então está tudo certo, a lista só não apareceu ainda pois não terminou de carregar!
