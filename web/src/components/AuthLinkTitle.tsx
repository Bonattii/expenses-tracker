import { Link } from 'react-router-dom';

import logo from '../assets/etracker.svg';

export default function AuthLinkTitle() {
  return (
    <Link
      to="/"
      className="flex items-center mb-6 text-2xl font-semibold text-white focus:ring-accent-500 focus:ring-2 focus:outline-none"
    >
      <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
      Expenses Tracker
    </Link>
  );
}
