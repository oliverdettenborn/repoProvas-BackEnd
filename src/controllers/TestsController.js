const testsRepository = require('../repository/testsRepository');
const testsSchemas = require('../schemas/testsSchemas');
const sanitazeHtml = require('../utils/sanitizeInput');

async function createNewTest(req,res){
  try{
    const { error } = testsSchemas.newTestSchema.validate(req.body);
    if(error) return res.status(422).send({ error: error.details[0].message });
    const data = sanitazeHtml(req.body);

    const newTest = await testsRepository.createTest(data);
    res.status(201).send(newTest);
    
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

async function getAllBySubjectId(req,res){
  try{
    const { idUniversity, idSubject } = req.params;
    const tests = await testsRepository.findBySubjectId(idUniversity, idSubject);
    res.status(200).send(tests);
  }catch(e){
    console.log(e);
    res.sendStatus(500);
  }
}

module.exports = {
  createNewTest,
  getAllBySubjectId
}