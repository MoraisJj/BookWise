import * as livroRepository from "../repositories/livroRepository.js";
import * as categoriaRepository from "../repositories/categoriaRepository.js";

const STATUS_VALIDOS = ["lido", "lendo", "quero-ler"];

// GET /livros
export function listarLivros(req, res) {
    try {
        const livros = livroRepository.listarTodos();
        return res.status(200).json(livros);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao consultar livros no banco de dados." });
    }
}

// GET /livros/:id
export function buscarLivroPorId(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    try {
        const livro = livroRepository.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
        }

        return res.status(200).json(livro);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao buscar livro no banco de dados." });
    }
}

// POST /livros
export function criarLivro(req, res) {
    const { titulo, autor, status, opiniao, categoria_id } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ erro: "O campo 'titulo' é obrigatório." });
    }

    if (!autor || typeof autor !== "string" || autor.trim() === "") {
        return res.status(400).json({ erro: "O campo 'autor' é obrigatório." });
    }

    const categoriaIdNum = Number(categoria_id);
    if (!categoria_id || Number.isNaN(categoriaIdNum)) {
        return res.status(400).json({ erro: "O campo 'categoria_id' é obrigatório e deve ser numérico." });
    }

    const statusNormalizado = status ? String(status).toLowerCase().trim() : "quero-ler";
    if (!STATUS_VALIDOS.includes(statusNormalizado)) {
        return res.status(400).json({
            erro: "Status inválido. Valores aceitos: 'lido', 'lendo' ou 'quero-ler'."
        });
    }

    try {
        const categoriaExiste = categoriaRepository.buscarPorId(categoriaIdNum);
        if (!categoriaExiste) {
            return res.status(400).json({
                erro: `A categoria com ID ${categoriaIdNum} não existe. Cadastre a categoria antes de vincular o livro.`
            });
        }

        const novoLivro = livroRepository.criar({
            titulo: titulo.trim(),
            autor: autor.trim(),
            status: statusNormalizado,
            opiniao: opiniao ? String(opiniao).trim() : "",
            categoria_id: categoriaIdNum
        });

        return res.status(201).json(novoLivro);
    } catch (erro) {
        if (erro.message && erro.message.includes("FOREIGN KEY constraint failed")) {
            return res.status(400).json({ erro: "Violação de chave estrangeira: categoria_id inválido." });
        }
        return res.status(500).json({ erro: "Erro interno ao cadastrar livro no banco de dados." });
    }
}

// PUT /livros/:id
export function atualizarLivro(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    const { titulo, autor, status, opiniao, categoria_id } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ erro: "O campo 'titulo' é obrigatório para atualização." });
    }

    if (!autor || typeof autor !== "string" || autor.trim() === "") {
        return res.status(400).json({ erro: "O campo 'autor' é obrigatório para atualização." });
    }

    const categoriaIdNum = Number(categoria_id);
    if (!categoria_id || Number.isNaN(categoriaIdNum)) {
        return res.status(400).json({ erro: "O campo 'categoria_id' é obrigatório e deve ser numérico." });
    }

    const statusNormalizado = status ? String(status).toLowerCase().trim() : "quero-ler";
    if (!STATUS_VALIDOS.includes(statusNormalizado)) {
        return res.status(400).json({
            erro: "Status inválido. Valores aceitos: 'lido', 'lendo' ou 'quero-ler'."
        });
    }

    try {
        const categoriaExiste = categoriaRepository.buscarPorId(categoriaIdNum);
        if (!categoriaExiste) {
            return res.status(400).json({
                erro: `A categoria com ID ${categoriaIdNum} não existe.`
            });
        }

        const livroAtualizado = livroRepository.atualizar(id, {
            titulo: titulo.trim(),
            autor: autor.trim(),
            status: statusNormalizado,
            opiniao: opiniao !== undefined ? String(opiniao).trim() : "",
            categoria_id: categoriaIdNum
        });

        if (!livroAtualizado) {
            return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
        }

        return res.status(200).json(livroAtualizado);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao atualizar livro no banco de dados." });
    }
}

// DELETE /livros/:id
export function deletarLivro(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    try {
        const livroExistente = livroRepository.buscarPorId(id);

        if (!livroExistente) {
            return res.status(404).json({ erro: `Livro com ID ${id} não encontrado.` });
        }

        livroRepository.deletar(id);

        return res.status(200).json({
            mensagem: "Livro removido com sucesso.",
            livro: livroExistente
        });
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao remover livro no banco de dados." });
    }
}