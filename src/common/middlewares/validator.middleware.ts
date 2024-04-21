import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpStatusCode from 'common/constants/httpstatusCode.constant';
const requestValidator =
  () => (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    return next();
  };

export default requestValidator;
