interface TableRowProps {
  text: string;
  value: number;
}

export default function TableRow(props: TableRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.text}
      </td>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.value}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <a className="text-accent-500 hover:opacity-90" href="#">
          Edit
        </a>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <a className="text-red-600 hover:text-red-700" href="#">
          Delete
        </a>
      </td>
    </tr>
  );
}
