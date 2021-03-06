import * as Yup from 'yup';
import Paciente from '../models/Paciente.js';

class PacienteController {

    //paciente criando perfil  
    //code: 150..159
    async create(req, res) {

        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            endereco: Yup.string().required(),
            telefone: Yup.number().required(),
            cpf: Yup.string().required(),
            data_nascimento: Yup.date().required(),
            sexo: Yup.string().required()
        });
    
        try {
            await schema.validate(req.body);
        } catch (err) {
            return res.status(400).json({
                error: true,
                code: 150,
                message: err.message
            });
        }
    
        const cpfExiste = await Paciente.findOne({cpf: req.body.cpf});
        if (cpfExiste) return res.status(400).json({
            error: true,
            code: 151,
            message: "Erro: CPF já cadastrado!"
        });
    
        Paciente.create(req.body).then(() => {
            return res.json({
                error: false, 
                message: "Paciente cadastrado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 152,
                message: "Erro: Não foi possível executar a operação!"
            });
        });
    };
    
    //code: 160.. 169
    async list(req, res) {
    
        Paciente.find({}).then((paciente) => {
            return res.json(paciente)
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 160,
                message: "Erro: Solicitação não executada!"
            });
        });
    };
    
    //code: 170..179 
    async listOne(req, res) {
    
        Paciente.findOne({ _id: req.params.id }).then((paciente) => {
            return res.json(paciente)
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 170,
                message: "Erro: Solicitação não executada!"
            });
        });
    };
    
    //atualizando uma consulta marcada
    //code: 180.. 189
    async update(req, res) {
    
        const schema = Yup.object().shape({
            _id: Yup.string().notOneOf([""]),
            endereco: Yup.string().notOneOf([""]),
            telefone: Yup.number().notOneOf([""]),
            cpf: Yup.number().notOneOf([""]),
            data_nascimento: Yup.date().notOneOf([""]),
            sexo: Yup.string().notOneOf([""])
        });
    
        try {
            await schema.validate(req.body);
        } catch(err) {
            return res.status(400).json({
                erro: true,
                code: 180,
                message: err.message
            });
        };
    
        const IdExiste = await Paciente.findOne({ _id: req.params.id });
        if (!IdExiste) {
            return res.status(400).json({
                error: true,
                code: 181,
                message: "Erro: Paciente não localizado!"
            });
        };
    
        Paciente.updateOne({ _id: req.params.id }, req.body).then(() => {
            return res.json({
                error: false,
                message: "Paciente editado com sucesso!"
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 182,
                message: "Erro: Não foi possível realizar a edição!"
            });
        });
    
    };

};

export default new PacienteController();
