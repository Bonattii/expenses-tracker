import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';

import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import AuthLinkTitle from '../components/AuthLinkTitle';
import AuthParagraph from '../components/AuthParagraph';
import AuthTitle from '../components/AuthTitle';
import Label from '../components/Label';

export default function Register() {
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !registerConfirmPassword
    ) {
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords should Match');
      return;
    }

    api
      .post('/api/users/', {
        name: registerName,
        email: registerEmail,
        password: registerPassword
      })
      .then(response => {
        const data = response.data;

        if (!data) {
          alert('Unable to login. Please try again!');
        }

        setTimeout(() => {
          navigate('/login');
        }, 500);
      })
      .catch(error => {
        alert('Oops! Some error occured, please try again');
      });
  }

  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <AuthLinkTitle />

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AuthTitle content="Sign up in our platform" />

            <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="registerName" content="Your name" />
                <AuthInput
                  id="registerName"
                  placeholder="John Doe"
                  required
                  value={registerName}
                  onChange={event => setRegisterName(event.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="registerEmail" content="Your email" />
                <AuthInput
                  type="email"
                  id="registerEmail"
                  placeholder="name@company.com"
                  required
                  value={registerEmail}
                  onChange={event => setRegisterEmail(event.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="registerPassword" content="Password" />
                <AuthInput
                  type="password"
                  id="registerPassword"
                  placeholder="••••••••"
                  required
                  value={registerPassword}
                  onChange={event => setRegisterPassword(event.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" content="Confirm Password" />
                <AuthInput
                  type="password"
                  id="registerConfirmPassword"
                  placeholder="••••••••"
                  required
                  value={registerConfirmPassword}
                  onChange={event =>
                    setRegisterConfirmPassword(event.target.value)
                  }
                />
              </div>

              <AuthButton title="Sign Up" />

              <AuthParagraph
                buttonContent="Sign in"
                routePath="login"
                textContent="Already have an account?"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
