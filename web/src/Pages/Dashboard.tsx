import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell } from 'recharts';

import AuthButton from '../components/AuthButton';
import AuthInput from '../components/AuthInput';
import AuthTitle from '../components/AuthTitle';
import HistoryBox from '../components/HistoryBox';
import Label from '../components/Label';

const data = [
  { text: 'Salary', amount: 2000 },
  { text: 'Rent', amount: 1600 }
];

const colors = ['#f3ef52', '#DC2626'];

export default function Dashboard() {
  const userToken = localStorage.getItem('user-token');

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
                  <h4 className="text-2xl font-semibold">CAD$ 430.00</h4>
                </div>

                <div className="flex space-x-0 flex-col lg:flex-row lg:space-x-2 my-2 px-6">
                  <div className="bg-accent-500 p-4 rounded-md shadow-lg w-full text-secondary-500 text-center">
                    <h1 className="text-xl font-light">INCOME</h1>
                    <h1 className="text-2xl text-primary-500 font-semibold">
                      $ 6000.00
                    </h1>
                  </div>

                  <div className="bg-red-600 p-4 rounded-md shadow-lg w-full text-secondary-500 text-center">
                    <h1 className="text-xl font-light">EXPENSE</h1>
                    <h1 className="text-2xl text-primary-500 font-semibold">
                      $ 170.00
                    </h1>
                  </div>
                </div>

                <div className="px-8 my-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">History</h2>
                  </div>

                  {/* Change for a map with the api data */}
                  <HistoryBox text="My wallet" value={400} />
                  <HistoryBox text="My wallet" value={-400} />
                  <HistoryBox text="My wallet" value={400} />
                </div>

                <div className="px-8 my-6">
                  <div className="my-4 border-b w-full">
                    <h2 className="font-semibold text-lg">
                      Add new transaction
                    </h2>
                  </div>

                  <div className="bg-primary-500 border-2 border-secondary-500 p-4 rounded-md">
                    <form className="mt-4">
                      <div className="my-5 text-sm">
                        <Label htmlFor="text" content="Text" />
                        <AuthInput
                          name="text"
                          id="text"
                          autoFocus
                          placeholder="Enter Text"
                        />
                      </div>

                      <div className="my-5 text-sm">
                        <label
                          htmlFor="amount"
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
                          name="amount"
                          id="amount"
                          autoFocus
                          placeholder="Enter Amount"
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
                  data={data}
                  dataKey="amount"
                  outerRadius={150}
                  innerRadius={100}
                  nameKey="text"
                  label
                  stroke="#27292f"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-primary-500">
          <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-primary-500 border-secondary-500">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <AuthTitle content="Sorry! You need to be logged in to see this page content" />

                <Link
                  to="/login"
                  className="block w-full bg-secondary-500 hover:bg-accent-500 hover:text-primary-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-accent-500"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
