interface AuthErrorProps {
  content: string;
}

export default function AuthError(props: AuthErrorProps) {
  return <p className="text-red-600">{props.content}</p>;
}
