const db = require('../database');


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

module.exports = {
  getTypesOfTests,
  getOptionsPeriod
}