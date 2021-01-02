<p align="center">
  <img src="https://raw.githubusercontent.com/thaliadettenborn/repoProvas-FrontEnd/main/public/logo192.png" width="100" alt="RepoProvas" />
</p>

# RepoProvas (BackEnd)

 ![license](https://img.shields.io/github/license/thaliadettenborn/repoProvas-BackEnd?style=flat-square) ![total lines](https://img.shields.io/tokei/lines/github/thaliadettenborn/repoProvas-BackEnd) ![last commit](https://img.shields.io/github/last-commit/thaliadettenborn/repoProvas-BackEnd?style=flat-square) ![issues](https://img.shields.io/github/package-json/v/thaliadettenborn/repoProvas-BackEnd?style=flat-square) ![forks](https://img.shields.io/github/forks/thaliadettenborn/repoProvas-BackEnd?style=flat-square) 

<br><br>
## About
<p>
  API to provide data for the RepoProvas app.<br><br>
  <a href="https://github.com/thaliadettenborn/repoProvas-FrontEnd" target='_blank'>
    ✔️ Click here to view the front-end repository.
  </a>
</p>


<br><br><br>
<p align="center">
  <a style='color:inherit' href="#pré-requisites">Pre-requisites</a> •
  <a style='color:inherit' href="#running-the-web-applications">Running the web application</a> •
  <a style='color:inherit' href="#features">Features</a> •
  <a style='color:inherit' href="#rest">REST API</a> •
  <a style='color:inherit' href="#tech">Tech Stack</a> •
  <a style='color:inherit' href="#deploy">Deploy</a> •
  <a style='color:inherit' href="#contributors">Contributors</a> •
  <a style='color:inherit' href="#author">Author</a>
</p>

<br><br>
## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine: [Git] (https://git-scm.com), [Node.js] (https://nodejs.org/en/). In addition, it is good to have an editor to work with the code like [VSCode] (https://code.visualstudio.com/)

<br><br>
## Running the web application
```bash
# Clone this repository
$ git clone <https://github.com/thaliadettenborn/repoProvas-BackEnd.git>

# Access the project folder cmd/terminal
$ cd repoProvas-BackEnd

# Install the dependencies
$ npm install

# Create a file of environment variables at the root of the project
$ touch .env

# Set the database port and link as environment variable according to the ".env.example" file

# Run the app
$ npm start

# The server will automatically start

# Run the tests
$ npm test

```

<br><br>
## Features
- [x] Create a new university<br>
- [x] Create a new discipline for a university<br>
- [x] Create a new teacher for a discipline and university<br>
- [x] List all period options<br>
- [x] List all proof type options<br>
- [x] List all university, subject and teacher options<br>
- [x] Create a new test applied by professor X, of discipline Y, at university Z, which has been of a type of test and applied in a certain period<br>
- [x] List of all tests applied at university X of discipline Y<br>

<br><br>
## REST API
<br>
✔️ Documentation: https://documenter.getpostman.com/view/13440732/TVt2cPfM
<br><br>

### `POST /api/university/create`

#### Request
    curl --location --request POST 'https://repo-provas.herokuapp.com/api/university/create' \
    --data-raw '{
      "initial": "UFCSPA",
      "fullName": "Universidade de Ciências da Saúde de Porto Alegre"
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 4,
      "initial": "UFCSPA",
      "fullName": "Universidade de Ciências da Saúde de Porto Alegre"
    }



<br><br>

### `POST /api/subject/create`

#### Request
    curl --location --request POST 'https://repo-provas.herokuapp.com/api/subject/create' \
    --data-raw '{
      "name": "Técnicas Culinárias I",
      "idUniversity": 4
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 3,
      "name": "Técnicas Culinárias I",
      "idUniversity": 4,
      "university": "UFCSPA"
    }



<br><br>

### `POST /api/teacher/create`

#### Request
    curl --location --request POST 'https://repo-provas.herokuapp.com/api/teacher/create' \
    --data-raw '{
      "name": "Isabel Kasper",
      "idUniversity": 4,
      "idSubject": 3 
    }'

#### Response

    HTTP/1.1 201 Created
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 201 Created
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 17,
      "name": "Isabel Kasper",
      "idSubject": 3,
      "subject": "Técnicas Culinárias I",
      "idUniversity": 4,
      "university": "UFCSPA"
    }



<br><br>

### `GET /api/getPeriod`

#### Request
    curl --location --request GET 'https://repo-provas.herokuapp.com/api/getPeriod'
#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
        "id": 1,
        "name": "1° semestre"
      },
      {
        "id": 2,
        "name": "2° semestre"
      },
      {
        "id": 3,
        "name": "Eletiva"
      }
    ]



<br><br>

### `GET /api/getTypeTest`

#### Request
    curl --location --request GET 'https://repo-provas.herokuapp.com/api/getTypeTest'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
        "id": 1,
        "name": "P1"
      },
      {
        "id": 2,
        "name": "P2"
      },
      {
        "id": 3,
        "name": "P3"
      },
      {
        "id": 4,
        "name": "PF"
      },
      {
        "id": 5,
        "name": "2ch"
      },
      {
        "id": 6,
        "name": "Outras"
      }
    ]



<br><br>

### `GET /api/getAllSchoolsInformations`

#### Request
    curl --location --request GET 'https://repo-provas.herokuapp.com/api/getTypeTest'
#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "universities": [
        {
          "id": 1,
          "initial": "UFRJ",
          "fullName": "universidade federal do rio de janeiro"
        },
        {
          "id": 2,
          "initial": "UFRGS",
          "fullName": "universidade federal do rio grande do sul"
        },
        {
          "id": 3,
          "initial": "RA",
          "fullName": "Responde Aí"
        },
        {
          "id": 4,
          "initial": "UFCSPA",
          "fullName": "Universidade de Ciências da Saúde de Porto Alegre"
        }
      ],
      "subjects": [
        {
          "id": 1,
          "name": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 1,
          "name": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 2,
          "name": "Fundamentos da computação",
          "idUniversity": 3,
          "university": "RA"
        },
        {
          "id": 3,
          "name": "Técnicas Culinárias I",
          "idUniversity": 4,
          "university": "UFCSPA"
        }
      ],
      "teachers": [
        {
          "id": 1,
          "name": "Luis Gustavo Doninelli Mendes",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 2,
          "name": "Liana Beatriz Costi Nácul",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 3,
          "name": "Luisa Rodrigues Doering",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 4,
          "name": "Juliane Golubinski Capaverde",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 5,
          "name": "Débora da Silva Soares",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 6,
          "name": "Luiz Emílio Allem",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 7,
          "name": "Elismar da Rosa Oliveira",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 8,
          "name": "Flávia Malta Branco",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 9,
          "name": "Bárbara Seelig Pogorelsky",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 10,
          "name": "Paola Rossato Bernardo",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 2,
          "university": "UFRGS"
        },
        {
          "id": 11,
          "name": "Rolci de Almeida Cipolatti",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 12,
          "name": "Amilcar Pacheco",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 13,
          "name": "Adán José Corcho Fernandez",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 14,
          "name": "Ademir Fernando Pazoto",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 15,
          "name": "Guilherme Augusto de La Rocque Leal",
          "idSubject": 1,
          "subject": "calculo 1",
          "idUniversity": 1,
          "university": "UFRJ"
        },
        {
          "id": 16,
          "name": "Pedrão",
          "idSubject": 2,
          "subject": "Fundamentos da computação",
          "idUniversity": 3,
          "university": "RA"
        },
        {
          "id": 17,
          "name": "Isabel Kasper",
          "idSubject": 3,
          "subject": "Técnicas Culinárias I",
          "idUniversity": 4,
          "university": "UFCSPA"
        }
      ]
    }



<br><br>

### `POST /api/tests/create`

#### Request
    curl --location --request POST 'https://repo-provas.herokuapp.com/api/tests/create' \
    --data-raw '{
        "name": "Prova 2020/2",
        "idPeriod": 2,
        "idUniversity": 4,
        "idSubject": 3,
        "idTypeTest": 1,
        "idTeacher": 17,
        "url": "https://www.google.com"
    }'

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    {
      "id": 32,
      "name": "Prova 2020/2",
      "idPeriod": 2,
      "idUniversity": 4,
      "idSubject": 3,
      "idTypeTest": 1,
      "idTeacher": 17,
      "url": "https://www.google.com"
    }



<br><br>

### `POST /api/tests/:idUniversity/subjects/:idSubject`

#### Request
    curl --location --request GET 'https://repo-provas.herokuapp.com/api/tests/4/subjects/3'
    PATH VARIABLES
    idUniversity: 4
    idSubject: 3

#### Response

    HTTP/1.1 200 OK
    Sat, 02 Jan 2021 21:11:47 GMT
    Status: 200 OK
    Connection: keep-alive
    application/json; charset=utf-8
    X-Powered-By: Express

    [
      {
        "id": 32,
        "name": "Prova 2020/2",
        "idPeriod": 2,
        "period": "2° semestre",
        "idTypeTest": 1,
        "typeTest": "P1",
        "idTeacher": 17,
        "teacher": "Isabel Kasper",
        "url": "https://www.google.com"
      }
    ]



<br><br>
## Tech Stack
Languages:<br>
<p align="center">
  <img src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/markdown-%23000000.svg?&style=for-the-badge&logo=markdown&logoColor=white"/>
</p>
<br>


The following tools and frameworks were used in the construction of the project:<br>
<p align="center" style='display: flex; justify-content: center; flex-wrap:wrap; align-items: center; margin: 0 50px;'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/cors%20-%2314354C.svg?&style=for-the-badge&logo=cors&logoColor=white"'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/dotenv-%2300ADD8.svg?&style=for-the-badge&logo=dotenv&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/jest%20-%235B2F33.svg?&style=for-the-badge&logo=jest&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/joi-%23276DC3.svg?&style=for-the-badge&logo=joi&logoColor=white"/>
  <img style='margin: 5px;' src='https://img.shields.io/badge/nodemon%20-%23239120.svg?&style=for-the-badge&logo=nodemon&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/pg%20%20-%232E7EEA.svg?&style=for-the-badge&logo=pg&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/string-strip%20html%20%20-%232E7EEA.svg?&style=for-the-badge&logo=string_strip_html&logoColor=4F4D3F'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/supertest%20-%23000.svg?&style=for-the-badge&logo=supertest&logoColor=4F4D3F'>

</p>

<br>
  Database:
  <img style='margin-left: 10px;' src ="https://img.shields.io/badge/postgres-%23316192.svg?&style=for-the-badge&logo=postgresql&logoColor=white"/>

<br>
Version Control:
<img style='margin-left: 10px;' src="https://img.shields.io/badge/git%20-%23F05033.svg?&style=for-the-badge&logo=git&logoColor=white"/>
<img style='margin-left: 5px;'  src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>

<br><br>
## Deploy

The application layout is available on Heroku:
<a style='margin-left: 10px;' href='https://repo-provas.herokuapp.com'><img src="https://img.shields.io/badge/heroku%20-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/></a>

<br><br>
## Contributors
<table>
  <tr>
    <td align="center"><a href="https://github.com/responde-ai"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/40724166?s=200&v=4" width="100px;" alt=""/><br /><sub><b>Responde Aí</b></sub></a><br />
  </tr>
</table>

<br><br>
## Author
---
<br>
<p align='center'>
  <img src="https://avatars0.githubusercontent.com/u/70967247?s=460&u=0684339f0717ae41ce18689351f0215fdf270590&v=4" width="100px;" style="border-radius: 50%;"/>
  <br><br>
  Made by Thalia Roberta Dettenborn 👋🏽 Get in Touch!<br>
  <a href="https://www.linkedin.com/in/thaliarobertadettenborn/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white"/></a>
  <a href="mailto:thalia.born@gmail.com"><img src="https://img.shields.io/badge/gmail-D14836?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
  <a href="https://github.com/thaliadettenborn"><img src="https://img.shields.io/badge/github-%23100000.svg?&style=for-the-badge&logo=github&logoColor=white" /></a>
</p>
