import mongoose from 'mongoose';

const Atendente = new mongoose.Schema({
    matricula: {
        type: Number,
        required: true
    },
    senha:{
        type: String,
        required: true
    }, 
    nome: {
        type: String,
        required: true
    }, 
    cpf: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    });


export default mongoose.model('atendente', Atendente);