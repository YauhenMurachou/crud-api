import http from 'http';

import { sendJsonResponse } from "./sendJsonResponse";
import { users } from '../mockUsers';

export function handleGetAllUsers(_req: http.IncomingMessage, res: http.ServerResponse) {
  sendJsonResponse(res, 200, users);
}