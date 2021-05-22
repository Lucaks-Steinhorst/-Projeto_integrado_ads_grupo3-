import * as Yup from 'yup';
import Consulta from "../models/Consulta.js";

class ConsultaController {
    
    // POST /consultas - Criar um horário para consulta
    // errors code: 110..119
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
                code: 110,
                message: err.message
            });
        }
        if(req.body.fim_data_hora < req.body.data_hora){
            return res.status(400).json({
                error: true,
                code: 111,
                message: "Error: A data e o horário de fim da consulta deve ser maior que a data e o horário de início da consulta!"
            })
        }

        const horarioExiste = await Consulta.findOne({ data_hora: req.body.data_hora });
        if (horarioExiste) {
            return res.status(400).json({
                error: true,
                code: 112,
                message: "Error: Já existe um horário de consulta disponibilizado para esta data e hora!"
            });
        };

        const consulta = req.body;
        Consulta.create(consulta).then((consulta) => {
            return res.json(consulta);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 113,
                message: "Error: Não foi possível cadastrar o horário de consulta na agenda"
            });
        });
    }
    

    // GET /consultas - Listar todos os horários de consulta
    // errors code: 120..129
    async list(req, res) {
        Consulta.find({}).then((consultas) => {
            return res.json({
                error: false,
                consultas: consultas
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 120,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    
    // GET /consultas/:id - Listar um horário de consulta
    // errors code: 190..199
    async listOne(req, res) {
        Consulta.findOne({_id: req.params.id}).then((consultas) => {
            return res.json({
                error: false,
                consulta: consultas
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 190,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        })
    }
    
    //DELETE /consultas/:id - Deletar um horário de consulta
    // errors code: 130..139
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
                code: 130,
                message: "Não foi possível deletar o horário de consulta"
            })
        })
    }
  

    // PUT /consultas/:id - Atualizar um horário de consulta
    // errors code: 140..149
    async update(req, res) {
        const horarioExiste = await Consulta.findOne({_id: req.params.id});
        if(!horarioExiste){
            return res.status(400).json({
                error: true,
                code: 140,
                message: "Erro: horário não encontrado!"
            });
        };


        // marcar consulta em um horário existente
        if (horarioExiste.status == false){
            // Validação com Yup
            const schema = Yup.object().shape({
                status: Yup.boolean().required(),
                nome_paciente: Yup.string().required(),
                cpf_paciente: Yup.string().required(),
                observacoes: Yup.string().notOneOf([''])
            })

            try {
                await schema.validate(req.body);

                if(req.body.status != true){
                    return res.status(400).json({
                        error: true,
                        code: 141,
                        message: "É necessário mudar o status para true"
                    })
                }
            } catch(err) {
                return res.status(400).json({
                    error: true,
                    code: 142,
                    message: err.message
                });
            }

        }

        // desmarcar consulta e deixar o horário disponível
        if (horarioExiste.status == true){
            // Validação com Yup
            const schema = Yup.object().shape({
                status: Yup.boolean().required(),
                nome_paciente: Yup.string().required(),
                cpf_paciente: Yup.string().required(),
                observacoes: Yup.string().required()
            })

            try {
                await schema.validate(req.body);

                if(req.body.status != false){
                    return res.status(400).json({
                        error: true,
                        code: 143,
                        message: "É necessário mudar o status para false"
                    })
                }
            } catch(err) {
                return res.status(400).json({
                    error: true,
                    code: 144,
                    message: err.message
                });
            }

        }


        Consulta.updateOne({_id: req.params.id}, req.body).then(() => {
            return res.json({
                error: false,
                message: "Horário de consulta alterado com sucesso!",
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 145,
                message: "Erro: não foi possível alterar o horário da consulta!"
            });
        });
    }
}

export default new ConsultaController();