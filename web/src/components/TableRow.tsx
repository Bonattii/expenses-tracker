import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { api } from '../lib/axios';
import * as Yup from 'yup';

import Label from './Label';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';
import { Field, Formik } from 'formik';
import SubmitFormError from './SubmitFormError';

interface TableRowProps {
  text: string;
  value: number;
  id: string;
  onDelete: Function;
  onUpdate: Function;
}

export default function TableRow(props: TableRowProps) {
  const [updateSubmitted, setUpdateSubmitted] = useState(false);
  const [unableToUpdate, setUnableToUpdate] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const userToken = localStorage.getItem('user-token');

  async function handleClick() {
    props.onDelete(props.id);
  }

  async function handleUpdate(values: {
    updateText: string;
    updateValue: string;
  }) {
    setSubmitted(true);

    api
      .put(
        '/api/transactions',
        {
          text: values.updateText,
          value: Number(values.updateValue) * 100,
          id: props.id
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(() => {
        props.onUpdate();
        setUpdateSubmitted(false);
        setSubmitted(false);
      })
      .catch(error => setUnableToUpdate(true));

    setUnableToUpdate(false);
  }

  const yupValidationSchema = {
    updateText: Yup.string()
      .min(3, 'Text should have at least 3 characters')
      .required('Text is required'),
    updateValue: Yup.string()
      .matches(/^[+-]?([0-9]*[.])?[0-9]+$/, 'Must be only digits')
      .required('Value is required')
  };

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.text}
      </td>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.value}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <Dialog.Root>
          <Dialog.Trigger
            type="button"
            onClick={() => setUpdateSubmitted(true)}
            className="text-accent-500 hover:opacity-90 focus:ring-accent-500 focus:ring-2 focus:outline-none"
          >
            Edit
          </Dialog.Trigger>

          {updateSubmitted && (
            <Dialog.Portal>
              <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

              <Dialog.Content className="absolute p-10 mt-32 bg-primary-500 border border-accent-500 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close className="absolute right-6 top-6 text-gray-400 rounded-lg hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-500">
                  <XMarkIcon className="block h-6 w-6" aria-label="close" />
                </Dialog.Close>

                <Dialog.Title className="text-3xl leading-tight font-bold mb-2">
                  Update Transaction
                </Dialog.Title>

                <Formik
                  initialValues={{
                    updateText: '',
                    updateValue: ''
                  }}
                  onSubmit={async (values, { resetForm }) => {
                    await handleUpdate(values);
                    return resetForm();
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
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 md:space-y-6"
                      >
                        <div>
                          <Label content="Text" htmlFor="updateText" />

                          <Field
                            id="updateText"
                            name="updateText"
                            type="text"
                            placeholder={'Salary, Rent...'}
                            component={AuthInput}
                            value={values.updateText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-required="true"
                            aria-invalid={!!errors.updateText}
                            aria-describedby="updateTextError"
                          />

                          {errors.updateText && touched.updateText ? (
                            <div className="mt-2 text-sm text-red-600 flex gap-2 items-center mb-4">
                              {errors.updateText}
                            </div>
                          ) : null}
                        </div>

                        <div>
                          <label
                            htmlFor="updateValue"
                            className="block mb-2 text-sm font-medium"
                          >
                            Amount <span className="text-red-600"> *</span>
                            <small className="text-white">
                              {' '}
                              (
                              <span className="text-red-400">
                                {' '}
                                negative-expense
                              </span>{' '}
                              ,
                              <span className="text-accent-500">
                                {' '}
                                positive-income
                              </span>
                              )
                            </small>
                          </label>

                          <Field
                            id="updateValue"
                            name="updateValue"
                            type="text"
                            placeholder={'Ex.: 2000, -1500.50...'}
                            component={AuthInput}
                            value={values.updateValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-required="true"
                            aria-invalid={!!errors.updateValue}
                            aria-describedby="updateValueEmail"
                          />

                          {errors.updateValue && touched.updateValue ? (
                            <div className="mt-2 text-sm text-red-600 flex gap-2 items-center">
                              {errors.updateValue}
                            </div>
                          ) : null}
                        </div>

                        {unableToUpdate && (
                          <SubmitFormError content="Unable to update. Please try again!" />
                        )}

                        <AuthButton
                          disabled={submitted}
                          title={
                            submitted ? 'Updating...' : 'Update Transaction'
                          }
                        />
                      </form>
                    );
                  }}
                </Formik>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </Dialog.Root>
      </td>

      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button
          onClick={handleClick}
          className="text-red-600 hover:text-red-700 focus:ring-red-600 focus:ring-2 focus:outline-none"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
