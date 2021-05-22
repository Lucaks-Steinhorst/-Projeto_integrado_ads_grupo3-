import mongoose from 'mongoose';

const Consulta = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true
    },
    data_hora: {
        type: Date,
        required: true
    },
    fim_data_hora:{
        type: Date,
        required: true
    }, 
    nome_paciente: {
        type: String,
        required: false
    }, 
    cpf_paciente: {
        type: String,
        required: false
    },
    observacoes: {
        type: String,
        required: false
    }
    }, {
    timestamps: true,
    });


export default mongoose.model('consulta', Consulta);