# Darkcast Backend

Este é a API Restfull do backend do projeto de conclusão Darkcast.
O projeto consiste em fazer streaming de áudios assim como o seu upload e ter um cadastro de usuário.

## Linguagens

Foi utilizado NodeJS, Express e MongoDB e AWS S3 no projeto.

----
## Configurações

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
    "JWT_KEY": "<Secret Key for tokens>"
}
```
<s>Ps. Existe um arquivo de exemplo como guideline.</s>

## Rotas

As rotas definidas são:
+ \<url\>/api
+ \<url\>/api/tracks
    + POST \<url\>/api/tracks
+ \<url\>/api/tracks/:track_id
    + GET \<url\>/api/tracks/:track_id
    + DELETE \<url\>/api/tracks/:track_id
    + PUT \<url\>/api/tracks/:track_id
    + PATCH \<url\>/api/tracks/:track_id
+ \<url\>/api/tracks/play/:track_id
    + GET \<url\>/api/tracks/play/:track_id
+ \<url\>/api/users
    + GET \<url\>/api/users 
    + POST \<url\>/api/users
+ \<url\>/api/users/:user_id
    + GET \<url\>/api/users/:user_id
    + DELETE \<url\>/api/users/:user_id
    + PUT \<url\>/api/users/:user_id
    + PATCH \<url\>/api/users/:user_id
+ \<url\>/api/users/login
    + POST \<url\>/api/users/login
+ \<url\>/api/users/me
    + GET \<url\>/users/me
+ \<url\>/api/users/me/logout
    + POST \<url\>/api/users/me/logout
+ \<url\>/api/users/me/logoutall
    + POST \<url\>/api/users/me/logoutall
+ \<url\>/api/mock
    + GET \<url\>/api/mock

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
        track_id: String,
        time_in_seconds: Number
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
        type: Number,
        required: true
    },
    key: {
        type: String
    },
     background: {
        type: String,
        required: true
    },
    options: {
        track_id_child_1: String,
        answer_child_1: String,
        track_id_child_2: String,
        answer_child_2: String,
        track_id_father: String,
        question: String,
        question_time: Number
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
## Próximos passos

* Adicionar login por redes sociais
* Criar CI/CD
