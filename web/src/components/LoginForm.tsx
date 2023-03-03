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

export default function LoginForm() {
  const [enableToLogin, setEnableToLogin] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(values: {
    loginEmail: string;
    loginPassword: string;
  }) {
    if (!values.loginEmail || !values.loginPassword) {
      return;
    }

    api
      .post('/api/users/login', {
        email: values.loginEmail,
        password: values.loginPassword
      })
      .then(response => {
        const token = response.data.accesToken;

        if (!token) {
          setEnableToLogin(true);
        }

        // Store the user token on the local storage of the browser
        localStorage.clear();
        localStorage.setItem('user-token', token);

        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      })
      .catch(error => {
        setEnableToLogin(true);
      });

    setEnableToLogin(false);
  }

  const yupValidationSchema = {
    loginEmail: Yup.string()
      .email('Invalid Email')
      .required('Email is required'),
    loginPassword: Yup.string()
      .min(8, 'Password needs to have minimum of 8 characters')
      .max(15, 'Password needs to have maximum of 15 characters')
      .required('Password is required')
  };

  return (
    <>
      <Formik
        initialValues={{
          loginEmail: '',
          loginPassword: ''
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
                <Label content="Email" htmlFor="loginEmail" />

                <Field
                  id="loginEmail"
                  name="loginEmail"
                  type="email"
                  placeholder={'name@company.com'}
                  component={AuthInput}
                  value={values.loginEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.loginEmail}
                  aria-describedby="loginEmailError"
                />

                {errors.loginEmail && touched.loginEmail ? (
                  <div className="mt-2 text-sm text-red-600 flex gap-2 items-center mb-4">
                    {errors.loginEmail}
                  </div>
                ) : null}
              </div>

              <div>
                <Label content="Password" htmlFor="loginPassword" />

                <Field
                  id="loginPassword"
                  name="loginPassword"
                  type="password"
                  placeholder={'••••••••'}
                  component={AuthInput}
                  value={values.loginPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.loginPassword}
                  aria-describedby="loginPasswordEmail"
                />

                {errors.loginPassword && touched.loginPassword ? (
                  <div className="mt-2 text-sm text-red-600 flex gap-2 items-center">
                    {errors.loginPassword}
                  </div>
                ) : null}
              </div>

              {enableToLogin && (
                <SubmitFormError content="Invalid email or password!" />
              )}

              <AuthButton
                disabled={isSubmitting}
                title={isSubmitting ? 'Authenticating...' : 'Sign In'}
              />

              <AuthParagraph
                buttonContent="Sign up"
                routePath="register"
                textContent="Don't have an account yet?"
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}
