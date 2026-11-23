//entidade pai
import db from "../database/connection.js";

export function listarTodas() {
    const stmt = db.prepare("SELECT id, nome, descricao FROM categorias ORDER BY id ASC");
    return stmt.all();
}

export function buscarPorId(id) {
    const stmt = db.prepare("SELECT id, nome, descricao FROM categorias WHERE id = ?");
    return stmt.get(id) || null;
}

export function criar({ nome, descricao }) {
    const stmt = db.prepare("INSERT INTO categorias (nome, descricao) VALUES (?, ?)");
    const resultado = stmt.run(nome, descricao || null);
    return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, { nome, descricao }) {
    const stmt = db.prepare("UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?");
    const resultado = stmt.run(nome, descricao || null, id);

    if (resultado.changes === 0) {
        return null;
    }

    return buscarPorId(id);
}

export function deletar(id) {
    const stmt = db.prepare("DELETE FROM categorias WHERE id = ?");
    const resultado = stmt.run(id);
    return resultado.changes > 0;
}