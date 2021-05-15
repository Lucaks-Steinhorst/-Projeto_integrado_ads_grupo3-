import * as Yup from 'yup';
import Consulta from "../models/Consulta.js";

class ConsultaController {
    
    // POST /consultas - Criar um horário para consulta
    // errors code: 100..109
    async create(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            status: Yup.boolean().required(),
            data_hora: Yup.date().required(),
            fim_data_hora: Yup.date().required()
        });
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                error: true,
                code: 120,
                message: err.message
            });
        }
        if(req.body.fim_data_hora < req.body.data_hora){
            return res.status(400).json({
                error: true,
                code: 100,
                message: "Error: A data e o horário de fim da consulta deve ser maior que a data e o horário de início da consulta!"
            })
        }

        const horarioExiste = await Consulta.findOne({ data_hora: req.body.data_hora });
        if (horarioExiste) {
            return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Já existe um horário de consulta disponibilizado para esta data e hora!"
            });
        };

        const consulta = req.body;
        Consulta.create(consulta).then((consulta) => {
            return res.json(consulta);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Não foi possível cadastrar o horário de consulta na agenda"
            });
        });
    }
    

    // GET /consultas - Listar todos os horários de consulta
    // errors code: 110..119
    async list(req, res) {
        Consulta.find({}).then((consultas) => {
            return res.json({
                error: false,
                consultas: consultas
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 110,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    
    //DELETE /consultas/:id - Deletar um horário de consulta
    async delete(req,res){
        Consulta.deleteOne({_id: req.params.id}).then(() => {
            return res.json({
                error: false,
                message: "Horário de consulta deletado com sucesso",
            })
        }).catch((err) => {
            console.log(err)
            return res.status(400).json({
                error: true,
                message: "Não foi possível deletar o horário de consulta"
            })
        })
    }
  
}

export default new ConsultaController();