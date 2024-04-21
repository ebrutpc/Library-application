import HttpStatusCode from 'common/constants/httpstatusCode.constant';

class InternalServerError extends Error {
  code: HttpStatusCode;
  constructor() {
    super();
    this.message = 'Too Many 500 Erors.Server Down.';
    this.code = HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}

export default InternalServerError;
