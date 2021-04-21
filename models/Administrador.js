import mongoose from 'mongoose';

const Administrador = new mongoose.Schema(
{
    
    status: {
        type: Boolean,
        required: true
    },
    matricula: {
        type: Number,
        required: true
    },
    senha: {
        type: string,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    data_nascimento: {
        type: Date, // "YYYY-MM-DD"
        required: true
    },
    observacoes: {
        type: string,
        required: true
    }
}, {
        timestamps: true // createAt updateAt
});

export default mongoose.model('administrador', Administrador);