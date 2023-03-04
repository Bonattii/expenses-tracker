import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

import LoginWarning from '../components/LoginWarning';
import TableRow from '../components/TableRow';
import Th from '../components/Th';

export default function History() {
  const [transactions, setTransactions] = useState<
    [
      {
        text: string;
        value: number;
        id: string;
        createdAt: string;
        updatedAt: string;
      }
    ]
  >();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const userToken = localStorage.getItem('user-token');

  useEffect(() => {
    api
      .get('/api/transactions', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(response => {
        setTransactions(response.data);
        setIsDeleted(false);
      });
  }, [isDeleted || isUpdated]);

  async function updateTransaction() {
    setIsUpdated(!isUpdated);
  }

  async function deleteTransaction(id: string) {
    api
      .delete('/api/transactions', {
        data: {
          id
        },
        headers: { Authorization: `Bearer ${userToken}` }
      })
      .then(() => setIsDeleted(true));
  }

  return (
    <>
      {userToken ? (
        <div className="flex flex-col mx-auto max-w-2xl md:max-w-2xl lg:max-w-7xl px-6 lg:px-8 mt-12 mb-12">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-secondary-500">
                    <tr>
                      <Th text="Text" side="left" />
                      <Th text="Value" side="left" />
                      <Th text="Edit" side="right" />
                      <Th text="Delete" side="right" />
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {transactions?.map(transaction => (
                      <TableRow
                        key={transaction.id}
                        text={transaction.text}
                        value={transaction.value / 100}
                        id={transaction.id}
                        onDelete={deleteTransaction}
                        onUpdate={updateTransaction}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoginWarning />
      )}
    </>
  );
}
