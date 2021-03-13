const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const CampusSchema = new Schema(
    {   
        nome: {type: String , required: true},
        cidade: {type: String , required: true},
        cursos: [{type: Schema.Types.ObjectId, ref:"Curso" , required: true}]
    }
) 

module.exports = mongoose.model('Campus',CampusSchema)