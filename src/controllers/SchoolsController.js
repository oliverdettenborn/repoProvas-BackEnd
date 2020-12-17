const universitiesRepository = require('../repository/universitiesRepository');
const subjectsRepository = require('../repository/subjectsRepository');
const teachersRepository = require('../repository/teachersRepository');

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

module.exports = {
  getAll,
  getTypeTest,
  getPeriod
}