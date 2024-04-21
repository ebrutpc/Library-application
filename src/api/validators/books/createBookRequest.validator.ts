import { body } from 'express-validator';

const CreateBook = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .isLength({ min: 10, max: 120 })
    .withMessage('name has to be a string'),
];

export default CreateBook;
