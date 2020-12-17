const universitiesRepository = require('../repository/universities');
const subjectsRepository = require('../repository/subjects');
const teachersRepository = require('../repository/teachers');
const testsRepository = require('../repository/tests');


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
    const typeTest = await testsRepository.getTypesOfTests();
    res.status(200).send(typeTest);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function getPeriod(req,res){
  try{
    const period = await testsRepository.getOptionsPeriod();
    res.status(200).send(period);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  getAll,
  getTypeTest,
  getPeriod
}