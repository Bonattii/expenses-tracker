import clsx from 'clsx';

interface ThProps {
  text: string;
  side: string;
}

export default function Th(props: ThProps) {
  return (
    <th
      scope="col"
      className={clsx(
        'px-6 py-3 text-xs font-bold text-left text-white uppercase',
        {
          'text-left': props.side === 'left',
          'text-right': props.side === 'right'
        }
      )}
    >
      {props.text}
    </th>
  );
}
