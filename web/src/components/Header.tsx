import { Link } from 'react-router-dom';

import headerImg from '../assets/header.png';

export default function Header() {
  return (
    <section id="header" className="bg-primary-500">
      <div className="grid max-w-2xl md:max-w-2xl lg:max-w-7xl px-6 lg:px-8 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mx-auto max-w-2xl lg:mx-0 place-self-center lg:col-span-7">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
            Take control of your finances again
          </h1>
          <p className="mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Everyone is using Expenses Tracker to manage their own finances, why
            you don't join them in this beautiful platform?
          </p>

          <Link
            to="/register"
            className="inline-flex items-center justify-center pr-5 py-3 mr-3 text-base font-medium text-center text-white hover:text-accent-500 focus:ring-accent-500 focus:ring-2 focus:outline-none"
          >
            Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <div className="mt-12 lg:mt-0 lg:col-span-5 lg:flex hidden md:block">
          <img src={headerImg} alt="Smartphone" />
        </div>
      </div>
    </section>
  );
}
