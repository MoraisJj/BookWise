// Base de dados em memória (simula o banco de dados da aplicação)
let livros = [
    {
        id: 1,
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        categoria: "Tecnologia",
        status: "lido",
        opiniao: "Essencial para aprender boas práticas de legibilidade e refatoração."
    },
    {
        id: 2,
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        categoria: "Literatura",
        status: "lendo",
        opiniao: "Clássico da literatura brasileira com narrador não confiável."
    }
];

let proximoId = 3;
const STATUS_VALIDOS = ["lido", "lendo", "quero-ler"];

// 1. GET /livros — Consulta geral
export function listarLivros(req, res) {
    return res.status(200).json(livros);
}

// 2. GET /livros/:id — Consulta individual
export function buscarLivroPorId(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    const livro = livros.find((item) => item.id === id);

    if (!livro) {
        return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
    }

    return res.status(200).json(livro);
}

// 3. POST /livros — Criação de novo livro
export function criarLivro(req, res) {
    const { titulo, autor, categoria, status, opiniao } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ erro: "O campo 'titulo' é obrigatório." });
    }

    if (!autor || typeof autor !== "string" || autor.trim() === "") {
        return res.status(400).json({ erro: "O campo 'autor' é obrigatório." });
    }

    const statusNormalizado = status ? status.toLowerCase().trim() : "quero-ler";
    if (!STATUS_VALIDOS.includes(statusNormalizado)) {
        return res.status(400).json({
            erro: "Status inválido. Valores aceitos: 'lido', 'lendo' ou 'quero-ler'."
        });
    }

    const novoLivro = {
        id: proximoId++,
        titulo: titulo.trim(),
        autor: autor.trim(),
        categoria: categoria && categoria.trim() !== "" ? categoria.trim() : "Geral",
        status: statusNormalizado,
        opiniao: opiniao ? opiniao.trim() : ""
    };

    livros.push(novoLivro);

    return res.status(201).json(novoLivro);
}

// 4. PUT /livros/:id — Atualização completa de um livro existente
export function atualizarLivro(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    const indice = livros.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
    }

    const { titulo, autor, categoria, status, opiniao } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ erro: "O campo 'titulo' é obrigatório para atualização." });
    }

    if (!autor || typeof autor !== "string" || autor.trim() === "") {
        return res.status(400).json({ erro: "O campo 'autor' é obrigatório para atualização." });
    }

    const statusNormalizado = status ? status.toLowerCase().trim() : livros[indice].status;
    if (!STATUS_VALIDOS.includes(statusNormalizado)) {
        return res.status(400).json({
            erro: "Status inválido. Valores aceitos: 'lido', 'lendo' ou 'quero-ler'."
        });
    }

    livros[indice] = {
        id,
        titulo: titulo.trim(),
        autor: autor.trim(),
        categoria: categoria && categoria.trim() !== "" ? categoria.trim() : "Geral",
        status: statusNormalizado,
        opiniao: opiniao !== undefined ? String(opiniao).trim() : livros[indice].opiniao
    };

    return res.status(200).json(livros[indice]);
}

// 5. DELETE /livros/:id — Exclusão de um livro
export function deletarLivro(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    const indice = livros.findIndex((item) => item.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
    }

    const [livroRemovido] = livros.splice(indice, 1);

    return res.status(200).json({
        mensagem: "Livro removido com sucesso.",
        livro: livroRemovido
    });
}