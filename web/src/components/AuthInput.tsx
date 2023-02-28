import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function AuthInput(props: InputProps) {
  return (
    <input
      {...props}
      className="border border-secondary-500 sm:text-sm rounded-lg block w-full p-2.5 bg-secondary-500 placeholder-gray-400 focus:ring-accent-500 focus:ring-4 focus:outline-none"
    />
  );
}
