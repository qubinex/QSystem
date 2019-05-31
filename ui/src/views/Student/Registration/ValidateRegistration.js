import * as Yup from 'yup';

const ValidateRegistration = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  gender: Yup.string().required(),
  dob: Yup.string().required(),
  identification: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  postcode: Yup.string().required(),
  contact: Yup.number().typeError('must be a number').required(),

});

export default ValidateRegistration;
