import http from 'http';
import { users } from './mockUsers';

function makeRequest(method: string, path: string, body?: any): Promise<{ statusCode: number; body: any }> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode!,
          body: data ? JSON.parse(data) : null,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

describe('CRUD API', () => {
  let createdUserId: string;

  test('GET /api/users returns an empty array initially', async () => {
    const response = await makeRequest('GET', '/api/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(users);
  });

  test('POST /api/users creates a new user', async () => {
    const newUser = {
      username: 'Ivan Petrov',
      age: 30,
      hobbies: ['reading', 'cycling'],
    };

    const response = await makeRequest('POST', '/api/users', newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject(newUser);
    expect(response.body.id).toBeDefined();

    createdUserId = response.body.id;
  });

  test('PUT /api/users/{userId} updates the user', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 31,
      hobbies: ['writing', 'painting'],
    };

    const response = await makeRequest('PUT', `/api/users/${createdUserId}`, updatedUser);
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
    expect(response.body.id).toBe(createdUserId);
  });

  test('DELETE /api/users/{userId} deletes the user', async () => {
    const response = await makeRequest('DELETE', `/api/users/${createdUserId}`);
    expect(response.statusCode).toBe(204);
  });

  test('GET /api/users/{userId} returns 400 for invalid UUID', async () => {
    const response = await makeRequest('GET', '/api/users/invalid-uuid');
    expect(response.statusCode).toBe(400);
  });
});
