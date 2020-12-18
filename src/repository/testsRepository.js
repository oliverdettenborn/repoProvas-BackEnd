const db = require('../database');

async function createTest(data){
  const { name, idPeriod, idUniversity, idSubject, idTypeTest, idTeacher, url } = data
  
  const result = await db.query(
    `
      INSERT INTO tests
        (name, "idPeriod", "idUniversity", "idSubject", "idTypeTest", "idTeacher", url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `,
    [name, idPeriod, idUniversity, idSubject, idTypeTest, idTeacher, url]
  )
  return result.rows[0];
}

async function findBySubjectId(idUniversity, idSubject){
  const result = await db.query(
    `
      SELECT 
        tests.id, tests.name, tests."idPeriod", "period".name AS "period", 
        tests."idTypeTest", type_test.name AS "typeTest", tests."idTeacher", 
        teachers.name AS teacher, url
      FROM tests
      JOIN "period" ON "period".id = tests."idPeriod"
      JOIN type_test ON type_test.id = tests."idTypeTest"
      JOIN teachers ON teachers.id = tests."idTeacher"
      WHERE "idUniversity"=$1 AND "idSubject"=$2
      ORDER BY tests."idTeacher", tests."idPeriod", tests."idTypeTest"
    `,
    [idUniversity, idSubject]
  )
  return result.rows;
}

module.exports = {
  createTest,
  findBySubjectId
}