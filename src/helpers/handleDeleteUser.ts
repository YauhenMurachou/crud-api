import http from 'http';
import { validate as uuidValidate } from 'uuid';

import { sendJsonResponse } from "./sendJsonResponse";
import { users } from '../mockUsers';

function sendNoContentResponse(res: http.ServerResponse) {
  res.writeHead(204);
  res.end();
}

export function handleDeleteUser(_req: http.IncomingMessage, res: http.ServerResponse, userId: string) {
  if (!uuidValidate(userId)) {
    sendJsonResponse(res, 400, { message: 'Invalid userId. Must be a valid UUID.' });
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    sendJsonResponse(res, 404, { message: 'User not found' });
    return;
  }

  users.splice(userIndex, 1);
  sendNoContentResponse(res);
}