const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const CursoSchema = new Schema(
    {
        nome: {type: String , required: true},
        turno: {type: String , required: true},
        campus: {type: Schema.Types.ObjectId, ref:"Curso"}
    }
) 

module.exports = mongoose.model('Curso',CursoSchema)