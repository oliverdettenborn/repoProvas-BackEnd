const db = require('../database');


async function getAllSubjectsWithUniversity(){
  const result = await db.query(
    `
    SELECT 
      subjects.id, subjects.name, subjects_universities."idUniversity", universities.initial AS university 
    FROM subjects
    JOIN subjects_universities ON subjects_universities."idSubject" = subjects.id
    JOIN universities ON subjects_universities."idUniversity" = universities.id
    `
  )
  return result.rows
}

module.exports = {
  getAllSubjectsWithUniversity
}