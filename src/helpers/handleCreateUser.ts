import http from 'http';
import { v4 as uuidv4 } from 'uuid';

import { sendJsonResponse } from './sendJsonResponse';
import { User, users } from '../mockUsers';

export function handleCreateUser(req: http.IncomingMessage, res: http.ServerResponse) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const userData = JSON.parse(body);

      if (!userData.username || !userData.age || !Array.isArray(userData.hobbies)) {
        sendJsonResponse(res, 400, { message: 'Request body does not contain required fields' });
        return;
      }

      const newUser: User = {
        id: uuidv4(),
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies
      };

      users.push(newUser);
      sendJsonResponse(res, 201, newUser);
    } catch (error) {
      sendJsonResponse(res, 400, { message: 'Invalid JSON in request body' });
    }
  });
}