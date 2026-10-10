const API_URL = '/api/produtos';
let editandoId = null; // Variável global para controlar se estamos editando

async function carregarProdutos() {
    try {
        const response = await fetch(API_URL);
        const produtos = await response.json();
        renderizarProdutos(produtos);
        atualizarResumoEstoque(produtos);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function atualizarResumoEstoque(produtos) {
    const totalProdutos = produtos.length;
    const totalUnidades = produtos.reduce((total, produto) => total + (Number(produto.quantidade) || 0), 0);
    const valorTotal = produtos.reduce((total, produto) => total + (Number(produto.preco) || 0) * (Number(produto.quantidade) || 0), 0);
    document.getElementById('totalProdutos').textContent = totalProdutos.toLocaleString('pt-BR');
    document.getElementById('totalUnidades').textContent = totalUnidades.toLocaleString('pt-BR');
    document.getElementById('valorEstoque').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderizarProdutos(produtos) {
    const tbody = document.getElementById('listaProdutos');
    tbody.innerHTML = '';

    produtos.forEach((produto) => {
        const tr = document.createElement('tr');
        const precoFormatado = Number(produto.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
        const quantidade = produto.quantidade || 0; // Prevenção de undefined antigo

        tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${precoFormatado}</td>
            <td>${quantidade}</td>
            <td>
                <!-- Passando os dados para a função de edição -->
                <button class="btn-editar" onclick="prepararEdicao(${produto.id}, '${produto.nome}', ${produto.preco}, ${quantidade})">Editar</button>
                <button class="btn-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função executada ao dar Submit no formulário (Cadastro ou Edição)
async function salvarProduto(event) {
    event.preventDefault(); // Impede o reload da página

    const inputNome = document.getElementById('nome');
    const inputPreco = document.getElementById('preco');
    const inputQuantidade = document.getElementById('quantidade');

    const nome = inputNome.value.trim();
    const preco = parseFloat(inputPreco.value);
    const quantidade = parseInt(inputQuantidade.value);

    if (nome === '' || isNaN(preco) || preco <= 0 || isNaN(quantidade) || quantidade <= 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const payload = { nome, preco, quantidade };

    try {
        if (editandoId) {
            // Modo Edição (PUT)
            await fetch(`${API_URL}/${editandoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            editandoId = null; // Reseta o ID de edição
            document.getElementById('btnCadastrar').textContent = 'Cadastrar Produto'; // Volta o nome do botão
        } else {
            // Modo Cadastro (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        // Limpa os campos
        document.getElementById('produtoForm').reset();
        inputNome.focus();
        carregarProdutos(); // Atualiza a tabela com o novo JSON

    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
}

// Função para jogar os dados da tabela de volta para o formulário
function prepararEdicao(id, nome, preco, quantidade) {
    editandoId = id; // Define qual ID está sendo editado
    document.getElementById('nome').value = nome;
    document.getElementById('preco').value = preco;
    document.getElementById('quantidade').value = quantidade;
    
    // Altera o visual do botão para indicar edição
    const btnSubmit = document.getElementById('btnCadastrar');
    btnSubmit.textContent = 'Salvar Alterações';
    
    // Rola a tela para o topo para facilitar a edição em dispositivos menores
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function excluirProduto(id) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            carregarProdutos();
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    }
}

// Troca do Event Listener para 'submit' no formulário
document.getElementById('produtoForm').addEventListener('submit', salvarProduto);

window.addEventListener('DOMContentLoaded', carregarProdutos);
