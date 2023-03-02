import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';
import { useNavigate } from 'react-router-dom';

import AuthInput from '../components/AuthInput';
import Label from '../components/Label';
import AuthButton from '../components/AuthButton';
import AuthLinkTitle from '../components/AuthLinkTitle';
import AuthTitle from '../components/AuthTitle';
import AuthParagraph from '../components/AuthParagraph';
import AuthError from '../components/AuthError';

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [enableToLogin, setEnableToLogin] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setButtonDisabled(true);

    if (!loginEmail || !loginPassword) {
      return;
    }

    api
      .post('/api/users/login', {
        email: loginEmail,
        password: loginPassword
      })
      .then(response => {
        const token = response.data.accesToken;

        if (!token) {
          setEnableToLogin(true);
          setButtonDisabled(false);
        }

        // Store the user token on the local storage of the browser
        localStorage.clear();
        localStorage.setItem('user-token', token);

        setTimeout(() => {
          navigate('/dashboard');
          setButtonDisabled(false);
        }, 500);
      })
      .catch(error => {
        setEnableToLogin(true);
        setButtonDisabled(false);
      });

    setEnableToLogin(false);
  }

  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <AuthLinkTitle />

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AuthTitle content="Sign in to your account" />

            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <div>
                <Label htmlFor="loginEmail" content="Your email" />
                <AuthInput
                  type="email"
                  id="loginEmail"
                  placeholder="name@company.com"
                  value={loginEmail}
                  onChange={event => setLoginEmail(event.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div>
                <Label htmlFor="loginPassword" content="Password" />
                <AuthInput
                  type="password"
                  id="loginPassword"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={event => setLoginPassword(event.target.value)}
                  required
                  autoComplete="off"
                />
              </div>

              {enableToLogin && (
                <AuthError content="Invalid email or password!" />
              )}

              <AuthButton
                disabled={buttonDisabled}
                title={buttonDisabled ? 'Authenticating...' : 'Sign In'}
              />

              <AuthParagraph
                buttonContent="Sign up"
                routePath="register"
                textContent="Don't have an account yet?"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
