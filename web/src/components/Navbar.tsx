import { Link, useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';

import './Navbar.css';

import logo from '../assets/etracker.svg';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'About', href: '#about', current: false },
  { name: 'Contact', href: '#contact', current: false }
];

const loggedNavigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'History', href: '/history', current: false }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(!localStorage.getItem('user-token'));

  useEffect(() => {
    setIsLogged(!localStorage.getItem('user-token'));
  }, [location.pathname]);

  function handleLogout() {
    localStorage.removeItem('user-token');
    setIsLogged(true);
    navigate('/');
  }

  return (
    <Disclosure as="nav" className="bg-primary-500">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-2xl md:max-w-2xl lg:max-w-7xl px-6 lg:px-8 mt-4">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-secondary-500 hover:text-gray-300">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link
                    to="/"
                    className="focus:ring-accent-500 focus:ring-2 focus:outline-none"
                  >
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={logo}
                      alt="Logo"
                    />
                  </Link>

                  <Link
                    to="/"
                    className="flex items-center justify-center gap-3 focus:ring-accent-500 focus:ring-2 focus:outline-none"
                  >
                    <img
                      className="hidden h-8 w-auto lg:block hover:cursor-pointer"
                      src={logo}
                      alt="Logo"
                    />

                    <span className="logo-name hidden lg:block text-gray-200 font-bold text-2xl hover:cursor-pointer">
                      Expenses Tracker
                    </span>
                  </Link>
                </div>

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isLogged
                      ? navigation.map(item => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-accent-500 text-primary-500'
                                : 'text-gray-300 hover:bg-secondary-500 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium focus:ring-accent-500 focus:ring-2 focus:outline-none'
                            )}
                          >
                            {item.name}
                          </a>
                        ))
                      : loggedNavigation.map(item => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              isActive
                                ? 'bg-accent-500 text-primary-500 px-3 py-2 rounded-md text-sm font-medium focus:ring-accent-500 focus:ring-2 focus:outline-none'
                                : 'text-gray-300 hover:bg-secondary-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:ring-accent-500 focus:ring-2 focus:outline-none'
                            }
                          >
                            {item.name}
                          </NavLink>
                        ))}
                  </div>
                </div>
              </div>

              {!isLogged ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-primary-500 text-sm focus:ring-accent-500 focus:ring-2 focus:outline-none">
                        <span className="sr-only">Open user menu</span>
                        <UserIcon
                          className="block h-6 w-6"
                          color="#f3ef52"
                          fill="#141518"
                          aria-label="click to sign out"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-secondary-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:ring-accent-500 focus:ring-2 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active
                                  ? 'bg-secondary-500 hover:text-accent-500'
                                  : '',
                                'block px-4 py-2 text-sm text-gray-300'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/register"
                    className="bg-accent-500 text-primary-500 px-2 py-2 rounded-md text-sm font-medium hover:opacity-90 border-2 border-accent-500 focus:ring-accent-500 focus:ring-2 focus:outline-none"
                  >
                    Sign Up
                  </Link>

                  <Link
                    to="/login"
                    className="bg-primary-500 text-gray-200 px-2 py-2 rounded-md text-sm font-medium border-2 border-accent-500 hidden lg:block hover:bg-secondary-500 focus:ring-accent-500 focus:ring-2 focus:outline-none"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {isLogged
                ? navigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-accent-500 text-primary-500'
                          : 'text-gray-300 hover:bg-secondary-500 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium focus:ring-accent-500 focus:ring-2 focus:outline-none'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))
                : loggedNavigation.map(item => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-accent-500 text-primary-500'
                          : 'text-gray-300 hover:bg-secondary-500 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium focus:ring-accent-500 focus:ring-2 focus:outline-none'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
