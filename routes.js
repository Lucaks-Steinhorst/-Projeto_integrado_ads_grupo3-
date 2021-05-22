import { Router } from "express";

import ConsultaController from "./controllers/ConsultaController.js";
import AtendenteController from "./controllers/AtendenteController.js";
import PacienteController from "./controllers/PacienteController.js";

const routes = new Router();

// rotas
routes.get("/", async (req, res) => {
  res.send("Olá mundo!");
});

// POST /atendentes - Cadastrar um atendente
routes.post("/atendentes", AtendenteController.create);

// POST /pacientes - Cadastrar um paciente
routes.post("/pacientes", PacienteController.create);

// GET /pacientes - Listar todos os pacientes
routes.get("/pacientes", PacienteController.list);

// GET /pacientes/:id - Listar um paciente
routes.get("/pacientes/:id", PacienteController.listOne);

// PUT /pacientes/:id - Atualizar um paciente
routes.put("/pacientes/:id", PacienteController.update);

// GET /consultas - Listar todos os horários de consulta
routes.get("/consultas", ConsultaController.list);

// GET /consultas - Consultar um horário de consulta
routes.get("/consultas/:id", ConsultaController.listOne);
 
// POST /consultas - Criar um horário para consulta
routes.post("/consultas", ConsultaController.create);

// PUT /consultas/:id - Criar um horário para consulta
routes.put("/consultas/:id", ConsultaController.update);
 
//DELETE /consultas/:id - Deletar um horário de consulta
routes.delete("/consultas/:id", ConsultaController.delete);


export default routes;