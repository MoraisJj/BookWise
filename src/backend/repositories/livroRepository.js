import db from "../database/connection.js";

export function listarTodos() {
    const stmt = db.prepare(`
        SELECT 
            l.id,
            l.titulo,
            l.autor,
            l.status,
            l.opiniao,
            l.categoria_id,
            c.nome AS categoria_nome
        FROM livros l
        INNER JOIN categorias c ON l.categoria_id = c.id
        ORDER BY l.id ASC
    `);
    return stmt.all();
}

export function buscarPorId(id) {
    const stmt = db.prepare(`
        SELECT 
            l.id,
            l.titulo,
            l.autor,
            l.status,
            l.opiniao,
            l.categoria_id,
            c.nome AS categoria_nome
        FROM livros l
        INNER JOIN categorias c ON l.categoria_id = c.id
        WHERE l.id = ?
    `);
    return stmt.get(id) || null;
}

export function criar({ titulo, autor, status, opiniao, categoria_id }) {
    const stmt = db.prepare(`
        INSERT INTO livros (titulo, autor, status, opiniao, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `);
    const resultado = stmt.run(titulo, autor, status, opiniao || "", categoria_id);
    return buscarPorId(Number(resultado.lastInsertRowid));
}

export function atualizar(id, { titulo, autor, status, opiniao, categoria_id }) {
    const stmt = db.prepare(`
        UPDATE livros
        SET titulo = ?, autor = ?, status = ?, opiniao = ?, categoria_id = ?
        WHERE id = ?
    `);
    const resultado = stmt.run(titulo, autor, status, opiniao || "", categoria_id, id);

    if (resultado.changes === 0) {
        return null;
    }

    return buscarPorId(id);
}

export function deletar(id) {
    const stmt = db.prepare("DELETE FROM livros WHERE id = ?");
    const resultado = stmt.run(id);
    return resultado.changes > 0;
}