import { buscarLivroNaAPI, enviarLivroParaServidor } from './api.js';
import { exibirMensagem, ocultarMensagem, alternarEstadoBotao } from './ui.js';

// Persistência local de dados
let acervoLivros = JSON.parse(localStorage.getItem('bookwise_livros')) || [];

// Elementos da DOM
const formCadastro = document.getElementById('form-cadastro');
const containerLivros = document.getElementById('lista-livros');
const resumoStats = document.getElementById('resumo-acervo');
const btnBuscarAPI = document.getElementById('btn-buscar-api');
const inputBuscaAPI = document.getElementById('busca-api');

// 1. Busca Externa via API (GET Assíncrono com Tratamento de Estados)
if (btnBuscarAPI && inputBuscaAPI) {
    btnBuscarAPI.addEventListener('click', async function() {
        const termo = inputBuscaAPI.value.trim();
        const divFeedback = document.getElementById('mensagem-feedback');

        if (termo === '') {
            exibirMensagem(divFeedback, 'Digite o nome de um livro para pesquisar na nuvem.', 'erro');
            return;
        }

        // Estado: Carregando
        alternarEstadoBotao(btnBuscarAPI, true);
        exibirMensagem(divFeedback, 'Consultando a Google Books API...', 'info');

        try {
            // Chamada Assíncrona
            const livroEncontrado = await buscarLivroNaAPI(termo);

            // Estado: Sucesso
            document.getElementById('titulo').value = livroEncontrado.titulo;
            document.getElementById('autor').value = livroEncontrado.autor;
            document.getElementById('categoria').value = livroEncontrado.categoria;
            if (document.getElementById('opiniao')) {
                document.getElementById('opiniao').value = livroEncontrado.opiniao;
            }

            exibirMensagem(divFeedback, 'Dados carregados da API com sucesso! Confira e salve.', 'sucesso');
            ocultarMensagem(divFeedback, 4000);
        } catch (erro) {
            // Estado: Erro
            exibirMensagem(divFeedback, `Erro: ${erro.message}`, 'erro');
        } finally {
            alternarEstadoBotao(btnBuscarAPI, false, 'Buscar na Web');
        }
    });
}

// 2. Submissão de Formulário (POST Assíncrono para Serviço Simulado)
if (formCadastro) {
    formCadastro.addEventListener('submit', async function(evento) {
        evento.preventDefault();

        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const categoria = document.getElementById('categoria').value;
        const status = document.getElementById('status').value;
        const opiniao = document.getElementById('opiniao').value.trim();
        const divFeedback = document.getElementById('mensagem-feedback');

        if (titulo === '' || autor === '' || categoria === '') {
            exibirMensagem(divFeedback, 'Erro: Preencha todos os campos obrigatórios.', 'erro');
            return;
        }

        const novoLivro = { titulo, autor, categoria, status, opiniao };

        try {
            exibirMensagem(divFeedback, 'Enviando dados para o servidor remoto...', 'info');
            
            // Operação de Submissão (POST)
            await enviarLivroParaServidor(novoLivro);

            // Gravação local após confirmação remota
            acervoLivros.push(novoLivro);
            localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));

            exibirMensagem(divFeedback, 'Livro cadastrado e sincronizado com sucesso!', 'sucesso');
            formCadastro.reset();
            ocultarMensagem(divFeedback, 3000);
        } catch (erro) {
            exibirMensagem(divFeedback, `Aviso: Salvo apenas localmente. (${erro.message})`, 'erro');
            
            acervoLivros.push(novoLivro);
            localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));
        }
    });
}

// 3. Funções do Acervo (Renderização e Exclusão)
export function renderizarLivros() {
    if (!containerLivros) return;
    containerLivros.innerHTML = '';

    acervoLivros.forEach((livro, index) => {
        const article = document.createElement('article');
        article.className = 'card-livro';

        let statusFormatado = 'Lido';
        if (livro.status === 'quero-ler') statusFormatado = 'Quero Ler';
        if (livro.status === 'lendo') statusFormatado = 'Lendo';

        let htmlCard = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Categoria:</strong> ${livro.categoria}</p>
            <p><strong>Status:</strong> ${statusFormatado}</p>
        `;

        if (livro.opiniao) {
            htmlCard += `<p><strong>Resenha:</strong> ${livro.opiniao}</p>`;
        }

        htmlCard += `
            <div style="display: flex; gap: 0.5rem; margin-top: 15px;">
                <button onclick="abrirModalEdicao(${index})" style="flex: 1; padding: 6px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Editar</button>
                <button onclick="excluirLivro(${index})" style="flex: 1; padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Excluir</button>
            </div>
        `;

        article.innerHTML = htmlCard;
        containerLivros.appendChild(article);
    });
}

export function atualizarEstatisticas() {
    if (!resumoStats) return;

    const total = acervoLivros.length;
    const lidos = acervoLivros.filter(l => l.status === 'lido').length;
    const lendo = acervoLivros.filter(l => l.status === 'lendo').length;
    const queroLer = acervoLivros.filter(l => l.status === 'quero-ler').length;

    resumoStats.innerHTML = `
        <h2>Resumo do Acervo</h2>
        <ul>
            <li><strong>Total de Livros:</strong> ${total}</li>
            <li><strong>Lidos:</strong> ${lidos}</li>
            <li><strong>Em Leitura:</strong> ${lendo}</li>
            <li><strong>Quero Ler:</strong> ${queroLer}</li>
        </ul>
    `;
}

window.excluirLivro = function(index) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
        acervoLivros.splice(index, 1);
        localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));
        renderizarLivros();
        atualizarEstatisticas();
    }
};

window.abrirModalEdicao = function(index) {
    const livro = acervoLivros[index];
    if (!livro) return;

    document.getElementById('edit-index').value = index;
    document.getElementById('edit-titulo').value = livro.titulo || '';
    document.getElementById('edit-autor').value = livro.autor || '';
    document.getElementById('edit-categoria').value = livro.categoria || '';
    document.getElementById('edit-status').value = livro.status || '';
    document.getElementById('edit-opiniao').value = livro.opiniao || '';

    const modal = document.getElementById('modal-editar');
    if (modal) modal.classList.remove('modal-oculto');
};

window.fecharModalEdicao = function() {
    const modal = document.getElementById('modal-editar');
    if (modal) modal.classList.add('modal-oculto');
};

window.salvarEdicao = function(event) {
    event.preventDefault();
    const index = document.getElementById('edit-index').value;

    acervoLivros[index] = {
        titulo: document.getElementById('edit-titulo').value.trim(),
        autor: document.getElementById('edit-autor').value.trim(),
        categoria: document.getElementById('edit-categoria').value.trim(),
        status: document.getElementById('edit-status').value,
        opiniao: document.getElementById('edit-opiniao').value.trim()
    };

    localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));
    renderizarLivros();
    atualizarEstatisticas();
    window.fecharModalEdicao();
};

// Inicialização
renderizarLivros();
atualizarEstatisticas();