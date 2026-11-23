import express from "express";
import cors from "cors";
import livrosRoutes from "./routes/livrosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Tratamento consistente para JSON malformado enviado no body
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ erro: "Formato JSON inválido no corpo da requisição." });
    }
    next(err);
});

// Rota raiz de verificação da API
app.get("/", (req, res) => {
    return res.status(200).json({
        aplicacao: "BookWise API",
        versao: "2.0.0 - Etapa 07 (Persistência SQLite)",
        status: "online",
        endpoints: ["/categorias", "/livros"]
    });
});

// Rotas dos recursos relacionados
app.use("/categorias", categoriasRoutes);
app.use("/livros", livrosRoutes);

// Tratamento padrão para rotas inexistentes (404)
app.use((req, res) => {
    return res.status(404).json({ erro: "Endpoint não encontrado." });
});

app.listen(PORT, () => {
    console.log(`Servidor BookWise rodando em http://localhost:${PORT}`);
});