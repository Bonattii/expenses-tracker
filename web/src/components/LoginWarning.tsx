import { Link } from 'react-router-dom';

import AuthTitle from './AuthTitle';

export default function LoginWarning() {
  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AuthTitle content="Sorry! You need to be logged in to see this page content" />

            <Link
              to="/login"
              className="block w-full bg-secondary-500 hover:bg-accent-500 hover:text-primary-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-accent-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
