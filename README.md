
# Woovi Code Challenge

## Funcionalidades

- **Criar Conta:** Crie uma nova conta bancária.
- **Depositar:** Realize um depósito em uma conta existente.
- **Transferir:** Transfira dinheiro entre duas contas.
- **Consultar Conta:** Consulte detalhes de uma conta por ID.
- **Listar Contas:** Liste todas as contas com suporte a paginação. (Node e Connection)

## Configuração e Instalação

1. **Clone o Repositório:**

   ```bash

   git clone https://github.com/RyanV-Souza/woovi-code-challenge

   cd woovi-code-challenge

   ```
2. **Instale as Dependências:**

  Certifique-se de usar a versão LTS do Node.js

```bash

   npm install

```

3. **Configuração do Banco de Dados:**

   Certifique-se de que o MongoDB está rodando localmente ou configure as variáveis de ambiente para apontar para um banco de dados MongoDB acessível. (Você pode usar o arquivo `.env.example` como referência.)
4. **Inicie o Servidor:**

   ```bash

   npm start

   ```

   O servidor estará disponível em `http://localhost:4001`.

## Utilizando a API

### Acesso ao GraphQL Playground

Você pode acessar o GraphQL Playground para interagir com a API:

Pontos de atenção:

- Utilize centavos para as quantidades de dinheiro. Ex: 100 = R$ 1.00. (Referência: [What is a Ledger and Why Floating Points Are Not Recommended](https://dev.to/woovi/what-is-a-ledger-and-why-floating-points-are-not-recommended-1f4l))

Rotas:

- **GraphiQL:** `http://localhost:4001/graphql`
- **GraphQL Playground:** `http://localhost:4001/playground`

## Testes

Para executar os testes, utilize o seguinte comando:

```bash

npm test

```

Os testes cobrem a criação de contas, depósitos, transferências e consultas usando Jest.

Referência usada para fazer os testes: [Testing a GraphQL Server using Jest](https://medium.com/entria/testing-a-graphql-server-using-jest-4e00d0e4980e)

## Importação da Collection do Postman

Uma Collection do Postman foi preparada e está disponível na pasta `assets` deste repositório. Para importar a Collection:

1. Abra o Postman.
2. Clique em **Import**.
3. Selecione a opção **Upload Files** e escolha o arquivo `.json` localizado na pasta `assets`.
4. Após a importação, você poderá realizar chamadas às APIs diretamente do Postman.

## Deployment

A aplicação consegue ser acessada através desse link: [woovi-code-challenge-ruby.vercel.app](https://woovi-code-challenge-ruby.vercel.app/)

## Considerações

Essa foi minha primeira aplicação utilizando GraphQL e MongoDB. Eu gostei muito e sinto que evoluí bastante nesses três dias de desafio. Utilizei bastante referências da própria Woovi e do pessoal que trabalha nela, muito obrigado pelos posts, que me ajudaram muito!
