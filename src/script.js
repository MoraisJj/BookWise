// API para persistir os dados
let acervoLivros = JSON.parse(localStorage.getItem('bookwise_livros')) || [];

// Selecionando elementos, resgatando pelo id correspondente
const formCadastro = document.getElementById('form-cadastro');
const containerLivros = document.getElementById('lista-livros');
const resumoStats = document.getElementById('resumo-acervo');

// Validação e Eventos
if (formCadastro) {
    formCadastro.addEventListener('submit', function(evento) { // sempre que o evento submit for disparado ele executa a funcao
        evento.preventDefault(); // bloqueia o comportamento de recarregar a pagina e tenta enviar os dados para um servidor 

        // acesso dos elementos pelos ids respectivos, lendo ".value", texto armazenado em locais temporarios p/ ser validado  
        const titulo = document.getElementById('titulo').value.trim();
        const autor = document.getElementById('autor').value.trim();
        const categoria = document.getElementById('categoria').value;
        const status = document.getElementById('status').value;
        const opiniao = document.getElementById('opiniao').value.trim();
        
        const divFeedback = document.getElementById('mensagem-feedback');

        // Tratamento de situações inválidas
        if (titulo === '' || autor === '' || categoria === '') {
            divFeedback.textContent = 'Erro: Preencha todos os campos obrigatórios marcados.';
            divFeedback.style.backgroundColor = '#f8d7da';
            divFeedback.style.color = '#721c24';
            divFeedback.style.display = 'block';
            return; // return p/ interromper a função antes de salvar
        }

        // se passar, os dados sao organizados dentro do objeto "novoLivro"
        const novoLivro = {
            titulo: titulo,
            autor: autor,
            categoria: categoria,
            status: status,
            opiniao: opiniao
        };

        acervoLivros.push(novoLivro); // metodo push p/ o objeto ser inserido no final da lista
        localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros)); // converte Array de objetos numa string formatada antes de salvar

        divFeedback.textContent = 'Livro cadastrado com sucesso!';
        divFeedback.style.backgroundColor = '#d4edda';
        divFeedback.style.color = '#155724';
        divFeedback.style.display = 'block';

        formCadastro.reset(); 

        setTimeout(function() {
            divFeedback.style.display = 'none';
        }, 3000);
    });
}

// Essa função recebe a posição (index) do livro na lista e o apaga
function excluirLivro(index) {
    // Exibe uma caixa de confirmação nativa do navegador
    const confirmacao = confirm('Tem certeza que deseja excluir este livro do acervo?');
    
    if (confirmacao) {
        // Remove 1 item da lista (Array) a partir da posição (index)
        acervoLivros.splice(index, 1);
        
        // Salva a lista atualizada no armazenamento do navegador
        localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));
        
        // Atualiza a tela imediatamente
        renderizarLivros();
        atualizarEstatisticas();
    }
}

// Alteração Dinâmica e Iteração
function renderizarLivros() {
    if (!containerLivros) return;

    containerLivros.innerHTML = ''; // limpeza dos containers

    // index para saber qual é a posição exata de cada livro
    acervoLivros.forEach(function(livro, index) { // percorre a lista e desenha apenas a lista atualizada
        const article = document.createElement('article');
        article.className = 'card-livro';

        let statusFormatado = '';
        if(livro.status === 'quero-ler') statusFormatado = 'Quero Ler';
        else if(livro.status === 'lendo') statusFormatado = 'Lendo';
        else if(livro.status === 'lido') statusFormatado = 'Lido';

        let htmlCard = `
            <h3>${livro.titulo}</h3>
            <p><strong>Autor:</strong> ${livro.autor}</p>
            <p><strong>Categoria:</strong> ${livro.categoria}</p>
            <p><strong>Status:</strong> ${statusFormatado}</p>
        `;

        if (livro.opiniao) {
            htmlCard += `<p><strong>Resenha:</strong> ${livro.opiniao}</p>`;
        }

        // Injeta os botões de Editar e Excluir lado a lado
        htmlCard += `
            <div style="display: flex; gap: 0.5rem; margin-top: 15px;">
                <button onclick="abrirModalEdicao(${index})" style="flex: 1; padding: 6px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Editar
                </button>
                <button onclick="excluirLivro(${index})" style="flex: 1; padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Excluir
                </button>
            </div>
        `;

        article.innerHTML = htmlCard;
        containerLivros.appendChild(article);
    });
}

function atualizarEstatisticas() { 
    if (!resumoStats) return;

    const total = acervoLivros.length;
    const lidos = acervoLivros.filter(livro => livro.status === 'lido').length;
    const lendo = acervoLivros.filter(livro => livro.status === 'lendo').length;
    const queroLer = acervoLivros.filter(livro => livro.status === 'quero-ler').length;

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

// Execução inicial para desenhar a interface ao carregar a página
renderizarLivros();
atualizarEstatisticas(); 

// Abre o modal e preenche os campos com os dados atuais do livro
function abrirModalEdicao(index) {
    const livro = acervoLivros[index];
    if (!livro) return;

    document.getElementById('edit-index').value = index;
    document.getElementById('edit-titulo').value = livro.titulo || '';
    document.getElementById('edit-autor').value = livro.autor || '';
    document.getElementById('edit-categoria').value = livro.categoria || '';
    document.getElementById('edit-status').value = livro.status || '';
    document.getElementById('edit-opiniao').value = livro.opiniao || '';

    const modal = document.getElementById('modal-editar');
    if (modal) {
        modal.classList.remove('modal-oculto');
    }
}

// Fecha a janela de edição
function fecharModalEdicao() {
    const modal = document.getElementById('modal-editar');
    if (modal) {
        modal.classList.add('modal-oculto');
    }
}

// Salva as edições feitas
function salvarEdicao(event) {
    event.preventDefault();

    const index = document.getElementById('edit-index').value;

    // Substitui as informações na posição exata do array
    acervoLivros[index] = {
        titulo: document.getElementById('edit-titulo').value.trim(),
        autor: document.getElementById('edit-autor').value.trim(),
        categoria: document.getElementById('edit-categoria').value.trim(),
        status: document.getElementById('edit-status').value,
        opiniao: document.getElementById('edit-opiniao').value.trim()
    };

    // Atualiza o localStorage, recarrega a tela e fecha o modal
    localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));
    renderizarLivros();
    atualizarEstatisticas();
    fecharModalEdicao();
}