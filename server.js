const express = require('express');
const cors = require('cors');
const path = require('path'); // 1. Importado o path

const app = express();

app.use(cors());
app.use(express.json());

// 2. LINHA CORRIGIDA: Ensina o servidor local a mostrar o index.html da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Carrega os dados iniciais do arquivo JSON, se existir
let produtos = [];
try {
    produtos = require('./data/produtos.json');
} catch (error) {
    produtos = []; // Se não encontrar, inicia vazio
}

// LER os produtos
app.get('/api/produtos', (req, res) => {
    res.json(produtos);
});

// SALVAR um novo produto
app.post('/api/produtos', (req, res) => {
    const { nome, preco, quantidade } = req.body;
    const novoProduto = { 
        id: Date.now(), 
        nome, 
        preco, 
        quantidade: parseInt(quantidade) 
    };
    
    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

// ATUALIZAR (EDITAR)
app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, preco, quantidade } = req.body;
    
    const index = produtos.findIndex(p => p.id === id);

    if (index !== -1) {
        produtos[index] = { id, nome, preco, quantidade: parseInt(quantidade) };
        res.json(produtos[index]);
    } else {
        res.status(404).json({ error: 'Produto não encontrado' });
    }
});

// EXCLUIR
app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    produtos = produtos.filter(p => p.id !== id);
    res.status(204).send();
});

// Exporta o app para a Vercel conseguir executar como Serverless Function
module.exports = app;

// Apenas inicia o servidor na porta 3000 se rodar no seu computador
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
