import { FormEvent, useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { api } from '../lib/axios';

import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import HistoryBox from '../components/HistoryBox';
import Label from '../components/Label';
import LoginWarning from '../components/LoginWarning';

const colors = ['#f3ef52', '#DC2626'];

export default function Dashboard() {
  const [transactionText, setTransactionText] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [balance, setBalance] = useState<number>();
  const [income, setIncome] = useState<number>();
  const [expenses, setExpenses] = useState<number>();
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

  const userToken = localStorage.getItem('user-token');

  const graphicData = [
    { text: 'Income', amount: income },
    { text: 'Expenses', amount: expenses }
  ];

  // Get all the users transactions
  useEffect(() => {
    api
      .get('/api/transactions', {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })
      .then(response => {
        setTransactions(response.data);
      });
  }, [isSubmitted]);

  // Update the balance for the first time b4 adding a new one
  useEffect(() => {
    setBalance(
      transactions?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value / 100,
        0
      )
    );

    // Filter for values > 0 and than sum
    setIncome(
      transactions
        ?.filter(transaction => transaction.value > 0)
        ?.reduce(
          (accumulator, currentValue) => accumulator + currentValue.value / 100,
          0
        )
    );

    // Filter for values < 0 and than sum
    setExpenses(
      transactions
        ?.filter(transaction => transaction.value < 0)
        ?.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.value / 100) * -1,
          0
        )
    );
  }, [transactions]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!transactionText || !transactionValue) {
      return;
    }

    api
      .post(
        '/api/transactions',
        {
          text: transactionText,
          value: Number(transactionValue) * 100 // Transform into cents
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(response => {
        if (!response) {
          alert('Unable to create transaction. Please try again!');
        }

        setTransactionText('');
        setTransactionValue('');
      });

    // Update the user balance
    setBalance(
      transactions?.reduce(
        (accumulator, currentValue) => accumulator + currentValue.value / 100,
        0
      )
    );

    // Filter for values > 0 and than sum
    setIncome(
      transactions
        ?.filter(transaction => transaction.value > 0)
        ?.reduce(
          (accumulator, currentValue) => accumulator + currentValue.value / 100,
          0
        )
    );

    // Filter for values < 0 and than sum
    setExpenses(
      transactions
        ?.filter(transaction => transaction.value < 0)
        ?.reduce(
          (accumulator, currentValue) =>
            accumulator + (currentValue.value / 100) * -1,
          0
        )
    );

    // Make the data get called again when submitted
    setIsSubmitted(true);
  }

  return (
    <>
      {userToken ? (
        <div className="bg-primary-500 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl px-6 lg:px-8 mt-24 mb-24">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xxl:col-span-4">
              <div>
                <div className="px-8 py-2">
                  <h4 className="text-lg text-gray-400 font-thin">
                    Your Balance
                  </h4>
                  <h4 className="text-2xl font-semibold">CAD$ {balance}</h4>
                </div>

                <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-2 my-2 px-6">
                  <div className="bg-accent-500 p-4 rounded-md shadow-lg w-full text-secondary-500 text-center">
                    <h1 className="text-xl font-light">INCOME</h1>
                    <h1 className="text-2xl text-primary-500 font-semibold">
                      $ {income}
                    </h1>
                  </div>

                  <div className="bg-red-600 p-4 rounded-md shadow-lg w-full text-secondary-500 text-center">
                    <h1 className="text-xl font-light">EXPENSES</h1>
                    <h1 className="text-2xl text-primary-500 font-semibold">
                      $ {expenses}
                    </h1>
                  </div>
                </div>

                <div className="px-8 my-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">History</h2>
                  </div>
                  {/* Render the last 3 transactions */}
                  {transactions?.slice(-3).map(transaction => {
                    return (
                      <HistoryBox
                        text={transaction.text}
                        value={transaction.value / 100}
                      />
                    );
                  })}
                </div>

                <div className="px-8 my-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">
                      Add new transaction
                    </h2>
                  </div>

                  <div className="bg-primary-500 border-2 border-secondary-500 p-4 rounded-md">
                    <form onSubmit={handleSubmit} className="mt-4">
                      <div className="my-5 text-sm">
                        <Label htmlFor="transactionText" content="Text" />
                        <AuthInput
                          id="transactionText"
                          autoFocus
                          placeholder="Enter Text"
                          value={transactionText}
                          onChange={event =>
                            setTransactionText(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="my-5 text-sm">
                        <label
                          htmlFor="transactionValue"
                          className="block mb-2 text-sm font-medium"
                        >
                          Amount
                          <small className="text-white">
                            {' '}
                            (
                            <span className="text-red-400">
                              {' '}
                              negative-expense
                            </span>{' '}
                            ,
                            <span className="text-accent-500">
                              {' '}
                              positive-income
                            </span>
                            )
                          </small>
                        </label>
                        <AuthInput
                          id="transactionValue"
                          autoFocus
                          placeholder="Enter Amount"
                          value={transactionValue}
                          onChange={event =>
                            setTransactionValue(event.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="my-5">
                        <AuthButton title="Add Transaction" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-8 xxl:col-span-4">
              <PieChart width={500} height={700}>
                <Pie
                  className="focus:outline-none"
                  data={graphicData}
                  dataKey="amount"
                  outerRadius={150}
                  innerRadius={100}
                  nameKey="text"
                  label
                  stroke="#27292f"
                >
                  {graphicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      ) : (
        <LoginWarning />
      )}
    </>
  );
}
