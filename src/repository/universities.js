const db = require('../database');

async function getAllUniversities(){
  const result = await db.query(
    'SELECT * FROM universities'
  )
  return result.rows
}

module.exports = {
  getAllUniversities
}