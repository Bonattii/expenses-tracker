interface SubmitFormErrorProps {
  content: string;
}

export default function SubmitFormError(props: SubmitFormErrorProps) {
  return <p className="text-red-600">{props.content}</p>;
}
