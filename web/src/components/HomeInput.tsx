import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function HomeInput(props: InputProps) {
  return (
    <input
      {...props}
      className="text-gray-300 bg-secondary-500 border-gray-300 focus:border-primary-500 w-full rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
    />
  );
}
