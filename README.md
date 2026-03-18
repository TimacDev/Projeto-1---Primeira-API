# Nome: Tiago Machado

# Link repo GitHub: 


## Passos para executar o código


1. Servidor: `http://localhost:3000`

2. Testar os endpoints usando um emulador de cliente (thunderclient, browser, etc.)


## Principais decisões tomadas e justificação

### Arquitetura em 3 camadas (Routes, Controllers, Services)

Cada camada tem uma responsabilidade única:

- **Routes** - Definem os endpoints (URL + metodo HTTP) e ligam-nos aos controllers
- **Controllers** - Recebem o request/response, chamam o service e devolvem JSON
- **Services** - Contem a logica de negócio, validações e manipulação de dados


### Validação nos Services com throw/catch

As validações são feitas nos services usando `throw new Error`. Os controllers apanham estes erros com `try/catch` e devolvem o status adequado. Esta abordagem mantem os controllers simples e centraliza a lógica de negócio nos services.

### Ficheiro separado para TaskTags (relacao N:N)

A associacao entre tasks e tags esta num ficheiro separado (`taskTagService.js`) em vez de estar dentro do `taskService.js`. Esta decisão melhora a organização do codigo, evitando que um unico ficheiro acumule demasiada responsabilidade. O `taskTagService` importa os outros services para validar a existencia de tasks e tags antes de criar associacoes.

### Resolucção de dependências circulares com require local

Quando dois services precisam um do outro (ex: `tagService` e `taskTagService`), o `require` e feito dentro das funções em vez de no topo do ficheiro. Isto evita dependências circulares que causariam erros, porque quando a função e chamada ambos os módulos ja estão completamente carregados.

### Middlewares 

- **loggerMiddleware** - Regista o método HTTP e URL de cada pedido na consola
- **checkUserExists** - Verifica se o utilizador existe antes de executar operações como PUT, PATCH e DELETE, evitando duplicacao desta validação em cada controller

### Comentarios aninhados nas rotas de Tasks

Os endpoints de comentários (`/tasks/:id/comments`) estão registados no router de tasks em vez de terem um router separado. Isto reflete a relação 1:N entre tasks e comments, onde os comentários pertencem sempre a uma tarefa específica.
