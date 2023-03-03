import AuthLinkTitle from '../components/AuthLinkTitle';
import AuthTitle from '../components/AuthTitle';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <AuthLinkTitle />

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AuthTitle content="Sign up in our platform" />

            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
