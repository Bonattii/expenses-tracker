interface AuthTitleProps {
  content: string;
}

export default function AuthTitle(props: AuthTitleProps) {
  return (
    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
      {props.content}
    </h1>
  );
}
