#  BookWise

## Descrição
BookWise é uma aplicação web para gerenciamento de biblioteca pessoal, permitindo que usuários organizem seus livros, acompanhem o progresso de leitura, avaliem obras e visualizem estatísticas sobre seus hábitos de leitura.

## Objetivo
Leitores frequentes enfrentam dificuldades para organizar seu acervo pessoal, acompanhar o que já leram, o que estão lendo e o que pretendem ler. Além disso, não possuem um local centralizado para registrar avaliações e resenhas. O BookWise resolve esses problemas oferecendo uma plataforma simples e intuitiva para gestão completa da biblioteca pessoal.

## Tecnologias Utilizadas
- **Front-end:** HTML5, CSS3, JavaScript (Vanilla)
- **Back-end:** Node.js + Express
- **Banco de Dados:** SQLite
- **Controle de Versão:** Git

## Funcionalidades Planejadas
- Cadastro e autenticação de usuários
- Adicionar livros à biblioteca pessoal
- Editar informações de livros
- Excluir livros da biblioteca
- Alterar status de leitura (Quero Ler, Lendo, Lido)
- Registrar nota (0 a 5) e resenha
- Filtrar livros por status
- Visualizar estatísticas de leitura

## Diagrama de Domínio

```
Usuário
  |
  ├── possui ──► Leitura (várias)
  |
  └── tem ──► Livro (vários, através da Leitura)

Livro
  |
  └── está associado a ──► Leitura (várias)

Leitura
  |
  ├── pertence a ──► Usuário (um)
  |
  └── refere-se a ──► Livro (um)
```

### **Entidades Principais**
- Usuário: pessoa que utiliza o sistema para gerenciar sua biblioteca pessoal.
- Livro: obra literária que o usuário pode adicionar à sua biblioteca.
- Leitura: registro que associa um usuário a um livro, contendo status, nota e resenha.

## Estrutura Prevista do Projeto

```
BookWise/
├── README.md
├── docs/
│   └── proposta.md
├── src/
│   ├── frontend/
│   └── backend/
└── .gitignore
```

## Escopo Inicial

### **Incluído**
- Cadastro de usuário com nome, e-mail e senha
- Login e logout de usuários
- Adicionar livros à biblioteca pessoal
- Editar informações de livros (título, autor, ISBN, gênero, ano, sinopse)
- Excluir livros da biblioteca
- Alterar status de leitura (Quero Ler, Lendo, Lido)
- Registrar nota (0 a 5) e resenha
- Filtrar livros por status de leitura
- Visualizar estatísticas básicas (total de livros, lidos, lendo, quero ler)
- Interface responsiva para desktop e mobile
- Persistência de dados com SQLite
- API REST com Node.js + Express

### **Não incluído inicialmente**
- Upload de imagens (capa dos livros)
- Integração com API externa (Google Books, OpenLibrary)
- Compartilhamento de biblioteca entre usuários
- Notificações ou lembretes de leitura
- Modo escuro
- Gráficos interativos (serão adicionados futuramente)
- Deploy em nuvem (Heroku, Vercel, etc.)
- Testes automatizados
- Suporte a múltiplos idiomas

## Etapa 02 — Protótipo Estrutural com HTML Semântico

### Páginas Criadas
* `src/index.html`: Dashboard com listagem dos livros do acervo e resumo de leituras.
* `src/login.html`: Interface de autenticação contendo formulários de login e cadastro.
* `src/cadastrar-livro.html`: Formulário para inclusão de novos títulos na biblioteca.

### Decisões da Estrutura HTML Semântica
* Uso de elementos `<header>`, `<nav>`, `<main>` e `<footer>` para estabelecer a estrutura funcional de todas as páginas.
* Utilização de `<article>` para delimitar cada livro na listagem, facilitando a acessibilidade e organização.
* Todos os campos de formulários (`<input>`, `<select>`, `<textarea>`) possuem `<label>` explicitamente associados via atributo `for` ao respectivo `id`.

## Estrutura do Projeto

```
BookWise/
├── README.md
├── docs/
│   └── proposta.md
└── src/
    ├── index.html
    ├── login.html
    └── cadastrar-livro.html
```

## Etapa 03 — Interface Responsiva com CSS

* Nesta etapa foram feitas as alterações no HTML Semântico anterior, sendo feita a implementação da interface responsiva com o CSS. As telas foram 
devidamente implementadas para serem responsivas à diferentes tipos de dispositivos, como: desktop, tablet e smartphone. 

## Estrutura do Projeto


```
BookWise/
├── README.md
├── docs/
│   └──evidencias
│      └──etapa-03
│   └── proposta.md
└── src/
    ├── index.html
    ├── login.html
    └── cadastrar-livro.html
```

## Etapa 04: Interatividade com JavaScript
Nesta etapa, o projeto ganhou comportamento dinâmico. JavaScript foi implementado para gerenciar os dados da aplicação diretamente no navegador do usuário, utilizando `localStorage`. As funcionalidades desenvolvidas incluem a validação de formulários, cadastro de novos livros, exclusão de itens e recálculo automático das estatísticas do acervo, tudo em tempo real e sem recarregar a página.

## Estrutura do Projeto

```
BookWise/
├── README.md
├── docs/
│   ├── evidencias/
│   │   ├── etapa-03/
│   │   └── etapa-04/
│   ├── proposta.md
│   └── etapa-04.md
└── src/
    ├── index.html
    ├── login.html
    ├── cadastrar-livro.html
    ├── styles.css
    └── script.js
```
## Etapa 05 - Consumo de API Externa e Programação Assíncrona  

- **Consulta Assíncrona a API Externa (GET):** Busca de livros em tempo real utilizando a *Open Library API* com preenchimento automático de Título, Autor e identificação inteligente de Categoria (ex: classificação automática para livros de *Tecnologia*).
- **Submissão Remota Simulada (POST):** Envio de dados em segundo plano para o serviço remoto *JSONPlaceholder*, simulando persistência em nuvem antes da gravação local.
- **Gerenciamento de Estados da Interface:**
  - **Carregamento (Loading):** Desabilitação de botões e indicação visual durante requisições HTTP.
  - **Sucesso:** Preenchimento dinâmico dos campos e avisos visuais de confirmação.
  - **Erro:** Tratamento de exceções via `try...catch` para falhas de rede ou buscas sem resultados.
- **Arquitetura Modular ES6:** Separação completa de responsabilidades em arquivos isolados (`api.js`, `ui.js`, `main.js`).
- **CRUD Completo e Persistência:** Operações de Criação, Leitura, Edição (via Modal flutuante) e Exclusão com armazenamento em `localStorage`.
- Correção dos CARDS dos Livros. 

---

## Tecnologias Utilizadas

- **HTML5 Semântico:** Estruturação acessível (`<header>`, `<main>`, `<article>`, `<form>`).
- **CSS3:** Layouts responsivos construídos com **CSS Grid** e **Flexbox**.
- **JavaScript (ES6 Modules):** Modularização nativa com `import` / `export` sem dependência de bibliotecas externas.
- **Fetch API & Async/Await:** Comunicação HTTP assíncrona baseada em Promises.
- **LocalStorage:** Persistência de dados no navegador do usuário.
- **APIs Externas:** [Open Library API](https://openlibrary.org/dev/docs/api/search) (GET) e [JSONPlaceholder](https://jsonplaceholder.typicode.com/) (POST).

---

## Estrutura de Arquivos

```
src/
└── frontend/
    ├── index.html            # Interface do acervo e resumo estatístico
    ├── cadastrar-livro.html  # Formulário de cadastro e busca via API
    ├── styles.css            # Estilização global (CSS Grid, Flexbox e Modal)
    └── js/
        ├── api.js            # Módulo de chamadas HTTP assíncronas (Fetch API)
        ├── ui.js             # Módulo de manipulação da DOM e estados da interface
        └── main.js           # Módulo principal (orquestrador e LocalStorage)
```
---

##  Etapa 06 — API REST da Aplicação

Servidor back-end desenvolvido em **Node.js** com **Express**, disponibilizando o recurso `/livros` com operações CRUD completas, armazenamento inicial em memória, validação de entrada, respostas padronizadas em JSON e códigos HTTP semânticos.

###  Estrutura do Back-end (Etapa 06)

```text
src/backend/
├── controllers/
│   └── livrosController.js      # Lógica de negócio, validações e respostas HTTP
├── routes/
│   └── livrosRoutes.js          # Definição das rotas REST (/livros)
├── bookwise-collection.json     # Coleção exportada (Thunder Client / Postman / Insomnia)
├── package.json                 # Dependências e scripts de execução
└── server.js                    # Configuração do Express, CORS e porta 3000
```

###  Instruções para Execução

1. Abra o terminal na pasta do servidor:
   ```bash
   cd src/backend
   ```
2. Instale as dependências (`express` e `cors`):
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```
4. A API ficará disponível em `http://localhost:3000`.
5. Para testar todas as rotas automaticamente, importe o arquivo `src/backend/bookwise-collection.json` no **Thunder Client**, **Postman** ou **Insomnia**.

---

###  Documentação dos Endpoints (`/livros`)

| Método | Endpoint | Descrição | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/livros` | Lista todos os livros cadastrados | `200 OK` |
| `GET` | `/livros/:id` | Busca um livro específico pelo ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `POST` | `/livros` | Cadastra um novo livro no acervo | `201 Created`, `400 Bad Request` |
| `PUT` | `/livros/:id` | Atualiza os dados de um livro existente | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/livros/:id` | Remove um livro específico pelo ID | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

### Exemplos de Requisições e Respostas

#### 1. Listar todos os livros (`GET /livros`)
* **Resposta (`200 OK`):**
```json
[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "categoria": "Tecnologia",
    "status": "lido",
    "opiniao": "Essencial para aprender boas práticas de legibilidade e refatoração."
  }
]
```

#### 2. Consulta individual (`GET /livros/1`)
* **Resposta (`200 OK`):**
```json
{
  "id": 1,
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "categoria": "Tecnologia",
  "status": "lido",
  "opiniao": "Essencial para aprender boas práticas de legibilidade e refatoração."
}
```

#### 3. Cadastrar novo livro (`POST /livros`)
* **Corpo da Requisição (`application/json`):**
```json
{
  "titulo": "O Programador Pragmático",
  "autor": "Andrew Hunt e David Thomas",
  "categoria": "Tecnologia",
  "status": "quero-ler",
  "opiniao": "Leitura fundamental sobre engenharia de software."
}
```
* **Resposta (`201 Created`):**
```json
{
  "id": 3,
  "titulo": "O Programador Pragmático",
  "autor": "Andrew Hunt e David Thomas",
  "categoria": "Tecnologia",
  "status": "quero-ler",
  "opiniao": "Leitura fundamental sobre engenharia de software."
}
```

#### 4. Atualizar livro (`PUT /livros/3`)
* **Corpo da Requisição (`application/json`):**
```json
{
  "titulo": "O Programador Pragmático",
  "autor": "Andrew Hunt e David Thomas",
  "categoria": "Tecnologia",
  "status": "lido",
  "opiniao": "Concluído! Excelentes dicas práticas para o dia a dia."
}
```
* **Resposta (`200 OK`):**
```json
{
  "id": 3,
  "titulo": "O Programador Pragmático",
  "autor": "Andrew Hunt e David Thomas",
  "categoria": "Tecnologia",
  "status": "lido",
  "opiniao": "Concluído! Excelentes dicas práticas para o dia a dia."
}
```

#### 5. Excluir livro (`DELETE /livros/3`)
* **Resposta (`200 OK`):**
```json
{
  "mensagem": "Livro removido com sucesso.",
  "livro": {
    "id": 3,
    "titulo": "O Programador Pragmático",
    "autor": "Andrew Hunt e David Thomas",
    "categoria": "Tecnologia",
    "status": "lido",
    "opiniao": "Concluído! Excelentes dicas práticas para o dia a dia."
  }
}
```

#### 6. Exemplos de Tratamento de Erros
* **Campo obrigatório ausente (`POST /livros` com `{"titulo": ""}`):**
  * **Status:** `400 Bad Request`
  * **Resposta:** `{"erro": "O campo 'titulo' é obrigatório."}`
* **Registro inexistente (`GET /livros/999`):**
  * **Status:** `404 Not Found`
  * **Resposta:** `{"erro": "Livro com ID 999 não encontrado."}`

### 7. Exemplos de Operações CRUD

#### 1. Create — Cadastrar Categoria (`POST /categorias`)
* **Corpo da Requisição (`application/json`):**
```json
{
  "nome": "Ciência de Dados",
  "descricao": "Estatística, inteligência artificial e análise de dados."
}
```
* **Resposta (`201 Created`):**
```json
{
  "id": 4,
  "nome": "Ciência de Dados",
  "descricao": "Estatística, inteligência artificial e análise de dados."
}
```

#### 2. Create — Cadastrar Livro Relacionado (`POST /livros`)
* **Corpo da Requisição (`application/json`):**
```json
{
  "titulo": "Arquitetura Limpa",
  "autor": "Robert C. Martin",
  "status": "quero-ler",
  "opiniao": "Leitura essencial sobre design e arquitetura de software.",
  "categoria_id": 1
}
```
* **Resposta (`201 Created`):**
```json
{
  "id": 3,
  "titulo": "Arquitetura Limpa",
  "autor": "Robert C. Martin",
  "status": "quero-ler",
  "opiniao": "Leitura essencial sobre design e arquitetura de software.",
  "categoria_id": 1,
  "categoria_nome": "Tecnologia"
}
```

#### 3. Read — Listar Livros Persistidos (`GET /livros`)
* **Resposta (`200 OK`):**
```json
[
  {
    "id": 1,
    "titulo": "Clean Code",
    "autor": "Robert C. Martin",
    "status": "lido",
    "opiniao": "Essencial para aprender boas práticas de legibilidade e refatoração.",
    "categoria_id": 1,
    "categoria_nome": "Tecnologia"
  },
  {
    "id": 2,
    "titulo": "Dom Casmurro",
    "autor": "Machado de Assis",
    "status": "lendo",
    "opiniao": "Clássico da literatura brasileira com narrador não confiável.",
    "categoria_id": 2,
    "categoria_nome": "Literatura"
  }
]
```

#### 4. Read — Consultar Categoria por ID (`GET /categorias/1`)
* **Resposta (`200 OK`):**
```json
{
  "id": 1,
  "nome": "Tecnologia",
  "descricao": "Livros sobre programação, engenharia de software e computação."
}
```

#### 5. Update — Atualizar Livro (`PUT /livros/3`)
* **Corpo da Requisição (`application/json`):**
```json
{
  "titulo": "Arquitetura Limpa",
  "autor": "Robert C. Martin",
  "status": "lido",
  "opiniao": "Concluído! Excelente guia sobre desacoplamento.",
  "categoria_id": 1
}
```
* **Resposta (`200 OK`):**
```json
{
  "id": 3,
  "titulo": "Arquitetura Limpa",
  "autor": "Robert C. Martin",
  "status": "lido",
  "opiniao": "Concluído! Excelente guia sobre desacoplamento.",
  "categoria_id": 1,
  "categoria_nome": "Tecnologia"
}
```

#### 6. Delete — Excluir Livro (`DELETE /livros/3`)
* **Resposta (`200 OK`):**
```json
{
  "mensagem": "Livro removido com sucesso.",
  "livro": {
    "id": 3,
    "titulo": "Arquitetura Limpa",
    "autor": "Robert C. Martin",
    "status": "lido",
    "opiniao": "Concluído! Excelente guia sobre desacoplamento.",
    "categoria_id": 1,
    "categoria_nome": "Tecnologia"
  }
}
```
#  Etapa 07 — Persistência e CRUD com Banco de Dados

Evolução da API REST do **BookWise** substituindo o armazenamento temporário em memória por persistência real em banco de dados relacional (**SQLite**), contemplando duas entidades relacionadas (`categorias` e `livros`), desacoplamento via padrão **Repository**, validações de entrada e tratamento de erros de persistência e integridade referencial.

---

### 1. Escolha do Banco de Dados e Justificativa

* **Banco de Dados Escolhido:** **SQLite** (Modelo Relacional), integrado por meio do módulo nativo `node:sqlite` do Node.js.
* **Justificativa da Escolha:**
  1. **Integridade Referencial e Consistência:** O domínio do BookWise possui entidades estruturadas com dependência direta entre si (`categorias` e `livros`). O modelo relacional permite garantir a consistência dos dados no próprio banco por meio de chaves primárias (`PRIMARY KEY`), restrições de unicidade (`UNIQUE`), validação de domínio (`CHECK`) e chaves estrangeiras (`FOREIGN KEY`).
  2. **Portabilidade e Execução Imediata:** O SQLite armazena todo o banco de dados em um único arquivo local (`src/backend/database/bookwise.sqlite`), eliminando a necessidade de instalar ou configurar servidores externos de banco de dados para executar e avaliar a aplicação.
  3. **Desacoplamento entre API e Banco (Padrão Repository):** Toda a lógica de acesso a dados e comandos SQL foi isolada na camada `src/backend/repositories/`. As rotas e os controladores HTTP não possuem acoplamento direto com o SQLite, facilitando futuras manutenções ou migrações de SGBD.

---

### 2. Arquitetura do Back-end

```text
src/backend/
├── database/
│   ├── connection.js            # Conexão SQLite, PRAGMA foreign_keys, DDL e seed inicial
│   └── bookwise.sqlite          # Arquivo do banco de dados gerado automaticamente
├── repositories/
│   ├── categoriaRepository.js   # Operações SQL da entidade categorias
│   └── livroRepository.js       # Operações SQL da entidade livros (com INNER JOIN)
├── controllers/
│   ├── categoriasController.js  # Regras de negócio, validações e erros HTTP de /categorias
│   └── livrosController.js      # Regras de negócio, validações e erros HTTP de /livros
├── routes/
│   ├── categoriasRoutes.js      # Definição dos endpoints /categorias
│   └── livrosRoutes.js          # Definição dos endpoints /livros
├── bookwise-collection.json     # Coleção exportada (Thunder Client / Postman / Insomnia)
├── package.json                 # Dependências e scripts de execução
└── server.js                    # Configuração do Express, CORS e registro das rotas
```

---

### 3. Modelo do Banco de Dados

#### Diagrama Entidade-Relacionamento (DER)

```text
+--------------------------+          +-----------------------------------+
|        categorias        |          |              livros               |
+--------------------------+          +-----------------------------------+
| PK id        INTEGER     |1       N | PK id           INTEGER           |
|    nome      TEXT UNIQUE |<---------|    titulo       TEXT              |
|    descricao TEXT        |          |    autor        TEXT              |
+--------------------------+          |    status       TEXT              |
                                      |    opiniao      TEXT              |
                                      | FK categoria_id INTEGER           |
                                      +-----------------------------------+
```

#### Script SQL de Criação (DDL)

```sql
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS livros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    autor TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'quero-ler' CHECK (status IN ('lido', 'lendo', 'quero-ler')),
    opiniao TEXT,
    categoria_id INTEGER NOT NULL,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
);
```

---

### 4. Descrição das Entidades e Relacionamentos

#### Entidade `categorias` (Entidade Pai)
Armazena os gêneros ou áreas temáticas utilizadas para organizar o acervo de leitura:
* **`id`** (`INTEGER`, `PRIMARY KEY AUTOINCREMENT`): Identificador único gerado automaticamente para cada categoria.
* **`nome`** (`TEXT`, `NOT NULL UNIQUE`): Nome da categoria (obrigatório e único no banco, impedindo categorias duplicadas).
* **`descricao`** (`TEXT`, opcional): Descrição resumida sobre os tipos de obras pertencentes à categoria.

#### Entidade `livros` (Entidade Filha)
Armazena os livros cadastrados pelo usuário, suas anotações e o status de leitura:
* **`id`** (`INTEGER`, `PRIMARY KEY AUTOINCREMENT`): Identificador único gerado automaticamente para cada livro.
* **`titulo`** (`TEXT`, `NOT NULL`): Título da obra (obrigatório).
* **`autor`** (`TEXT`, `NOT NULL`): Nome do(a) autor(a) da obra (obrigatório).
* **`status`** (`TEXT`, `NOT NULL DEFAULT 'quero-ler'`): Situação atual de leitura, restrita pela cláusula `CHECK` aos valores `'lido'`, `'lendo'` ou `'quero-ler'`.
* **`opiniao`** (`TEXT`, opcional): Resenha ou comentários pessoais sobre a leitura.
* **`categoria_id`** (`INTEGER`, `NOT NULL`, `FOREIGN KEY`): Chave estrangeira que referencia `categorias(id)`, vinculando o livro à sua categoria.

#### Relacionamento (`1:N` — Um para Muitos)
* **Cardinalidade:** Uma **Categoria** (`1`) pode estar associada a **zero ou muitos Livros** (`N`), enquanto cada **Livro** pertence obrigatoriamente a **uma única Categoria**.
* **Integridade Referencial (`ON DELETE RESTRICT`):** Não é permitido cadastrar ou atualizar um livro informando um `categoria_id` inexistente, nem excluir uma categoria enquanto houver livros vinculados a ela.

---

### 5. Instruções para Criação do Banco e Execução

1. Abra o terminal na pasta do back-end:
   ```bash
   cd src/backend
   ```
2. Instale as dependências (`express` e `cors`):
   ```bash
   npm install
   ```
3. **Criação do banco de dados:** O arquivo `src/backend/database/bookwise.sqlite`, as tabelas (`categorias` e `livros`) e os registros iniciais (*seed*) são criados automaticamente pelo módulo `database/connection.js` assim que o servidor é iniciado (também pode ser executado isoladamente com `node database/connection.js`).
4. Inicie a aplicação:
   ```bash
   npm start
   ```
5. O servidor ficará disponível em `http://localhost:3000`. Todos os dados inseridos, alterados ou removidos permanecem salvos no arquivo `bookwise.sqlite` mesmo após encerrar e reiniciar o servidor.
6. Para testar todas as rotas no **Thunder Client**, **Postman** ou **Insomnia**, importe o arquivo `src/backend/bookwise-collection.json`.

---

### 6. Documentação dos Endpoints

| Método | Endpoint | Descrição | Códigos HTTP |
| :--- | :--- | :--- | :--- |
| `GET` | `/categorias` | Lista todas as categorias cadastradas | `200 OK`, `500` |
| `GET` | `/categorias/:id` | Consulta uma categoria específica pelo ID | `200 OK`, `400`, `404`, `500` |
| `POST` | `/categorias` | Cadastra uma nova categoria | `201 Created`, `400`, `409`, `500` |
| `PUT` | `/categorias/:id` | Atualiza uma categoria existente | `200 OK`, `400`, `404`, `409`, `500` |
| `DELETE` | `/categorias/:id` | Exclui uma categoria sem livros vinculados | `200 OK`, `400`, `404`, `409`, `500` |
| `GET` | `/livros` | Lista todos os livros com dados da categoria (`INNER JOIN`) | `200 OK`, `500` |
| `GET` | `/livros/:id` | Consulta um livro específico pelo ID | `200 OK`, `400`, `404`, `500` |
| `POST` | `/livros` | Cadastra um novo livro vinculado a uma categoria | `201 Created`, `400`, `500` |
| `PUT` | `/livros/:id` | Atualiza os dados de um livro existente | `200 OK`, `400`, `404`, `500` |
| `DELETE` | `/livros/:id` | Remove um livro pelo ID | `200 OK`, `400`, `404`, `500` |

#### 7. Delete — Excluir Categoria sem Vínculos (`DELETE /categorias/4`)
* **Resposta (`200 OK`):**
```json
{
  "mensagem": "Categoria removida com sucesso."
}
```

#### 8. Exemplos de Validação e Tratamento de Erros de Persistência
* **Chave estrangeira inexistente (`POST /livros` com `"categoria_id": 999`):**
  * **Status:** `400 Bad Request`
  * **Resposta:** `{"erro": "A categoria com ID 999 não existe. Cadastre a categoria antes de vincular o livro."}`
* **Violação de unicidade `UNIQUE` (`POST /categorias` com `"nome": "Tecnologia"`):**
  * **Status:** `409 Conflict`
  * **Resposta:** `{"erro": "Já existe uma categoria cadastrada com esse nome."}`
* **Violação de integridade referencial `FOREIGN KEY` (`DELETE /categorias/1` com livros vinculados):**
  * **Status:** `409 Conflict`
  * **Resposta:** `{"erro": "Não é possível excluir esta categoria pois existem livros vinculados a ela."}`
* **Registro inexistente (`GET /livros/999`):**
  * **Status:** `404 Not Found`
  * **Resposta:** `{"erro": "Livro com ID 999 não encontrado."}`
