import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Garante que o arquivo do banco seja sempre criado dentro de src/backend/database/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "bookwise.sqlite");

const db = new DatabaseSync(dbPath);

// Ativa a verificação de chaves estrangeiras no SQLite (desativada por padrão)
db.exec("PRAGMA foreign_keys = ON;");

// Criação das tabelas (Entidade Pai: categorias | Entidade Filha: livros)
db.exec(`
    CREATE TABLE IF NOT EXISTS categorias (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL UNIQUE,
        descricao TEXT
    );

    CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        autor TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'quero-ler' CHECK (status IN ('lido', 'lendo', 'quero-ler')),
        opiniao TEXT,
        categoria_id INTEGER NOT NULL,
        FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT
    );
`);

// Popula dados iniciais apenas na primeira execução (quando o banco está vazio)
const { total } = db.prepare("SELECT COUNT(*) AS total FROM categorias").get();

if (total === 0) {
    const inserirCategoria = db.prepare(
        "INSERT INTO categorias (nome, descricao) VALUES (?, ?)"
    );
    inserirCategoria.run("Tecnologia", "Livros sobre programação, engenharia de software e computação.");
    inserirCategoria.run("Literatura", "Obras clássicas e contemporâneas de ficção e romance.");
    inserirCategoria.run("Negócios", "Gestão, produtividade e empreendedorismo.");

    const inserirLivro = db.prepare(`
        INSERT INTO livros (titulo, autor, status, opiniao, categoria_id)
        VALUES (?, ?, ?, ?, ?)
    `);
    inserirLivro.run(
        "Clean Code",
        "Robert C. Martin",
        "lido",
        "Essencial para aprender boas práticas de legibilidade e refatoração.",
        1
    );
    inserirLivro.run(
        "Dom Casmurro",
        "Machado de Assis",
        "lendo",
        "Clássico da literatura brasileira com narrador não confiável.",
        2
    );
}

export default db;