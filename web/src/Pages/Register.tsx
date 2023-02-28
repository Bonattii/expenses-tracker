import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import AuthLinkTitle from '../components/AuthLinkTitle';
import AuthParagraph from '../components/AuthParagraph';
import AuthTitle from '../components/AuthTitle';
import Label from '../components/Label';

export default function Register() {
  return (
    <section className="bg-primary-500">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
        <AuthLinkTitle />

        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <AuthTitle content="Sign up in our platform" />

            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <Label htmlFor="registerName" content="Your name" />
                <AuthInput
                  name="registerName"
                  id="registerName"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <Label htmlFor="registerEmail" content="Your email" />
                <AuthInput
                  type="email"
                  name="registerEmail"
                  id="registerEmail"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="registerPassword" content="Password" />
                <AuthInput
                  type="password"
                  name="registerPassword"
                  id="registerPassword"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" content="Confirm Password" />
                <AuthInput
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
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
