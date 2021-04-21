import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Atendente = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true
    },
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
    emdereco: {
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
        type: Date,
        required: true
    },
    observações: {
        type: String,
        required: false
    }
    }, {
    timestamps: true,
    });

Atendente.plugin(mongoosePaginate);

export default mongoose.model('atendente', Atendente);