interface TableRowProps {
  text: string;
  value: number;
  id: string;
  onDelete: Function;
}

export default function TableRow(props: TableRowProps) {
  async function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <tr>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.text}
      </td>
      <td className="px-6 py-4 text-sm text-white whitespace-nowrap">
        {props.value}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button className="text-accent-500 hover:opacity-90">Edit</button>
      </td>
      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
        <button
          onClick={handleClick}
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
