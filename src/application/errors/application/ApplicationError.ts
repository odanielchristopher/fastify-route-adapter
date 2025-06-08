import { ErrorCode } from '../ErrorCode';

export abstract class ApplicationError extends Error {
  public abstract statusCode: number;

  public abstract code: ErrorCode;
}
