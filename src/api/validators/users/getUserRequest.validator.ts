import { param } from 'express-validator';

const GetUserId = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id has to be a number'),
];

export default GetUserId;
