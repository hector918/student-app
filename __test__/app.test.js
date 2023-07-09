const app = require('../app'); 
const supertest = require('supertest');
const request = supertest(app);

describe('GET /students', () => {
  it('should return an array of students', async () => {
    const response = await request.get('/students');
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
  });

});

describe('GET /student/:id', () => {
  it('should return a student object with the specified id', async () => {
    const response = await request.get('/student/1');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', '1');
  });

  it('should return an error message if no student with the specified id is found', async () => {
    const response = await request.get('/student/100');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  it('should handle errors and return a 500 status code with an error message', async () => {
    const response = await request.get('/student/invalid-id');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error');
  });
});
