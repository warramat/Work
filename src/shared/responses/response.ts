import { Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

export function resp(res: Response, httpStatus: number, body: IResponse) {
  return res.status(httpStatus).json(body);
}
