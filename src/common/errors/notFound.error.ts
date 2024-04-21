import HttpStatusCode from 'common/constants/httpstatusCode.constant';

class NotFoundError extends Error {
  code: HttpStatusCode;
  constructor(message: string) {
    super();
    this.message = message || 'Not Found Error';
    this.code = HttpStatusCode.NOT_FOUND;
  }
}

export default NotFoundError;
