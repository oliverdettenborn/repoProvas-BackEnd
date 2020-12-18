const db = require('../database');

async function getAllUniversities(){
  const result = await db.query(
    'SELECT * FROM universities'
  )
  return result.rows
}

async function create({ initial, fullName }){
  const result = await db.query(
    `
      INSERT INTO universities
        (initial, "fullName")
        VALUES ($1, $2) RETURNING *
    `,
    [initial.toUpperCase(), fullName]
  )
  return result.rows[0]
}

async function isInitialUnique(initial){
  const result = await db.query(
    `SELECT * FROM universities WHERE initial=$1`,
    [initial.toUpperCase()]
  )
  return result.rows[0]
}

module.exports = {
  getAllUniversities,
  create,
  isInitialUnique
}