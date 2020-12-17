const express = require('express');
const app = express();
const cors = require('cors');
const SchoolsController = require('./controllers/SchoolsController');

app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods : '*'
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/api/getAllSchoolsInformations', SchoolsController.getAll)

module.exports = app;