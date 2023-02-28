import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className="text-gray-300 bg-secondary-500 border-gray-300 focus:border-accent-500 w-full resize-none rounded border py-3 px-[14px] text-base outline-none focus-visible:shadow-none"
    />
  );
}
