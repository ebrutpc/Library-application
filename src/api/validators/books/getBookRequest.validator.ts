import { param } from 'express-validator';

const GetBookWithId = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id has to be a number'),
];

export default GetBookWithId;
