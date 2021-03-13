const controller = require("../controllers/campi.js");

module.exports = (app) => {
    app.get("/api/campi", controller.listarCampis);
    app.get("/api/campi/:nome", controller.obterCampusPeloNome);
    app.post("/api/campi", controller.inserirCampus);
    app.delete("/api/campi/:nome", controller.removerCampus);
    app.put("/api/campi/:nome", controller.atualizarCampus);

}
