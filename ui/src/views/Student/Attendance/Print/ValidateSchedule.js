import * as Yup from 'yup';

const ValidateExistingUser = Yup.object().shape({
  day: Yup.string()
    .required('Required'),
    // .test('len', 'Must be exactly 4 characters', val => val.length === 4),
  time: Yup.string()
    .required('Required'),
});

export default ValidateExistingUser;
