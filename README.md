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
## Funcionalidades da Etapa 05

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

