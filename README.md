# Gestão de Produtos | Anhanguera Educacional

Sistema acadêmico de cadastro e controle de produtos desenvolvido com **Node.js, Express e JavaScript**, com interface responsiva inspirada na identidade visual **InNovaIdeia®**.

> Projeto de estudos em Análise e Desenvolvimento de Sistemas (ADS), com operações CRUD, indicadores de estoque e API REST.

## Funcionalidades

- **Cadastrar** produtos com nome, preço unitário e quantidade.
- **Listar** os produtos registrados.
- **Editar** informações de produtos existentes.
- **Excluir** produtos mediante confirmação.
- **Resumo de estoque** com número de produtos cadastrados, total de unidades e valor financeiro estimado.
- **Tema claro e escuro**, com preferência armazenada no navegador quando disponível.
- **Layout responsivo** para computadores e dispositivos móveis.
- Mensagens de sucesso e erro e validação básica de formulário.

### Indicadores do estoque

Os indicadores exibidos abaixo da tabela são calculados a partir da lista retornada pela API:

- **Produtos cadastrados:** número de registros.
- **Unidades em estoque:** soma das quantidades.
- **Valor total em estoque:** soma de `preço unitário × quantidade` de cada produto.

Os valores monetários são apresentados em reais (BRL).

## Tecnologias

| Camada | Tecnologia |
| --- | --- |
| Interface | HTML5, CSS3 e JavaScript |
| Backend | Node.js e Express 5 |
| API | REST com JSON |
| Comunicação | Fetch API |
| Dependências | Express e CORS |
| Dados iniciais | `data/produtos.json`, quando disponível |

## Executar localmente

### Pré-requisitos

- Node.js e npm instalados.

Clone o repositório:

```bash
git clone https://github.com/Foxactive1/ahanguera_educacional.git
cd ahanguera_educacional
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
node server.js
```

Abra **http://localhost:3000** no navegador.

> Observação: o `server.js` inicia o servidor local quando `NODE_ENV` não é `production`. Em produção, exporta o aplicativo Express para uso pela plataforma de hospedagem.

## API REST

Endpoint base: `/api/produtos`

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api/produtos` | Listar produtos |
| POST | `/api/produtos` | Cadastrar produto |
| PUT | `/api/produtos/:id` | Atualizar produto |
| DELETE | `/api/produtos/:id` | Excluir produto |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teclado","preco":89.90,"quantidade":5}'
```

Exemplo de objeto retornado:

```json
{
  "id": 1234567890,
  "nome": "Teclado",
  "preco": 89.9,
  "quantidade": 5
}
```

O identificador acima é apenas ilustrativo.

## Estrutura principal

```text
ahanguera_educacional/
├── public/
│   ├── index.html      # Interface e formulário
│   ├── style.css       # Estilos, temas e responsividade
│   └── script.js       # Integração com API e operações CRUD
├── data/
│   └── produtos.json   # Dados iniciais, quando presente
├── server.js           # API Express e arquivos estáticos
├── package.json        # Dependências
└── README.md           # Documentação
```

## Segurança e limitações atuais

- A interface utiliza criação de elementos DOM e `textContent` para exibir os nomes dos produtos, reduzindo o risco de injeção de HTML.
- O frontend verifica o status HTTP das operações antes de considerá-las bem-sucedidas.
- **A API ainda precisa de validação robusta no servidor**; não se deve depender apenas da validação do navegador.
- **Os dados são mantidos em memória no backend**. O arquivo JSON é usado para carga inicial, mas cadastros, alterações e exclusões **não são gravados permanentemente nele**.
- Em reinicializações e ambientes serverless, como Vercel, os dados modificados podem desaparecer. Portanto, esta versão é indicada para demonstração e estudos, não para controle de estoque em produção.
- O projeto não dispõe, nesta versão, de autenticação e autorização de usuários.
- O `package.json` ainda não possui uma suíte de testes automatizados configurada.

## Próximas melhorias sugeridas

1. Persistência em SQLite para desenvolvimento local e PostgreSQL/Neon para produção.
2. Validação de entradas no backend e tratamento padronizado de erros.
3. Testes automatizados da API e das regras de estoque.
4. Busca, filtros e ordenação dos produtos.
5. Autenticação e controle de acesso, caso o sistema passe a operar com dados reais.

## Autor

**Dione Castro Alves**  
Estudante de Análise e Desenvolvimento de Sistemas — Anhanguera Educacional  
Fundador da **InNovaIdeia Assessoria em Tecnologia ®**

- [GitHub](https://github.com/Foxactive1)
- [LinkedIn](https://www.linkedin.com/in/dionecastroalves)
- [Portfólio](https://innovaideia-github-io.vercel.app)

---

**Projeto acadêmico e demonstrativo.** Desenvolvido para aplicar conceitos de programação web, APIs REST e gerenciamento de produtos.
