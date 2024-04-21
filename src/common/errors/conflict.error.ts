import HttpStatusCode from '../../common/constants/httpstatusCode.constant';

class ConflictError extends Error {
  code: HttpStatusCode;
  constructor(message: string) {
    super();
    this.message = message || 'Conflict Error.';
    this.code = HttpStatusCode.BAD_REQUEST;
  }
}

export default ConflictError;
