interface ValidationErrorProps {
  content: string;
}

export default function ValidationError(props: ValidationErrorProps) {
  return (
    <div className="mt-2 text-sm text-red-600 flex gap-2 items-center">
      {props.content}
    </div>
  );
}
