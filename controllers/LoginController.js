import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Atendente from "../models/Atendente.js";
import authConfig from "../config/auth.js";

class LoginController {

    async login(req, res) {
        /** implementar a autenticação do atendente aqui */
        const { matricula, senha } = req.body;

        // validar matricula
        const atendenteExiste = await Atendente.findOne({ matricula: matricula });
        if(!atendenteExiste) {
            return res.status(401).json({
                error: true,
                message: "Erro: Atendente não encontrado!"
            });
        }

        // validar a senha do atendente
        if( !( await bcrypt.compare( senha, atendenteExiste.senha ) ) ) {
            return res.status(401).json({
                error: true,
                message: "Erro, senha inválida!"
            })
        }

        // autenticação
        return res.json({
            atendente: {
                _id: atendenteExiste._id,
                nome: atendenteExiste.nome,
                matricula: matricula
            },
            token: jwt.sign({id: atendenteExiste._id}, authConfig.secret, { expiresIn: authConfig.expiresIn } )
        })
    }

}

export default new LoginController();
