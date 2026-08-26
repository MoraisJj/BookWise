# Proposta do Projeto — BookWise

## 1. Nome da Aplicação
**BookWise**

## 2. Descrição do Problema
Atualmente, leitores frequentes enfrentam dificuldades para organizar sua biblioteca pessoal. Não há um local centralizado onde possam registrar todos os livros que possuem ou já leram, acompanhar o progresso de leitura, avaliar obras e visualizar estatísticas sobre seus hábitos de leitura.

Essa falta de organização resulta em esquecimento de livros que já foram lidos, dificuldade para recomendar obras a amigos e colegas da faculdade, perda de registros de avaliações pessoais e dificuldade em estabelecer metas de leitura.

O BookWise resolve esses problemas ao oferecer uma plataforma simples, intuitiva e completa para gerenciamento da biblioteca pessoal.

## 3. Público-alvo
- Leitores frequentes que desejam organizar seu acervo pessoal
- Pessoas que gostam de registrar avaliações e resenhas
- Estudantes que precisam acompanhar leituras acadêmicas
- Qualquer pessoa que queira estabelecer e acompanhar metas de leitura

## 4. Objetivo Principal
Oferecer uma plataforma para gerenciamento completo de biblioteca pessoal, permitindo que o usuário cadastre livros, acompanhe o progresso de leitura, avalie obras e visualize estatísticas sobre seus hábitos de leitura.

## 5. Funcionalidades (6 funcionalidades)
1. Cadastrar usuário - Criar conta com nome, e-mail e senha
2. Autenticar usuário - Login com e-mail e senha
3. Adicionar livro - Cadastrar livro com título, autor, ISBN, gênero, ano e sinopse
4. Gerenciar status de leitura - Alterar entre "Quero Ler", "Lendo" e "Lido"
5. Avaliar livro - Registrar nota (0 a 5) e resenha
6. Filtrar biblioteca - Visualizar livros filtrados por status de leitura
7. Excluir livro - Remover livro da biblioteca pessoal
8. Visualizar estatísticas - Gráficos com total de livros, distribuição por status e média de notas

## 6. Entidades (3 entidades principais)

### Entidades Principais
- **Usuário:** pessoa que utiliza o sistema para gerenciar sua biblioteca pessoal.
- **Livro:** obra literária que o usuário pode adicionar à sua biblioteca.
- **Leitura:** registro que associa um usuário a um livro, contendo status, nota e resenha.

### Diagrama de Domínio
- Usuário
  - possui → Leitura (várias)
  - tem → Livro (vários, através da Leitura)

- Livro
  - está associado a → Leitura (várias, um livro pode ser lido por vários usuários)

- Leitura
  - pertence a → Usuário (um)
  - refere-se a → Livro (um)

## 7. Telas (4 telas)

### Tela 1 — Login/Cadastro
- Formulário de login: campos de e-mail e senha, botão "Entrar"
- Link para alternar para formulário de cadastro
- Formulário de cadastro: campos de nome, e-mail e senha, botão "Cadastrar"

### Tela 2 — Dashboard / Biblioteca
- Lista de livros do usuário em cards
- Filtros por status (Quero Ler, Lendo, Lido)
- Busca por título ou autor
- Botão "Adicionar Livro"
- Estatísticas rápidas no topo (total de livros, lidos, lendo, quero ler)

### Tela 3 — Detalhes do Livro
- Exibe todas as informações do livro
- Botões para alterar status de leitura
- Campos para nota (0 a 5) e resenha
- Botão para editar informações do livro
- Botão para excluir livro

### Tela 4 — Estatísticas
- Total de livros na biblioteca
- Distribuição por status (gráfico de pizza)
- Média de notas dos livros lidos
- Lista dos livros mais bem avaliados

## 8. Operações (8 operações)
1. Cadastrar usuário - POST /api/register
2. Autenticar usuário - POST /api/login
3. Listar livros do usuário - GET /api/books
4. Adicionar livro - POST /api/books
5. Atualizar livro - PUT /api/books/:id
6. Excluir livro - DELETE /api/books/:id
7. Atualizar status/nota/resenha - PUT /api/reading/:bookId
8. Obter estatísticas - GET /api/stats

## 9. Tecnologias — Cliente
- HTML5
- CSS3
- JavaScript (Vanilla)

## 10. Tecnologias — Servidor
- Node.js
- Express

## 11. Tecnologia de Persistência
- SQLite

## 12. Diagrama da Solução

```txt
┌─────────────────────────────────────────────┐
│                 USUÁRIO                     │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                 FRONT-END                   │
│            HTML + CSS + JS                  │
│                                             │
│  Login  │  Dashboard  │  Estatísticas       │
└─────────────────────────────────────────────┘
                      │
                      ▼
                 HTTP / JSON
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                 BACK-END                    │
│            Node.js + Express                │
│                                             │
│  Rotas  │  Controllers  │  Models           │
└─────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                 BANCO DE DADOS              │
│                  SQLite                     │
│                                             │
│  Usuário  │  Livro  │  Leitura              │
└─────────────────────────────────────────────┘
```