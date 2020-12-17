const db = require('../database');


async function getAllTeachersWithUniversityWithSubject(){
  const result = await db.query(
    `
    SELECT 
      teachers.id, teachers.name, subjects_teachers."idSubject", subjects.name AS subject,
      subjects_teachers."idUniversity", universities.initial AS university
    FROM teachers
    JOIN subjects_teachers ON subjects_teachers."idTeacher" = teachers.id
    JOIN subjects ON subjects_teachers."idSubject" = subjects.id
    JOIN universities ON subjects_teachers."idUniversity" = universities.id
    `
  )
  return result.rows
}

module.exports = {
  getAllTeachersWithUniversityWithSubject
}