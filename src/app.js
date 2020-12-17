const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods : '*'
}
app.use(cors(corsOptions));
app.use(express.json());

const SchoolsController = require('./controllers/SchoolsController');
const TestsController = require('./controllers/TestsController');


app.get('/api/getAllSchoolsInformations', SchoolsController.getAll);
app.get('/api/getTypeTest', SchoolsController.getTypeTest);
app.get('/api/getPeriod', SchoolsController.getPeriod);

app.post('/api/createTest', TestsController.createNewTest);


module.exports = app;