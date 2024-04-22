const dados = require('./db/dados.json')
const express = require("express");
const router = express.Router();
const fs = require('fs');


router.use(express.json());

// Create
router.post('/', (req, res) => {
    const novoInstrumento = req.body

    if (!novoInstrumento.nome || !novoInstrumento.familia || !novoInstrumento.tipo || !novoInstrumento.material || !novoInstrumento.origem || !novoInstrumento.descricao) {
        return res.status(400).json({ mensagem: "Dados incompletos fornecidos" });
    } else {
        dados.Instrumentos.push(novoInstrumento);
        salvarDados(dados);
        return res.status(201).json({ mensagem: "Instrumento criado com sucesso" });
    }
});

// Read
router.get('/', (req, res) => {
    return res.json(dados.Instrumentos);
});

// Update
router.put('/:id', (req, res) => {
    const InstrumentoId = parseInt(req.params.id);
    const atualizarInstrumento = req.body;

    const indiceInstrumento = dados.Instrumentos.findIndex(Instrumento => Instrumento.id === InstrumentoId);

    if (indiceInstrumento === -1) {
        return res.status(404).json({ mensagem: "Instrumento não encontrado" });
    }

    dados.Instrumentos[indiceInstrumento].nome = atualizarInstrumento.nome || dados.Instrumentos[indiceInstrumento].nome;
    dados.Instrumentos[indiceInstrumento].familia = atualizarInstrumento.familia || dados.Instrumentos[indiceInstrumento].familia;
    dados.Instrumentos[indiceInstrumento].tipo = atualizarInstrumento.tipo || dados.Instrumentos[indiceInstrumento].tipo;
    dados.Instrumentos[indiceInstrumento].material = atualizarInstrumento.material || dados.Instrumentos[indiceInstrumento].material;
    dados.Instrumentos[indiceInstrumento].origem = atualizarInstrumento.origem || dados.Instrumentos[indiceInstrumento].origem;
    dados.Instrumentos[indiceInstrumento].descricao = atualizarInstrumento.descricao || dados.Instrumentos[indiceInstrumento].descricao;

    salvarDados(dados);
    return res.json({ mensagem: "Informações do instrumento atualizadas com sucesso" });
});

// Delete 
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const instrumentoDelet = dados.Instrumentos.filter(i => i.id !== id);



    if (instrumentoDelet === -1) {
        return res.status(404).json({ mensagem: "Instrumento não encontrado" });
    }
    
    dados.Instrumentos = instrumentoDelet

    salvarDados(dados);
    return res.status(200).json({ mensagem: "Instrumento excluído com sucesso" });
});

function salvarDados() {
    fs.writeFileSync(__dirname + "/db/dados.json", JSON.stringify(dados, null, 2));
}

module.exports = router;