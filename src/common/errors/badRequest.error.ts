import HttpStatusCode from 'common/constants/httpstatusCode.constant';

class BadRequestError extends Error {
  code: HttpStatusCode;
  constructor(message: string) {
    super();
    this.message = message || 'Bad Request';
    this.code = HttpStatusCode.BAD_REQUEST;
  }
}

export default BadRequestError;
