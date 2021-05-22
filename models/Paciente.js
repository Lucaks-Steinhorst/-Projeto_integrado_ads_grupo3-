import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Paciente = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  endereco:{
    type: String,
    required: true
  }, 
  telefone: {
    type: Number,
    required: true
  }, 
  email: {
    type: String,
    required: false
  },
  cpf: {
    type: String,
    required: true
  },
  data_nascimento: {
    type: Date,
    required: true
  },
  sexo: {
    type: String,
    required: true
  },
  observações: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

Paciente.plugin(mongoosePaginate);

export default mongoose.model('paciente', Paciente);
