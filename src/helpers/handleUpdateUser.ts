import http from 'http';
import { validate as uuidValidate } from 'uuid';

import { sendJsonResponse } from "./sendJsonResponse";
import { users } from '../mockUsers';


export function handleUpdateUser(req: http.IncomingMessage, res: http.ServerResponse, userId: string) {
  if (!uuidValidate(userId)) {
    sendJsonResponse(res, 400, { message: 'Invalid userId. Must be a valid UUID.' });
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    sendJsonResponse(res, 404, { message: 'User not found' });
    return;
  }

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

      users[userIndex] = {
        ...users[userIndex],
        username: userData.username,
        age: userData.age,
        hobbies: userData.hobbies
      };

      sendJsonResponse(res, 200, users[userIndex]);
    } catch (error) {
      sendJsonResponse(res, 400, { message: 'Invalid JSON in request body' });
    }
  });
}