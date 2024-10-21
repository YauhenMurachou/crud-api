import http from 'http';
import { validate as uuidValidate } from 'uuid';
import { sendJsonResponse } from './sendJsonResponse';
import { users } from '../mockUsers';


export function handleGetUserById(_req: http.IncomingMessage, res: http.ServerResponse, userId: string) {
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