import { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { api } from '../lib/axios';

import Label from './Label';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import SubmitFormError from './SubmitFormError';

interface DashboardFormProps {
  onFormSubmit: Function;
}

export default function DashboardForm(props: DashboardFormProps) {
  const [unableToAdd, setUnableToAdd] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const userToken = localStorage.getItem('user-token');

  async function handleSubmit(values: {
    transactionText: string;
    transactionValue: string;
  }) {
    setSubmitted(true);

    if (!values.transactionText || !values.transactionValue) {
      return;
    }

    api
      .post(
        '/api/transactions',
        {
          text: values.transactionText,
          value: Number(values.transactionValue) * 100 // Transform into cents
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(response => {
        if (!response) {
          setUnableToAdd(true);
        }

        setSubmitted(false);
        props.onFormSubmit();
      });

    setSubmitted(false);
    setUnableToAdd(false);
  }

  const yupValidationSchema = {
    transactionText: Yup.string()
      .min(3, 'Text should have at least 3 characters')
      .required('Text is required'),
    transactionValue: Yup.string()
      .matches(/^[-0-9]+$/, 'Must be only digits')
      .required('Value is required')
  };

  return (
    <>
      <Formik
        initialValues={{
          transactionText: '',
          transactionValue: ''
        }}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values).then(() => resetForm());
        }}
        validationSchema={Yup.object().shape(yupValidationSchema)}
      >
        {props => {
          const {
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched
          } = props;

          return (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <Label content="Text" htmlFor="transactionText" />

                <Field
                  id="transactionText"
                  name="transactionText"
                  type="text"
                  placeholder={'Salary, Rent...'}
                  component={AuthInput}
                  value={values.transactionText}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.transactionText}
                  aria-describedby="transactionTextError"
                />

                {errors.transactionText && touched.transactionText ? (
                  <div className="mt-2 text-sm text-red-600 flex gap-2 items-center mb-4">
                    {errors.transactionText}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="transactionValue"
                  className="block mb-2 text-sm font-medium"
                >
                  Amount <span className="text-red-600"> *</span>
                  <small className="text-white">
                    {' '}
                    (<span className="text-red-400"> negative-expense</span> ,
                    <span className="text-accent-500"> positive-income</span>)
                  </small>
                </label>

                <Field
                  id="transactionValue"
                  name="transactionValue"
                  type="text"
                  placeholder={'Ex.: 2000, -1500.50...'}
                  component={AuthInput}
                  value={values.transactionValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.transactionValue}
                  aria-describedby="transactionValueEmail"
                />

                {errors.transactionValue && touched.transactionValue ? (
                  <div className="mt-2 text-sm text-red-600 flex gap-2 items-center">
                    {errors.transactionValue}
                  </div>
                ) : null}
              </div>

              {unableToAdd && (
                <SubmitFormError content="Unable to add transaction. Please try again!" />
              )}

              <AuthButton
                disabled={submitted}
                title={submitted ? 'Adding...' : 'Add Transaction'}
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}
