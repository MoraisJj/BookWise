//gerenciamento das categorias e tratas os erros de integridade do banco
//usando FOREIGN KEY e UNIQUE
import * as categoriaRepository from "../repositories/categoriaRepository.js";

// GET /categorias
export function listarCategorias(req, res) {
    try {
        const categorias = categoriaRepository.listarTodas();
        return res.status(200).json(categorias);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao consultar categorias no banco de dados." });
    }
}

// GET /categorias/:id
export function buscarCategoriaPorId(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    try {
        const categoria = categoriaRepository.buscarPorId(id);

        if (!categoria) {
            return res.status(404).json({ erro: `Categoria com ID ${id} não encontrada.` });
        }

        return res.status(200).json(categoria);
    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno ao buscar categoria no banco de dados." });
    }
}

// POST /categorias
export function criarCategoria(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ erro: "O campo 'nome' é obrigatório." });
    }

    try {
        const novaCategoria = categoriaRepository.criar({
            nome: nome.trim(),
            descricao: descricao ? String(descricao).trim() : null
        });

        return res.status(201).json(novaCategoria);
    } catch (erro) {
        if (erro.message && erro.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({ erro: "Já existe uma categoria cadastrada com esse nome." });
        }
        return res.status(500).json({ erro: "Erro interno ao salvar categoria no banco de dados." });
    }
}

// PUT /categorias/:id
export function atualizarCategoria(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    const { nome, descricao } = req.body;

    if (!nome || typeof nome !== "string" || nome.trim() === "") {
        return res.status(400).json({ erro: "O campo 'nome' é obrigatório para atualização." });
    }

    try {
        const categoriaAtualizada = categoriaRepository.atualizar(id, {
            nome: nome.trim(),
            descricao: descricao !== undefined ? String(descricao).trim() : null
        });

        if (!categoriaAtualizada) {
            return res.status(404).json({ erro: `Categoria com ID ${id} não encontrada.` });
        }

        return res.status(200).json(categoriaAtualizada);
    } catch (erro) {
        if (erro.message && erro.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({ erro: "Já existe outra categoria cadastrada com esse nome." });
        }
        return res.status(500).json({ erro: "Erro interno ao atualizar categoria no banco de dados." });
    }
}

// DELETE /categorias/:id
export function deletarCategoria(req, res) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({ erro: "O ID informado deve ser um número válido." });
    }

    try {
        const removida = categoriaRepository.deletar(id);

        if (!removida) {
            return res.status(404).json({ erro: `Categoria com ID ${id} não encontrada.` });
        }

        return res.status(200).json({ mensagem: "Categoria removida com sucesso." });
    } catch (erro) {
        if (erro.message && erro.message.includes("FOREIGN KEY constraint failed")) {
            return res.status(409).json({
                erro: "Não é possível excluir esta categoria pois existem livros vinculados a ela."
            });
        }
        return res.status(500).json({ erro: "Erro interno ao excluir categoria no banco de dados." });
    }
}