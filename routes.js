import { Router } from "express";

import authMiddleware from "./middlewares/auth.js";
import ConsultaController from "./controllers/ConsultaController.js";
import AtendenteController from "./controllers/AtendenteController.js";
import PacienteController from "./controllers/PacienteController.js";
import LoginController from "./controllers/LoginController.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// POST /atendentes - Cadastrar um atendente
routes.post("/atendentes", AtendenteController.create);

// POST /login - Fazer login do atendente
routes.post("/login", LoginController.login);

// POST /pacientes - Cadastrar um paciente
routes.post("/pacientes", authMiddleware, PacienteController.create);

// GET /pacientes - Listar todos os pacientes
routes.get("/pacientes", authMiddleware, PacienteController.list);

// GET /pacientes/:id - Listar um paciente
routes.get("/pacientes/:id", authMiddleware, PacienteController.listOne);

// PUT /pacientes/:id - Atualizar um paciente
routes.put("/pacientes/:id", authMiddleware, PacienteController.update);

// GET /consultas - Listar todos os horários de consulta
routes.get("/consultas", authMiddleware, ConsultaController.list);

// GET /consultas - Consultar um horário de consulta
routes.get("/consultas/:id", authMiddleware, ConsultaController.listOne);
 
// POST /consultas - Criar um horário para consulta
routes.post("/consultas", authMiddleware, ConsultaController.create);

// PUT /consultas/:id - Criar um horário para consulta
routes.put("/consultas/:id", authMiddleware, ConsultaController.update);
 
//DELETE /consultas/:id - Deletar um horário de consulta
routes.delete("/consultas/:id", authMiddleware, ConsultaController.delete);


export default routes;