# Darkcast Backend

Este é a API Restfull do backend do projeto de conclusão Darkcast.
O projeto consiste em fazer streaming de áudios assim como o seu upload e ter um cadastro de usuário.

## Linguagens

Foi utilizado NodeJS, Express e MongoDB e AWS S3 no projeto.

----
### Configurações

É necessário criar um arquivo chamado **proprieties.json** no caminho *config/*, abaixo são os campos que necessitam ser preenchidos.

```
{
    "DB_HOST" : "<Database URL>",
    "DB_PORT" : <Database Port>,
    "DB_USER" : "<Database user name (can be null if development)>",
    "DB_PASS" : "<Database user password (can be null if development)>",
    "DB_NAME" : "<Database Name>",
    "APP_PORT" : <Application Port to Listen>,
    "APP_ENV" : "<Application Environment (development || production)>",
    "S3_KEY" : "<AWS S3 Access Key>",
    "S3_SECRET" : "<AWS S3 Secret Access Key>",
    "S3_BUCKET" : "<AWS S3 Bucket Name>",

}
```
<s>Ps. Existe um arquivo de exemplo como guideline.</s>

### Rotas

As rotas definidas são:
+ \<url\>/
+ \<url\>/tracks
    + POST \<url\>/tracks
+ \<url\>/tracks/:track_id
    + GET \<url\>/tracks/:track_id
    + DELETE \<url\>/tracks/:track_id
+ \<url\>/users
    + GET \<url\>/users 
    + POST \<url\>/users
+ \<url\>/users/:user_id
    + GET \<url\>/users/:user_id
    + DELETE \<url\>/users/:user_id
+ \<url\>/users/login
    + POST \<url\>/users/login
+ \<url\>/users/me
    + GET \<url\>/users/me
+ \<url\>/users/me/logout
    + POST \<url\>/users/me/logout
+ \<url\>/users/me/logoutall
    + POST \<url\>/users/me/logoutall
+ \<url\>/mock
    + GET \<url\>/mock

## Modelo dos dados

Abaixo estão os modelos de Usuário e das Tracks

**User**
```
name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Email inválido!'})
            }
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
    },
    tracks_saved: [{
        track_saved: {
            track_id: String,
            time_in_seconds: Number
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    create_date: {
        type: Date,
        default: Date.now
    }
```

**Track**
```
name: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    key: {
        type: String
    },
    options: {
        track_id_child_1: String,
        track_id_child_2: String,
        track_id_father: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
```

## Módulos utilizados

* [nodemon](https://nodemon.io/) - Usado para rodar a aplicação
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Usado para criptografar a senha do usuário
* [aws-sdk](https://www.npmjs.com/package/aws-sdk) - Usado em conjunto ao S3 para salvar os áudios no AWS S3
* [s3](https://www.npmjs.com/package/s3) - Responsável por fazer o stream do áudio
* [mongoose](https://mongoosejs.com/) - Conexão com o MongoDB
* [multer](https://github.com/expressjs/multer) - Usado para realizar o upload do áudio
* [validator](https://www.npmjs.com/package/validator) - Usado para validar o e-mail do Usuário
* [chalk](https://www.npmjs.com/package/chalk) - Usado para colorir as mensagens no console vindas do servidor
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Realizar a autenticação do usuário com base em Tokens
* [express](https://expressjs.com/) - Usado juntamente ao NodeJs para maior flexibilidade

## Instalação

Para instalar basta seguir o processo abaixo:

```
git clone https://github.com/bklass/darkcast_backend.git
cd darkcast_backend
npm install
cd config
touch proprieties.json
  <add values on the file created>
npm start
```

----
### Próximos passos

* Adicionar login por redes sociais
* Criar CI/CD
