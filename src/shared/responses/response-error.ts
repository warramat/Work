import { Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

export function respError(res: Response, httpStatus: number, message: any) {
  console.log('error message ::', message);
  const badRequestBody: IResponse = {
    success: false,
    message: message,
  };
  return res.status(httpStatus).json(badRequestBody);
}
