const Aluno = require("../models/alunos");
const Telefone = require("../models/telefone");
const Curso = require("../models/curso");

module.exports.listarAlunos = (req, res) => {
  Aluno.find({})
    .then((alunos) => {
      res.json(alunos);
    })
    .catch((err) => {
      res.status(401).send();
    });
};

module.exports.obterAlunoPelaMatricula = async (req, res) => {
  const matricula = req.params.matricula;
  console.log(matricula);

  const alunoExists = await Aluno.exists({ matricula:  req.params.matricula});

  if (alunoExists) {
    Aluno.findOne({ matricula: req.params.matricula })
      .then((aluno) => {
        res.status(200).send(aluno);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).json({
      msg: "Aluno não Existe.",
    });
  }
};

async function insertTelefone(telefone) {
  const telefoneExists = await Telefone.exists({ numero: telefone.numero });

  if (!telefoneExists) {
    await Telefone.create(telefone)
      .then((telefone) => {
        console.log("telefone Cadastrado");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const telefoneID = await Telefone.findOne({ numero: telefone.numero });
  return telefoneID._id;
}

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

module.exports.inserirAluno = async (req, res) => {
  const novoAluno = req.body;

  const alunoExists = await Aluno.exists({ matricula: novoAluno.matricula });

  if (!alunoExists) {
    const telefoneID = await insertTelefone(novoAluno.telefone);
    const cursoID = await insertCurso(novoAluno.curso);

    novoAluno.telefone = telefoneID;
    novoAluno.curso = cursoID;

    Aluno.create(novoAluno)
      .then((aluno) => {
        res.json(aluno);
      })
      .catch((err) => {
        console.log(err);
        res.status(401).send();
      });
  } else {
    res.status(400).json({
      msg: "Aluno já cadastrado.",
    });
  }
};

async function removerTelefone(telefoneID) {
  Telefone.findById(telefoneID)
    .then((telefone) => {
      return telefone.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports.atualizarAluno = async (req, res) => {
  const matricula = req.params.matricula;
  const novoAluno = req.body;

  const alunoExists = await Aluno.exists({ matricula: novoAluno.matricula });

  if (alunoExists) {
    const telefoneID = await insertTelefone(novoAluno.telefone);
    Aluno.findOne({ matricula: matricula })
      .then(async (aluno) => {
        aluno.nome = novoAluno.nome;
        aluno.dataNascimente = novoAluno.dataNascimente;
        await removerTelefone(aluno.telefone);
        console.log(telefoneID);
        aluno.telefone = telefoneID;

        aluno.curso = await insertCurso(novoAluno.curso);
        return aluno.save();
      })
      .then((aluno_mod) => {
        res.json(aluno_mod);
      })
      .catch((err) => {
        res.status(401).send();
      });
  } else {
    res.status(400).json({
      msg: "Aluno não Existe.",
    });
  }
};

module.exports.removerAluno = async (req, res) => {
  const matricula = req.params.matricula;
  console.log(matricula);
  const alunoExists = await Aluno.exists({ matricula: novoAluno.matricula });

  if (alunoExists) {
    Aluno.findOne({ matricula: matricula })
      .then((aluno) => {
        return aluno.remove();
      })
      .then((aluno_mod) => {
        res.json(aluno_mod);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    res.status(400).json({
      msg: "Aluno não Existe.",
    });
  }
};
