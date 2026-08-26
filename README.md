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

- Usuário
    |
    ├── possui ───► Leitura (várias)
    |
    └── tem ──────► Livro (vários, através da Leitura)

- Livro
    |
    └── está associado a ───► Leitura (várias, um livro pode ser lido por vários usuários)

- Leitura
    |
    ├── pertence a ───► Usuário (um)
    |
    └── refere-se a ───► Livro (um)

### **Entidades Principais**
- Usuário: pessoa que utiliza o sistema para gerenciar sua biblioteca pessoal.
- Livro: obra literária que o usuário pode adicionar à sua biblioteca.
- Leitura: registro que associa um usuário a um livro, contendo status, nota e resenha.

## Estrutura Prevista do Projeto

BookWise/
├── README.md
├── docs/
│   └── proposta.md
├── src/
│   ├── frontend/
│   └── backend/
└── .gitignore

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