import { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  content: string;
}

export default function Label(props: LabelProps) {
  return (
    <label {...props} className="block mb-2 text-sm font-medium">
      {props.content} <span className="text-red-600">*</span>
    </label>
  );
}
