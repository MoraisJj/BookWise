import { Router } from "express";
import {
    listarCategorias,
    buscarCategoriaPorId,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria
} from "../controllers/categoriasController.js";

const router = Router();

router.get("/", listarCategorias);
router.get("/:id", buscarCategoriaPorId);
router.post("/", criarCategoria);
router.put("/:id", atualizarCategoria);
router.delete("/:id", deletarCategoria);

export default router;