import { Link } from 'react-router-dom';

interface AuthParagraphProps {
  textContent: string;
  buttonContent: string;
  routePath: string;
}

export default function AuthParagraph(props: AuthParagraphProps) {
  return (
    <p className="text-sm font-light">
      {props.textContent}{' '}
      <Link
        to={`/${props.routePath}`}
        className="font-medium text-primary-600 hover:underline text-accent-500 focus:ring-accent-500 focus:ring-2 focus:outline-none"
      >
        {props.buttonContent}
      </Link>
    </p>
  );
}
