import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { api } from '../lib/axios';

import Label from './Label';
import AuthInput from './AuthInput';
import SubmitFormError from './SubmitFormError';
import AuthButton from './AuthButton';
import AuthParagraph from './AuthParagraph';
import ValidationError from './ValidationError';

export default function RegisterForm() {
  const [enableToRegister, setEnableToRegister] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(values: {
    registerName: string;
    registerEmail: string;
    registerPassword: string;
    registerConfirmPassword: string;
  }) {
    if (
      !values.registerName ||
      !values.registerEmail ||
      !values.registerPassword ||
      !values.registerConfirmPassword
    ) {
      return;
    }

    if (values.registerPassword !== values.registerConfirmPassword) {
      setPasswordMatch(true);
      return;
    }

    api
      .post('/api/users/', {
        name: values.registerName,
        email: values.registerEmail,
        password: values.registerPassword
      })
      .then(response => {
        const data = response.data;

        if (!data) {
          setEnableToRegister(true);
          setPasswordMatch(false);
        }

        setTimeout(() => {
          navigate('/login');
        }, 500);
      })
      .catch(error => {
        setEnableToRegister(true);
      });

    setPasswordMatch(false);
    setEnableToRegister(false);
  }

  const yupValidationSchema = {
    registerName: Yup.string().required('Name is Required'),
    registerEmail: Yup.string()
      .email('Invalid Email')
      .required('Email is required'),
    registerPassword: Yup.string()
      .min(8, 'Password needs to have minimum of 8 characters')
      .max(15, 'Password needs to have maximum of 15 characters')
      .required('Password is required'),
    registerConfirmPassword: Yup.string()
      .min(8, 'Password needs to have minimum of 8 characters')
      .max(15, 'Password needs to have maximum of 15 characters')
      .required('Confirm Password is required')
  };

  return (
    <>
      <Formik
        initialValues={{
          registerName: '',
          registerEmail: '',
          registerPassword: '',
          registerConfirmPassword: ''
        }}
        onSubmit={values => handleSubmit(values)}
        validationSchema={Yup.object().shape(yupValidationSchema)}
      >
        {props => {
          const {
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched
          } = props;

          return (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <Label content="Name" htmlFor="registerName" />

                <Field
                  id="registerName"
                  name="registerName"
                  type="text"
                  placeholder={'John Doe'}
                  component={AuthInput}
                  value={values.registerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.registerName}
                  aria-describedby="registerNameError"
                />

                {errors.registerName && touched.registerName ? (
                  <ValidationError content={errors.registerName} />
                ) : null}
              </div>

              <div>
                <Label content="Email" htmlFor="registerEmail" />

                <Field
                  id="registerEmail"
                  name="registerEmail"
                  type="email"
                  placeholder={'name@company.com'}
                  component={AuthInput}
                  value={values.registerEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.registerEmail}
                  aria-describedby="loginEmailError"
                />

                {errors.registerEmail && touched.registerEmail ? (
                  <ValidationError content={errors.registerEmail} />
                ) : null}
              </div>

              <div>
                <Label content="Password" htmlFor="registerPassword" />

                <Field
                  id="registerPassword"
                  name="registerPassword"
                  type="password"
                  placeholder={'••••••••'}
                  component={AuthInput}
                  value={values.registerPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.registerPassword}
                  aria-describedby="registerPasswordEmail"
                />

                {errors.registerPassword && touched.registerPassword ? (
                  <ValidationError content={errors.registerPassword} />
                ) : null}
              </div>

              <div>
                <Label
                  content="Confirm Password"
                  htmlFor="registerConfirmPassword"
                />

                <Field
                  id="registerConfirmPassword"
                  name="registerConfirmPassword"
                  type="password"
                  placeholder={'••••••••'}
                  component={AuthInput}
                  value={values.registerConfirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.registerConfirmPassword}
                  aria-describedby="registerConfirmPasswordEmail"
                />

                {errors.registerConfirmPassword &&
                touched.registerConfirmPassword ? (
                  <ValidationError content={errors.registerConfirmPassword} />
                ) : null}
              </div>

              {enableToRegister && (
                <SubmitFormError content="Unable to register. Please try again!" />
              )}

              {passwordMatch && (
                <SubmitFormError content="Passwords should match!" />
              )}

              <AuthButton
                disabled={isSubmitting}
                title={isSubmitting ? 'Registering...' : 'Sign Up'}
              />

              <AuthParagraph
                buttonContent="Sign in"
                routePath="login"
                textContent="Already have an account?"
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}
