import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .test('contains-at', 'Email must contain "@"', value => value && value.includes('@')),
    password: yup.string()
        .min(6, 'Length must be 6')
        .required('Password is required'),
});


export const signupSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .test('contains-at', 'Email must contain "@"', value => value && value.includes('@')),
    password: yup.string()
        .min(6, 'Length must be 6')
        .required('Password is required'),
});