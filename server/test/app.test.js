const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');


jest.mock('../src/db', () => ({
    getConnection: jest.fn()
}));

const mockConn = {
    query: jest.fn(),
    release: jest.fn()
};


// reset before each test
beforeEach(() => {
    jest.clearAllMocks();
    db.getConnection.mockResolvedValue(mockConn);
});

// basic test 
test('GET /api/test should return message : "API test routes is working"', async () => {
    const res = await request(app).get('/api/test');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('API test routes is working');
});

// roles
test('GET /api/users/roles should return ok', async () => {

    mockConn.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

    const res = await request(app).get('/api/users/roles');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Test' }]);
});

// users
test('GET /api/users should return ok', async () => {

    mockConn.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, name: 'Test' }]);

});

// get one user
test('GET /api/users/1 should return ok', async () => {

    mockConn.query.mockResolvedValue([{ id: 1, name: 'Test' }]);

    const res = await request(app).get('/api/users/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ id: 1, name: 'Test' });

});

//create
test('POST /api/users should create user', async () => {
    mockConn.query.mockResolvedValue({ insertId: 1 });

    const res = await request(app)
        .post('/api/users')
        .send({ name: 'John', password: '123456' });

    console.log(res.statusCode);
    console.log("body", res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ message: 'User created' });
});

//update
test('PUT /api/users/:id should update user', async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1 });

    const res = await request(app)
        .put('/api/users/1')
        .send({ name: 'Updated' });

    console.log(res.statusCode);
    console.log("body", res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'User updated' });
});

//delete
test('DELETE /api/users/:id should delete user', async () => {
    mockConn.query.mockResolvedValue({ affectedRows: 1 });

    const res = await request(app).delete('/api/users/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
});