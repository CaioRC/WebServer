const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const AlunoSchema = new Schema({
  nome: {type: String , required: true},
  matricula: {type: String , required: true},
  dataNascimento: Date,
  atribuito2: String,
  atribuito3: String,
  atribuito4: String,
  telefone : {type: Schema.Types.ObjectId, ref:"Telefone", required: true},
  curso: {type: Schema.Types.ObjectId, ref:"Curso", required: true}
});


module.exports = mongoose.model("Aluno" , AlunoSchema)