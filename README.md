# freedom-api

### Dependencias

- Instalar typescript

  - npm i typescript ts-node nodemon -D

- Inicialize o tsconfig.json

  - npx typescript --init

- Criar migration tabela de usuários

  - yarn typeorm migration:create -n CreateUsersTable

- Criptografar senhas

  - npm i bcryptjs
  - npm i @types/bcryptjs -D

- JWT
  - npm i jsonwebtoken
  - npm i @types/jsonwebtoken

### Docker

- Baixar a imagem mysql

  - docker pull mysql:5.6

- Subir o container do banco mysql
  - docker run --name botcrypto -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=botcrypto -d -p3307:3306 -d mysql:5.6

**Helpers**

- [Variaveis-Ambiente](https://blog.rocketseat.com.br/variaveis-ambiente-nodejs/)
- [AutiJWT](https://www.youtube.com/watch?v=TjAXBLszCb0)
- [TypeORM](https://typeorm.io/#/)
- [JWT](https://www.npmjs.com/package/jsonwebtoken)
