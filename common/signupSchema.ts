import * as yup from 'yup';

export const signupSchema = yup.object({
  username: yup.string().required('Username is Required'),
  password: yup.string().required('Password is Required'),
  firstName: yup.string().required('First Name is Required'),
  lastName: yup.string().required('Last Name is Required'),
  email: yup.string().email().required('Email is Required'),
});
