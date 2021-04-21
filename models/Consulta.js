import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Consulta = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true
    },
    data_hora: {
        type: Date,
        required: true
    },
    duracao:{
        type: String,
        required: true
    }, 
    nome_paciente: {
        type: String,
        required: false
    }, 
    cpf_paciente: {
        type: Number,
        required: false
    },
    nome_medico: {
        type: String,
        required: true
    },
    matricula_medico: {
        type: Number,
        required: true
    },
    especialidade: {
        type: String,
        required: true
    },
    observacoes: {
        type: String,
        required: false
    }
    }, {
    timestamps: true,
    });

Consulta.plugin(mongoosePaginate);

export default mongoose.model('consulta', Consulta);