interface AuthButtonProps {
  title: string;
}

export default function AuthButton(props: AuthButtonProps) {
  return (
    <button
      type="submit"
      className="w-full bg-secondary-500 hover:bg-accent-500 hover:text-primary-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-accent-500"
    >
      {props.title}
    </button>
  );
}
