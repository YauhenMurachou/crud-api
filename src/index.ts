import http from 'http';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const port = 3001;

interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [
  {
    id: '1',
    username: 'johnDoe',
    age: 30,
    hobbies: ['reading', 'hiking']
  },
  {
    id: '2',
    username: 'janeDoe',
    age: 25,
    hobbies: ['painting', 'cooking']
  },
  {
    id: '3',
    username: 'bobSmith',
    age: 40,
    hobbies: ['gaming', 'traveling']
  }
];

function sendJsonResponse(res: http.ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function handleGetAllUsers(req: http.IncomingMessage, res: http.ServerResponse) {
  sendJsonResponse(res, 200, users);
}

function handleGetUserById(req: http.IncomingMessage, res: http.ServerResponse, userId: string) {
  if (!uuidValidate(userId)) {
    sendJsonResponse(res, 400, { message: 'Invalid userId. Must be a valid UUID.' });
    return;
  }

  const user = users.find(u => u.id === userId);

  if (user) {
    sendJsonResponse(res, 200, user);
  } else {
    sendJsonResponse(res, 404, { message: 'User not found' });
  }
}

const server = http.createServer((req, res) => {
  const userIdMatch = req.url?.match(/^\/api\/users\/([a-zA-Z0-9-]+)$/);

  if (req.url === '/api/users' && req.method === 'GET') {
    handleGetAllUsers(req, res);
  } else if (userIdMatch && req.method === 'GET') {
    handleGetUserById(req, res, userIdMatch[1]);
  } else {
    sendJsonResponse(res, 404, { message: 'Route not found' });
  }
});

server.listen(port, () => {
  console.log(`CRUD API listening on port ${port}`);
});
