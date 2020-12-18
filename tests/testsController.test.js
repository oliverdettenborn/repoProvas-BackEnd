const supertest = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const cleanDataBase = async() => {
  await db.query('DELETE FROM tests');
  await db.query('DELETE FROM subjects_universities');
  await db.query('DELETE FROM subjects_teachers');
  await db.query('DELETE FROM teachers');
  await db.query('DELETE FROM subjects');
  await db.query('DELETE FROM universities');
}

beforeAll(cleanDataBase);

afterAll(async () => {
  await cleanDataBase();
  db.end();
});

let idUniversity, idSubject, idTeacher;

describe('POST university, subject and teacher to use next tests', () => {
  it ('should return status 201 when sucess to create university', async () => {
    const body = {
      initial: 'USP',
      fullName: 'Universidade de São Paulo'
    }
    const response = await supertest(app).post('/api/university/create').send(body);
    expect(response.status).toBe(201);
    idUniversity = response.body.id;
  });
  it ('should return status 201 when sucess to create a subject', async () => {
    const body = {
      name: 'desenvolvimento web',
      idUniversity
    }
    const response = await supertest(app).post('/api/subject/create').send(body);
    expect(response.status).toBe(201);
    idSubject = response.body.id;
  });
  it ('should return status 201 when sucess to create a teacher', async () => {
    const body = {
      name: 'Alex Fereira',
      idUniversity,
      idSubject
    }
    const response = await supertest(app).post('/api/teacher/create').send(body);
    expect(response.status).toBe(201);
    idTeacher = response.body.id;
  });
});


describe('POST /tests/create', () => {
  it ('should return status 201 when sucess to create new test', async () => {
    
    const body = {
      name: 'Teste prova 2020', 
      idPeriod: 1, 
      idUniversity, 
      idSubject, 
      idTypeTest: 1, 
      idTeacher, 
      url: 'https://dbdiagram.io/home'
    }

    const response = await supertest(app).post('/api/tests/create').send(body);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(body);
  });

  it ('should return status 422 when send wrong type params', async () => {
    
    const body = {
      name: 'Teste prova 2020', 
      idPeriod: "aza", 
      idUniversity: "xax", 
      idSubject: "xsa", 
      idTypeTest: "xsa", 
      idTeacher: "xas", 
      url: 'https://dbdiagram.io/home'
    }

    const response = await supertest(app).post('/api/tests/create').send(body);
    expect(response.status).toBe(422);
  });

  it ('should return status 422 when send html at url', async () => {
    
    const body = {
      name: '<p>Test<p>', 
      idPeriod: 2, 
      idUniversity, 
      idSubject, 
      idTypeTest: 1, 
      idTeacher, 
      url: '<script>https://dbdiagram.io/home<script>'
    }

    const response = await supertest(app).post('/api/tests/create').send(body);
    expect(response.status).toBe(422);
  });

  it ('should return status 201 when send html at name and return sanitized', async () => {
    
    const body = {
      name: '<p>Test<p>', 
      idPeriod: 2, 
      idUniversity, 
      idSubject, 
      idTypeTest: 1, 
      idTeacher, 
      url: 'https://dbdiagram.io/home'
    }

    const bodyResponse = {
      name: 'Test', 
      idPeriod: 2, 
      idUniversity, 
      idSubject, 
      idTypeTest: 1, 
      idTeacher, 
      url: 'https://dbdiagram.io/home'
    }

    const response = await supertest(app).post('/api/tests/create').send(body);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(bodyResponse);
    expect(response.body).toHaveProperty('id');
  });
});

describe('GET /tests/:idUniversity/subjects/:idSubject', () => {
  it ('should return status 200', async () => {
    const response = await supertest(app).get(`/api/tests/${idUniversity}/subjects/${idSubject}`);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('idPeriod');
    expect(response.body[0]).toHaveProperty('period');
    expect(response.body[0]).toHaveProperty('idTypeTest');
    expect(response.body[0]).toHaveProperty('typeTest');
    expect(response.body[0]).toHaveProperty('idTeacher');
    expect(response.body[0]).toHaveProperty('teacher');
    expect(response.body[0]).toHaveProperty('url');
  });
});