import { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { send } from '@emailjs/browser';

import Label from './Label';
import SubmitFormError from './SubmitFormError';
import ValidationError from './ValidationError';
import HomeInput from './HomeInput';
import Textarea from './Textarea';

export default function ContactForm() {
  const [unableToSendMessage, setUnableToSendMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceId = import.meta.env.VITE_SERVICE_ID;
  const templateId = import.meta.env.VITE_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_USER_ID;

  async function handleSubmit(values: {
    contactEmail: string;
    contactName: string;
    contactPhone: string;
    contactMessage: string;
  }) {
    setSubmitted(true);

    if (
      !values.contactEmail ||
      !values.contactName ||
      !values.contactMessage ||
      !values.contactPhone
    ) {
      return;
    }

    try {
      send(
        serviceId,
        templateId,
        {
          contactName: values.contactName,
          contactEmail: values.contactEmail,
          contactPhone: values.contactPhone,
          contactMessage: values.contactMessage
        },
        publicKey
      )
        .then(response => {
          setSentMessage(true);
          setUnableToSendMessage(false);
          setSubmitted(false);
        })
        .catch(err => {
          setUnableToSendMessage(true);
          setSubmitted(false);
        });
    } catch (error) {
      setUnableToSendMessage(true);
      setSubmitted(false);
    }

    setTimeout(() => setSentMessage(false), 500);
    setUnableToSendMessage(false);
  }

  const yupValidationSchema = {
    contactEmail: Yup.string()
      .email('Invalid Email')
      .required('Email is required'),
    contactName: Yup.string().required('Name is required'),
    contactPhone: Yup.string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid'
      )
      .required('Phone is required'),
    contactMessage: Yup.string()
      .min(20, 'Message should have at least 20 characters')
      .required('Message is required')
  };

  return (
    <>
      <Formik
        initialValues={{
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          contactMessage: ''
        }}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
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
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <Label content="Name" htmlFor="contactName" />

                <Field
                  id="contactName"
                  name="contactName"
                  type="text"
                  placeholder={'John Doe'}
                  component={HomeInput}
                  value={values.contactName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.contactName}
                  aria-describedby="contactNameError"
                />

                {errors.contactName && touched.contactName ? (
                  <ValidationError content={errors.contactName} />
                ) : null}
              </div>

              <div>
                <Label content="Email" htmlFor="contactEmail" />

                <Field
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder={'contact@contact.com'}
                  component={HomeInput}
                  value={values.contactEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.contactEmail}
                  aria-describedby="contactEmailError"
                />

                {errors.contactEmail && touched.contactEmail ? (
                  <ValidationError content={errors.contactEmail} />
                ) : null}
              </div>

              <div>
                <Label content="Phone" htmlFor="contactPhone" />

                <Field
                  id="contactPhone"
                  name="contactPhone"
                  type="text"
                  placeholder={'(123) 456-7890'}
                  component={HomeInput}
                  value={values.contactPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.contactPhone}
                  aria-describedby="contactPhoneError"
                />

                {errors.contactPhone && touched.contactPhone ? (
                  <ValidationError content={errors.contactPhone} />
                ) : null}
              </div>

              <div>
                <Label content="Message" htmlFor="contactMessage" />

                <Field
                  id="contactMessage"
                  name="contactMessage"
                  type="text"
                  placeholder={'Type your message here...'}
                  component={Textarea}
                  value={values.contactMessage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-required="true"
                  aria-invalid={!!errors.contactMessage}
                  aria-describedby="contactMessageError"
                />

                {errors.contactMessage && touched.contactMessage ? (
                  <ValidationError content={errors.contactMessage} />
                ) : null}
              </div>

              {unableToSendMessage && (
                <SubmitFormError content="Impossible to send message, please try again!" />
              )}

              {sentMessage && <p className="text-accent-500">Message sent!</p>}

              <div>
                <button
                  type="submit"
                  disabled={submitted}
                  className="bg-primary border-primary w-full rounded border p-3 text-white transition bg-secondary-500 hover:opacity-70 focus:ring-accent-500 focus:ring-4 focus:outline-none"
                >
                  {submitted ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </>
  );
}
