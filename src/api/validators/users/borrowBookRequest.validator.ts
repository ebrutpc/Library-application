import { param } from 'express-validator';
const BorrowBook = [
  param('id')
    .exists()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id has to be a number'),
  param('bookId')
    .exists()
    .withMessage('bookId is required')
    .isNumeric()
    .withMessage('bookId has to be a number'),
];

export default BorrowBook;
