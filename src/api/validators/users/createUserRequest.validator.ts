import { body } from 'express-validator';

const CreateUser = [
  body('name')
    .exists()
    .withMessage('name is required')
    .isString()
    .isLength({ max: 60, min: 4 })
    .withMessage('name has to be string and also its length has to be 60.'),
];

export default CreateUser;
