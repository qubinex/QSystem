import * as Yup from 'yup';

const ValidateExistingUser = Yup.object().shape({
  contactLast4Digits: Yup.number()
    .integer('Please enter number only')
    .required('Required')
    .typeError('Invalid number'),
    // .test('len', 'Must be exactly 4 characters', val => val.length === 4),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export default ValidateExistingUser;
