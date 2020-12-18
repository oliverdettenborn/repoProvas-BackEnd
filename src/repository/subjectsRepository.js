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

async function getOptionsPeriod(){
  const result = await db.query(
    `
      SELECT * FROM period
      ORDER BY id ASC
    `
  )
  return result.rows
}

async function getTypesOfTests(){
  const result = await db.query(
    `
      SELECT * FROM type_test
      ORDER BY id ASC 
    `
  )
  return result.rows
}

async function create({ name, idUniversity }){
  const resultSubject = await db.query('INSERT INTO subjects (name) VALUES ($1) RETURNING *', [name])
  const idSubject = resultSubject.rows[0].id;
  await db.query(
    'INSERT INTO subjects_universities ("idUniversity", "idSubject") VALUES ($1,$2)',
    [idUniversity, idSubject]
  )
  const newItem = await db.query(
    `
    SELECT 
      subjects.id, subjects.name, subjects_universities."idUniversity", universities.initial AS university 
    FROM subjects
    JOIN subjects_universities ON subjects_universities."idSubject" = subjects.id
    JOIN universities ON subjects_universities."idUniversity" = universities.id
    WHERE subjects.id=$1 AND subjects_universities."idUniversity"=$2
    `,
    [idSubject, idUniversity]
  )
  return newItem.rows[0];
}

module.exports = {
  getAllSubjectsWithUniversity,
  getTypesOfTests,
  getOptionsPeriod,
  create
}