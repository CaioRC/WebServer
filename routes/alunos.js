const controller = require("../controllers/alunos.js");

module.exports = (app) => {
    app.get("/api/alunos", controller.listarAlunos);
    app.get("/api/alunos/:matricula", controller.obterAlunoPelaMatricula);
    app.post("/api/alunos", controller.inserirAluno);
    app.delete("/api/alunos/:matricula", controller.removerAluno);
    app.put("/api/alunos/:matricula", controller.atualizarAluno);

}
