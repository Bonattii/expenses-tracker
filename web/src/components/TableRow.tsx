import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Label from './Label';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

interface TableRowProps {
  text: string;
  value: number;
  id: string;
  onDelete: Function;
}

export default function TableRow(props: TableRowProps) {
  const [updateText, setUpdateText] = useState('');
  const [updateValue, setUpdateValue] = useState('');

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
        <Dialog.Root>
          <Dialog.Trigger
            type="button"
            className="text-accent-500 hover:opacity-90"
          >
            Edit
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

            <Dialog.Content className="absolute p-10 mt-32 bg-primary-500 border border-accent-500 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Dialog.Close className="absolute right-6 top-6 text-gray-400 rounded-lg hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-primary-500">
                <XMarkIcon className="block h-6 w-6" />
              </Dialog.Close>

              <Dialog.Title className="text-3xl leading-tight font-bold">
                Update Transaction
              </Dialog.Title>

              <div className="mt-8">
                <Label htmlFor="updateValue" content="New Value" />
                <AuthInput
                  id="updateValue"
                  placeholder="New Value"
                  value={updateValue}
                  onChange={event => setUpdateValue(event.target.value)}
                  required
                />
              </div>

              <div className="mt-8 mb-8">
                <Label htmlFor="updateText" content="New Text" />
                <AuthInput
                  id="updateText"
                  placeholder="New Text"
                  value={updateText}
                  onChange={event => setUpdateText(event.target.value)}
                  required
                />
              </div>

              <AuthButton title="Update" />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
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
