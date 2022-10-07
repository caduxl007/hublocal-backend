<h1 align="center">Backend HubLocal</h1>

### 🛠 Tecnologias 

As seguintes ferramentas foram usadas na construção do projeto:

- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/) 
- [TypeOrm](https://typeorm.io/#/)
- [PostgreSql](https://www.postgresql.org/)
- [Nestjs](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Heroku](https://id.heroku.com/login)


<h1>🚀 Deploy?</h1>

- [Swagger](https://hublocal-backend-cadu.herokuapp.com/api/v1/swagger)


<h1>📱 Como usar?</h1>

### Pré-requisitos

Primeiramente, você precisa ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), o instalador de pacotes [Yarn](https://yarnpkg.com/) e o [Docker](https://www.docker.com/). 
E lógico é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/caduxl007/hublocal-backend.git>

# Após instalar o docker execute no terminal/cmd
$ docker run --name "nome-que-quiser" -e POSTGRES_PASSWORD=docker -p 5434:5432 -d postgres

# Use qualquer gerenciar de banco de dados e crie uma database no postgres:
$ nome da database: hublocal
$ port: 5434


# Acesse a pasta do projeto backend no terminal/cmd
$ cd hublocal-backend

Instale as dependências
$ yarn

# Utilize a .env.example


# Execute a aplicação
$ yarn start:dev

## Prontinho você terá acesso a aplicação!!!
```
