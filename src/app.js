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

const schoolsController = require('./controllers/schoolsController');
const testsController = require('./controllers/testsController');


app.get('/api/getAllSchoolsInformations', schoolsController.getAll);
app.get('/api/getTypeTest', schoolsController.getTypeTest);
app.get('/api/getPeriod', schoolsController.getPeriod);

app.post('/api/university/create', schoolsController.newUniversity);
app.post('/api/subject/create', schoolsController.newSubject);
app.post('/api/teacher/create', schoolsController.newTeacher);


app.get('/api/tests/:idUniversity/subjects/:idSubject', testsController.getAllBySubjectId);
app.post('/api/tests/create', testsController.createNewTest);

module.exports = app;