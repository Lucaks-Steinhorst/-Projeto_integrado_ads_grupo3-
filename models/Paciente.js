import mongoose from 'mongoose';

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
  }
}, {
  timestamps: true,
});


export default mongoose.model('paciente', Paciente);