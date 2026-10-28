// Módulo de Comunicação com APIs Externas

// Função auxiliar para mapear assuntos da API em categorias amigáveis
function identificarCategoria(subjects = [], titulo = '') {
    const textoAnalise = (subjects.join(' ') + ' ' + titulo).toLowerCase();
    
    // Palavras-chave associadas à área de Tecnologia/Computação
    const termosTech = [
        'computer', 'computac', 'software', 'program', 'algorithm', 
        'algoritmo', 'code', 'codigo', 'data', 'web', 'developer', 
        'desenvolv', 'tech', 'tecnologia', 'intelligence', 'inteligencia', 
        'system', 'sistema', 'database', 'banco de dados', 'python', 'java', 'javascript'
    ];

    // Verifica se algum termo de tecnologia está presente nos assuntos ou no título
    const ehTecnologia = termosTech.some(termo => textoAnalise.includes(termo));

    if (ehTecnologia) {
        return 'Tecnologia';
    }

    // Se houver algum assunto em português/genérico retornado
    if (subjects.length > 0) {
        return subjects[0];
    }

    return 'Geral';
}

// 1. Consulta Assíncrona (GET) - Open Library API
export async function buscarLivroNaAPI(termo) {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&limit=1`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`Erro na conexão com o servidor (${resposta.status})`);
        }

        const dados = await resposta.json();

        if (!dados.docs || dados.docs.length === 0) {
            throw new Error('Nenhum livro foi encontrado com esse termo.');
        }

        const info = dados.docs[0];

        // Processa a categoria inteligente com base no título e assuntos retornados
        const categoriaDetectada = identificarCategoria(info.subject || [], info.title || termo);

        return {
            titulo: info.title || termo,
            autor: info.author_name ? info.author_name.join(', ') : 'Autor Desconhecido',
            categoria: categoriaDetectada,
            opiniao: info.first_sentence ? (Array.isArray(info.first_sentence) ? info.first_sentence[0] : info.first_sentence) : 'Livro técnico consultado via API externa.'
        };
    } catch (erro) {
        if (erro.message.includes('429')) {
            throw new Error('Limite temporário atingido. Tente novamente em alguns instantes.');
        }
        throw erro;
    }
}

// 2. Submissão Assíncrona para Serviço Simulado (POST) - JSONPlaceholder
export async function enviarLivroParaServidor(livro) {
    try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livro)
        });

        if (!resposta.ok) {
            throw new Error('Falha ao sincronizar o livro com o servidor remoto.');
        }

        return await resposta.json();
    } catch (erro) {
        throw erro;
    }
}