const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const Schema = mongoose.Schema;

const TelefoneSchema = new Schema(
    {
        operadora : String,
        ddd: {type: String , required: true},
        numero: {type: String , required: true},
    }
)

module.exports = mongoose.model('Telefone',TelefoneSchema)