import clsx from 'clsx';

interface HistoryBox {
  text: string;
  value: number;
}

export default function HistoryBox(props: HistoryBox) {
  return (
    <div
      className={clsx(
        'ml-6 relative bg-secondary-500 p-4 border-r-8 shadow-md my-4 flex justify-between',
        {
          'border-accent-500': props.value > 0,
          'border-red-600': props.value < 0
        }
      )}
    >
      <div className="absolute -left-6">
        <div className="cursor-pointer bg-red-600 p-2 w-6 flex items-center text-xs text-white justify-center mt-[-7px]">
          x
        </div>
      </div>
      <div>
        <p>{props.text}</p>
      </div>
      <div>
        <p>{props.value}</p>
      </div>
    </div>
  );
}
