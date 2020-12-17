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

module.exports = {
  createTest
}