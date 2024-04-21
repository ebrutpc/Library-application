import { param, body } from 'express-validator';

const ReturnBook = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id has to be a number'),
  param('bookId')
    .exists()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id has to be a number'),
  body('score')
    .exists()
    .withMessage('score is required')
    .isNumeric()
    .withMessage('Score has to be a numberxP'),
];

export default ReturnBook;
