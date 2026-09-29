# Etapa 04 - Interatividade com JavaScript

## Funcionalidades Interativas Implementadas

Nesta etapa, foi adicionado o comportamento dinâmico à aplicação BookWise utilizando JavaScript. Desenvolvendo as seguintes funcionalidades:

### 1. Validação e Inclusão Dinâmica de Livros
* **Descrição:** O usuário preenche o formulário para adicionar um novo livro. O sistema valida se os campos obrigatórios (Título, Autor e Categoria) foram preenchidos. Se estiver tudo correto, o livro é salvo no `localStorage` e uma mensagem de sucesso é injetada no DOM.
* **Arquivos:** `cadastrar-livro.html`, `script.js`
* **Conceitos:** Tratamento de eventos (`submit`), Manipulação do DOM (exibição de feedback), Validação de formulários e Uso de arrays (`push`).
* **Validações e Situações Inválidas:** Se o usuário tentar enviar o formulário com campos vazios (burlando o HTML), o JavaScript bloqueia o envio (`preventDefault()`) e injeta uma mensagem de erro vermelha na tela.

### 2. Renderização Dinâmica e Exclusão de Livros
* **Descrição:** Ao acessar a página inicial, o JavaScript lê o array de livros salvo no `localStorage` e cria dinamicamente os cartões (cards) de cada livro na tela usando `document.createElement`. Cada cartão possui um botão "Excluir Livro", que remove o item específico do array e atualiza a interface instantaneamente.
* **Arquivos:** `index.html`, `script.js`
* **Conceitos:** Uso de funções (`renderizarLivros`, `excluirLivro`), Métodos de iteração (`forEach`) e Alteração dinâmica da interface.

### 3. Atualização Automática de Estatísticas
* **Descrição:** O sistema calcula a quantidade total de livros e filtra as quantidades específicas por status de leitura (Lido, Lendo, Quero Ler), atualizando a seção "Resumo do Acervo" na página inicial.
* **Arquivos:** `index.html`, `script.js`
* **Conceitos:** Métodos de iteração (`filter`), Uso de funções (`atualizarEstatisticas`) e Manipulação do DOM (`innerHTML`).

---

## Instruções para Teste
1. Abra o arquivo `cadastrar-livro.html` no navegador.
2. Tente clicar em "Salvar Livro" sem preencher os dados para ver o tratamento de erro.
3. Preencha os dados e clique em "Salvar Livro" para ver a mensagem de sucesso dinâmica.
4. Navegue até a página inicial (`index.html`). O novo livro deve aparecer na listagem e as estatísticas devem estar atualizadas.
5. Clique no botão "Excluir Livro" em qualquer card e confirme para ver a alteração dinâmica da interface (o livro some e os números diminuem).

---

## Matriz de Evidências

| Requisito | Funcionalidade relacionada | Arquivo(s) | Evidência |
| :--- | :--- | :--- | :--- |
| **Manipulação do DOM** | Exibição de mensagens de sucesso/erro e criação de cards. | `script.js` (linhas 31, 51, 84) | Print da mensagem verde de sucesso no cadastro ou do novo card renderizado. |
| **Tratamento de eventos** | Interceptação do envio do formulário (`addEventListener`). | `script.js` (linha 18) | Print do formulário funcionando/bloqueando o recarregamento. |
| **Validação de formulários** | Verificação de campos vazios antes de salvar. | `script.js` (linhas 29 a 35) | Print da mensagem de erro vermelha no formulário. |
| **Alteração dinâmica da interface** | Exclusão de um livro da tela em tempo real. | `script.js` (linhas 66 a 75) | Print da tela inicial antes e depois de clicar em excluir. |
| **Uso de funções** | Modularização da renderização e cálculo de estatísticas. | `script.js` (linhas 64, 80, 115) | Código-fonte (`renderizarLivros`, `atualizarEstatisticas`, `excluirLivro`). |
| **Uso de arrays** | Armazenamento e manipulação da lista de livros. | `script.js` (linhas 4, 46) | Código-fonte (`acervoLivros.push(novoLivro)`). |
| **Métodos de iteração** | Percorrer a lista para renderizar e contar. | `script.js` (linhas 85, 119) | Código-fonte (`forEach` para cards e `filter` para estatísticas). |
| **Tratamento de situações inválidas** | Bloqueio de cadastro sem dados obrigatórios. | `script.js` (linhas 29 a 35) | Print do erro apontando os campos faltantes. |