# Nome: Tiago Machado

# Link repo GitHub: https://github.com/TimacDev/Projeto-1---Primeira-API.git


## Passos para executar o código

1. Criar a base de dados MySQL `clickup` com as tabelas necessárias (users, tasks, tags, task_tags, comments, task_users)
2. Configurar as variáveis de ambiente no ficheiro `.env` (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
3. Instalar dependências: `npm install`
4. Servidor: `npm run dev` → `http://localhost:3000`
5. Testar os endpoints usando um emulador de cliente (thunderclient, browser, etc.)


## Principais decisões tomadas e justificação

### Migração de arrays em memória para MySQL

Todos os dados passaram a ser armazenados em MySQL usando `mysql2` com pool de conexões e `.promise()` para suportar `async/await`. Os arrays em memória foram completamente removidos.

### Arquitetura em 3 camadas (Routes, Controllers, Services)

- **Services** - Executam queries SQL e devolvem os dados em bruto (rows, result). Não fazem throw de erros nem decidem status HTTP.
- **Controllers** - Recebem o request/response, fazem validações de input, verificam `affectedRows` ou valores `null` para decidir o status HTTP (400, 404, 500), e devolvem JSON.
- **Routes** - Definem os endpoints (URL + método HTTP) e ligam-nos aos controllers.

### Validação e erros nos Controllers (não nos Services)

As validações de input (campos obrigatórios, formato de email, tamanho do título) são feitas nos controllers com status 400. Os services devolvem `null` quando um registo não existe ou o `result` do MySQL com `affectedRows`, e o controller decide o status HTTP. Isto evita acoplar os services a mensagens de erro específicas e permite reutilizá-los noutros contextos.

### Uso de insertId e affectedRows

- **insertId** - Usado nos INSERT para devolver o ID gerado pela DB sem necessidade de um SELECT adicional.
- **affectedRows** - Usado nos UPDATE e DELETE para verificar se o registo existia (0 = não encontrado → 404).

### Mensagens de erro genéricas no catch

Os blocos `catch` devolvem mensagens descritivas fixas (ex: "Error creating user") em vez de `error.message`, para não expor mensagens internas da base de dados ao cliente.

### Ficheiro separado para TaskTags (relação N:N)

A associação entre tasks e tags está num `taskTagService.js` separado. O `taskController` importa este service para os endpoints `/tasks/:id/tags`, mantendo a lógica de associação isolada.

### Middlewares

- **loggerMiddleware** - Regista o método HTTP e URL de cada pedido na consola.
- **checkUserExists** - Verifica se o utilizador existe (via query à DB) antes de PUT, PATCH e DELETE, evitando duplicação desta validação.

### Comentários e Tags aninhados nas rotas de Tasks

Os endpoints de comentários (`/tasks/:id/comments`) e tags (`/tasks/:id/tags`) estão no router de tasks, refletindo as relações 1:N (comments) e N:N (tags) com as tarefas. O `taskController` trata todos estes sub-recursos.
