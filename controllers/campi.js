const Campus = require("../models/campus");
const Curso = require("../models/curso");

module.exports.listarCampis = (req, res) => {
  Campus.find({})
    .then((campus) => {
      res.json(campus);
    })
    .catch((err) => {
      res.status(401).send();
    });
};

module.exports.obterCampusPeloNome = async (req, res) => {
  const nome = req.params.nome;
  console.log(nome);
  const campusExists = await Campus.exists({ nome: req.params.nome });

  if (campusExists) {
    Campus.findOne({ nome: req.params.nome })
      .then((campus) => {
        res.status(200).send(campus);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).json({
      msg: "Campus não Existe.",
    });
  }
};

async function insertCurso(curso) {
  const cursoExists = await Curso.exists({
    nome: curso.nome,
    turno: curso.turno,
  });

  if (!cursoExists) {
    await Curso.create(curso)
      .then((curso) => {
        console.log("curso Cadastrado");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const cursoID = await Curso.findOne({ nome: curso.nome, turno: curso.turno });
  return cursoID._id;
}

module.exports.inserirCampus = async (req, res) => {
  const novoCampus = req.body;

  const campusExists = await Campus.exists({ nome: novoCampus.nome });

  let cursoIDs = [];

  if (novoCampus.cursos.length === 0) {
    res.status(400).json({
      msg: "Não pode iniciar com menos de 1 curso",
    });
  } else {
    if (!campusExists) {
      for (let i = 0; i < novoCampus.cursos.length; i++) {
        let cursoID = await insertCurso(novoCampus.cursos[i]);
        cursoIDs.push(cursoID);
      }

      novoCampus.cursos = cursoIDs;

      Campus.create(novoCampus)
        .then((novoCampus) => {
          res.json(novoCampus);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).send();
        });
    } else {
      res.status(400).json({
        msg: "Campus já cadastrado.",
      });
    }
  }
};

module.exports.atualizarCampus = async (req, res) => {
  const novoCampus = req.body;

  console.log(nome);
  const campusExists = await Campus.exists({ nome: req.params.nome });
  console.log(novoCampus.nome);
  let cursoIDs = [];

  if (novoCampus.cursos.length === 0) {
    res.status(400).json({
      msg: "Não pode iniciar com menos de 1 curso",
    });
  } else {
    if (campusExists) {
      for (let i = 0; i < novoCampus.cursos.length; i++) {
        let cursoID = await insertCurso(novoCampus.cursos[i]);
        cursoIDs.push(cursoID);
      }

      novoCampus.cursos = cursoIDs;

      Campus.findOne({ nome: novoCampus.nome })
        .then((campus) => {
          campus.nome = novoCampus.nome;
          campus.cidade = novoCampus.cidade;
          campus.cursos = novoCampus.cursos;

          return campus.save();
        })
        .then((campus_mod) => {
          res.json(campus_mod);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).send();
        });
    } else {
      res.status(400).json({
        msg: "Campus Não Existe",
      });
    }
  }
};

module.exports.removerCampus = async (req, res) => {
  const nome = req.params.nome;

  const CampusExists = await Campus.exists({ nome: req.params.nome });

  if (CampusExists) {
    Campus.findOne({ nome: req.params.nome })
      .then((campus) => {
        return campus.remove();
      })
      .then((campus_mod) => {
        res.json(campus_mod);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).json({
      msg: "Campus não Existe.",
    });
  }
};
