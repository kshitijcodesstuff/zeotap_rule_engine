jest.setTimeout(10000); 

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Rule = require('../models/Rule');


beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});


beforeEach(async () => {
  await Rule.deleteMany();
});


afterAll(async () => {
  await mongoose.connection.close();
});

describe('Rule Routes', () => {
  test('Should create a new rule', async () => {
    const response = await request(app)
      .post('/api/rules/create')
      .send({
        ruleString: '(salary > 60000 && age > 30)',
        name: 'High Earners',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('High Earners');
    expect(response.body.ruleString).toBe('(salary > 60000 && age > 30)');
  });

  test('Should evaluate a rule correctly', async () => {
    const createResponse = await request(app)
      .post('/api/rules/create')
      .send({
        ruleString: '(salary > 60000)',
        name: 'Salary Check',
      });

    const ruleId = createResponse.body._id;

    const evalResponse = await request(app)
      .post('/api/rules/evaluate')
      .send({ ruleId, data: { salary: 70000 } });

    expect(evalResponse.statusCode).toBe(200);
    expect(evalResponse.body.result).toBe(true);
  });

  test('Should combine multiple rules correctly', async () => {
    const rule1 = await request(app)
      .post('/api/rules/create')
      .send({ ruleString: '(age > 30)', name: 'Age Check' });

    const rule2 = await request(app)
      .post('/api/rules/create')
      .send({ ruleString: '(salary > 60000)', name: 'Salary Check' });

    const ruleIds = [rule1.body._id, rule2.body._id];

    const combineResponse = await request(app)
      .post('/api/rules/combine')
      .send({ ruleIds, name: 'Combined Rule' });

    expect(combineResponse.statusCode).toBe(201);
    expect(combineResponse.body.name).toBe('Combined Rule');
    expect(combineResponse.body.ruleString).toBe('(age > 30) && (salary > 60000)'); // Updated expected value
  });

  test('Should update an existing rule', async () => {
    const createResponse = await request(app)
      .post('/api/rules/create')
      .send({ ruleString: '(salary > 60000)', name: 'Salary Check' });

    const ruleId = createResponse.body._id;

    const updateResponse = await request(app)
      .put(`/api/rules/update/${ruleId}`)
      .send({ ruleString: '(salary > 70000)' });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.body.ruleString).toBe('(salary > 70000)');
  });
});

