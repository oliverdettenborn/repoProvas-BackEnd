const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

async function cleanDataBase(){
  await db.query('DELETE FROM tests');
  await db.query('DELETE FROM subjects_universities');
  await db.query('DELETE FROM subjects_teachers');
  await db.query('DELETE FROM teachers');
  await db.query('DELETE FROM subjects');
  await db.query('DELETE FROM universities');
}

beforeAll(cleanDataBase)

afterAll(async () => {
  await cleanDataBase()
  db.end();
});

let idUniversity, idSubject;


describe('POST /university/create', () => {
  it ('should return status 201 when sucess to create university', async () => {
    const body = {
      initial: 'USP',
      fullName: 'Universidade de São Paulo'
    }

    const response = await supertest(app).post('/api/university/create').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toMatchObject(body);

    idUniversity = response.body.id;
  });

  it ('should return status 422 when forgot attributtes', async () => {
    const body = {
      initial: 'USP',
    }
    const response = await supertest(app).post('/api/university/create').send(body);
    expect(response.status).toBe(422);
  });

  it ('should return status 409 when try create universities with same initial', async () => {
    const body = {
      initial: 'USP',
      fullName: 'Universidade de São Paulo'
    }
    const response = await supertest(app).post('/api/university/create').send(body);
    expect(response.status).toBe(409);
  });
});

describe('POST /subject/create', () => {
  it ('should return status 201 when sucess to create a subject', async () => {
    const body = {
      name: 'desenvolvimento web',
      idUniversity
    }

    const response = await supertest(app).post('/api/subject/create').send(body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('idUniversity');
    expect(response.body).toHaveProperty('university');

    idSubject = response.body.id;
  });

  it ('should return status 422 when send number as name', async () => {
    const body = {
      name: 12313,
      idUniversity
    }
    const response = await supertest(app).post('/api/subject/create').send(body);
    expect(response.status).toBe(422);
  });
  it ('should return status 422 when forgot to send idUniversity', async () => {
    const body = {
      name: 12313,
    }
    const response = await supertest(app).post('/api/subject/create').send(body);
    expect(response.status).toBe(422);
  });
});

describe('POST /teacher/create', () => {
  it ('should return status 201 when sucess to create a teacher', async () => {
    const body = {
      name: 'Alex Fereira',
      idUniversity,
      idSubject
    }

    const response = await supertest(app).post('/api/teacher/create').send(body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('idUniversity');
    expect(response.body).toHaveProperty('university');
    expect(response.body.idUniversity).toBe(idUniversity);
    expect(response.body).toHaveProperty('idSubject');
    expect(response.body.idSubject).toBe(idSubject);
    expect(response.body).toHaveProperty('subject');
  });

  it ('should return status 422 when send number as name', async () => {
    const body = {
      name: 12313,
      idUniversity,
      idSubject
    }
    const response = await supertest(app).post('/api/teacher/create').send(body);
    expect(response.status).toBe(422);
  });
  it ('should return status 422 when forgot to send idUniversity', async () => {
    const body = {
      name: 'Alex Fereira',
      idSubject
    }
    const response = await supertest(app).post('/api/teacher/create').send(body);
    expect(response.status).toBe(422);
  });
  it ('should return status 422 when forgot to send idSubject', async () => {
    const body = {
      name: 'Alex Fereira',
      idUniversity
    }
    const response = await supertest(app).post('/api/teacher/create').send(body);
    expect(response.status).toBe(422);
  });
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

describe('GET /getTypeTest', () => {
  it ('should return status 200', async () => {
    const response = await supertest(app).get('/api/getTypeTest');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body.length).toBe(6);
  });
});

describe('GET /getPeriod', () => {
  it ('should return status 200', async () => {
    const response = await supertest(app).get('/api/getPeriod');

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body.length).toBe(3);
  });
});