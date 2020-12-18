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

async function create({ name, idSubject, idUniversity }){
  const resultTeacher = await db.query('INSERT INTO teachers (name) VALUES ($1) RETURNING *', [name])
  const idTeacher= resultTeacher.rows[0].id;
  await db.query(
    `
      INSERT INTO subjects_teachers
      ("idSubject", "idTeacher", "idUniversity")
      VALUES ($1, $2, $3);
    `,
    [idSubject, idTeacher, idUniversity]
  )

  const newItem = await db.query(
    `
    SELECT 
      teachers.id, teachers.name, subjects_teachers."idSubject", subjects.name AS subject,
      subjects_teachers."idUniversity", universities.initial AS university
    FROM teachers
    JOIN subjects_teachers ON subjects_teachers."idTeacher" = teachers.id
    JOIN subjects ON subjects_teachers."idSubject" = subjects.id
    JOIN universities ON subjects_teachers."idUniversity" = universities.id
    WHERE teachers.id=$1 AND subjects_teachers."idSubject"=$2 AND subjects_teachers."idUniversity"=$3
    `,
    [idTeacher, idSubject, idUniversity]
  )
  return newItem.rows[0]
}

module.exports = {
  getAllTeachersWithUniversityWithSubject,
  create
}