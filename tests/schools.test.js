const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

afterAll(async () => {
  db.end();
});

describe('GET /getAllSchoolsInformations', () => {
  it ('should return status 200', async () => {
    const response = await supertest(app).get('/api/getAllSchoolsInformations');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('universities');
    expect(response.body).toHaveProperty('subjects');
    expect(response.body).toHaveProperty('teachers');

    expect(response.body.universities[0]).toHaveProperty('id');
    expect(response.body.universities[0]).toHaveProperty('initial');
    expect(response.body.universities[0]).toHaveProperty('fullName');
    
    expect(response.body.subjects[0]).toHaveProperty('id');
    expect(response.body.subjects[0]).toHaveProperty('name');
    expect(response.body.subjects[0]).toHaveProperty('idUniversity');
    expect(response.body.subjects[0]).toHaveProperty('university');

    expect(response.body.teachers[0]).toHaveProperty('id');
    expect(response.body.teachers[0]).toHaveProperty('name');
    expect(response.body.teachers[0]).toHaveProperty('idSubject');
    expect(response.body.teachers[0]).toHaveProperty('subject');
    expect(response.body.teachers[0]).toHaveProperty('idUniversity');
    expect(response.body.teachers[0]).toHaveProperty('university');

  });
});