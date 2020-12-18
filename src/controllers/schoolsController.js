const universitiesRepository = require('../repository/universitiesRepository');
const subjectsRepository = require('../repository/subjectsRepository');
const teachersRepository = require('../repository/teachersRepository');
const schoolSchema = require('../schemas/schoolSchema');
const sanitazeHtml = require('../utils/sanitizeInput');

async function getAll(req,res){
  try{
    const universities = await universitiesRepository.getAllUniversities();
    const subjects = await subjectsRepository.getAllSubjectsWithUniversity();
    const teachers = await teachersRepository.getAllTeachersWithUniversityWithSubject();

    res.status(200).send({
      universities,
      subjects,
      teachers
    })
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function getTypeTest(req,res){
  try{
    const typeTest = await subjectsRepository.getTypesOfTests();
    res.status(200).send(typeTest);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function getPeriod(req,res){
  try{
    const period = await subjectsRepository.getOptionsPeriod();
    res.status(200).send(period);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function newUniversity(req,res){
  try{
    const { error } = schoolSchema.newUniversitySchema.validate(req.body);
    if(error) return res.status(422).send({ error: error.details[0].message });
    const data = sanitazeHtml(req.body);

    const universityIsUnique = await universitiesRepository.isInitialUnique(data.initial)
    if(universityIsUnique){
      return res.status(409).send({error: 'This university alredy exists'})
    }

    const newUniversity = await universitiesRepository.create(data);
    res.status(201).send(newUniversity);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function newSubject(req,res){
  try{
    const { error } = schoolSchema.newSubjectSchema.validate(req.body);
    if(error) return res.status(422).send({ error: error.details[0].message });
    const data = sanitazeHtml(req.body);

    const newSubject = await subjectsRepository.create(data);
    res.status(201).send(newSubject);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function newTeacher(req,res){
  try{
    const { error } = schoolSchema.newTeacherSchema.validate(req.body);
    if(error) return res.status(422).send({ error: error.details[0].message });
    const data = sanitazeHtml(req.body);

    const newTeacher = await teachersRepository.create(data);
    res.status(201).send(newTeacher);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  getAll,
  getTypeTest,
  getPeriod,
  newUniversity,
  newSubject,
  newTeacher
}