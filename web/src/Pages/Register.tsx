import { Link } from 'react-router-dom';

import logo from '../assets/etracker.svg';

export default function Register() {
  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          Expenses Tracker
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Sign up in our platform
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Your name
                </label>
                <input
                  name="name"
                  id="name"
                  className="border border-secondary-500 sm:text-sm rounded-lg block w-full p-2.5 bg-secondary-500 placeholder-gray-400 focus:ring-accent-500 focus:ring-4 focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-secondary-500 sm:text-sm rounded-lg block w-full p-2.5 bg-secondary-500 placeholder-gray-400 focus:ring-accent-500 focus:ring-4 focus:outline-none"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border border-secondary-500 sm:text-sm rounded-lg block w-full p-2.5 bg-secondary-500 placeholder-gray-400 focus:ring-accent-500 focus:ring-4 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="border border-secondary-500 sm:text-sm rounded-lg block w-full p-2.5 bg-secondary-500 placeholder-gray-400 focus:ring-accent-500 focus:ring-4 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary-500 hover:bg-accent-500 hover:text-primary-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-accent-500"
              >
                Sign Up
              </button>

              <p className="text-sm font-light">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline text-accent-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
