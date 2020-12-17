const universitiesRepository = require('../repository/universities');
const subjectsRepository = require('../repository/subjects');
const teachersRepository = require('../repository/teachers');


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

module.exports = {
  getAll
}