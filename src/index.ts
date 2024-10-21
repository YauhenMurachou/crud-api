import http from 'http';
import dotenv from 'dotenv';
import { handleCreateUser, handleDeleteUser, handleGetAllUsers, handleGetUserById, handleUpdateUser, sendJsonResponse } from './helpers';

dotenv.config();

const port = process.env.PORT || 3001;

function handleServerError(res: http.ServerResponse, error: Error) {
  console.error('Server error:', error);
  sendJsonResponse(res, 500, { message: 'Internal server error. Please try again later.' });
}

const server = http.createServer((req, res) => {
  try {
    const userIdMatch = req.url?.match(/^\/api\/users\/([a-zA-Z0-9-]+)$/);

    if (req.url === '/api/users' && req.method === 'GET') {
      handleGetAllUsers(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      handleCreateUser(req, res);
    } else if (userIdMatch && req.method === 'GET') {
      handleGetUserById(req, res, userIdMatch[1]);
    } else if (userIdMatch && req.method === 'PUT') {
      handleUpdateUser(req, res, userIdMatch[1]);
    } else if (userIdMatch && req.method === 'DELETE') {
      handleDeleteUser(req, res, userIdMatch[1]);
    } else {
      sendJsonResponse(res, 404, { message: 'Route not found' });
    }
  } catch (error) {
    handleServerError(res, error as Error);
  }
});

server.listen(port, () => {
  console.log(`CRUD API listening on port ${port}`);
});
