//const User = require("../models/User");
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import Atendente from "../models/Atendente.js";

class AtendenteController {
    // POST /Atendente
    // errors code: 120..129
    async create(req, res) {
        // Validação com Yup
        const schema = Yup.object().shape({
            nome: Yup.string()
                .required(),
            matricula: Yup.number()
                .required(),
            cpf: Yup.string()
                .required(),    
            senha: Yup.string()
                .required()
                .min(6)
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

        const matriculaExiste = await Atendente.findOne({ matricula: req.body.matricula });
        if (matriculaExiste) {
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Error: Este matricula já está cadastrado!"
            });
        };

        const atendente = req.body;
        atendente.senha = await bcrypt.hash(atendente.senha, 8);
        
        Atendente.create(atendente).then((atendente) => {
            return res.json(atendente);
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: Atendente não foi cadastrado com sucesso"
            });
        });
    }
 
}

//module.exports = new AtendenteController();
export default new AtendenteController();
