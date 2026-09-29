// Estrutura de dados
let acervoLivros = JSON.parse(localStorage.getItem('bookwise_livros')) || [];


// Selecionando elementos
const formCadastro = document.getElementById('form-cadastro');
const containerLivros = document.getElementById('lista-livros');
const resumoStats = document.getElementById('resumo-acervo');


// Validação e Eventos
if (formCadastro) {
    formCadastro.addEventListener('submit', function(evento) {
        evento.preventDefault(); 

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
            return;
        }

        const novoLivro = {
            titulo: titulo,
            autor: autor,
            categoria: categoria,
            status: status,
            opiniao: opiniao
        };

        acervoLivros.push(novoLivro);
        localStorage.setItem('bookwise_livros', JSON.stringify(acervoLivros));

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

    containerLivros.innerHTML = '';

    // index para saber qual é a posição exata de cada livro
    acervoLivros.forEach(function(livro, index) {
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

        // Injeta o botão de exclusão no final do cartão, passando a posição (index) do livro
        htmlCard += `
            <button onclick="excluirLivro(${index})" style="margin-top: 15px; padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">
                Excluir Livro
            </button>
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

renderizarLivros();
atualizarEstatisticas();