import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { text: 'Salary', amount: 2000 },
  { text: 'Rent', amount: 1600 }
];

const colors = ['#f3ef52', '#DC2626'];

export default function Dashboard() {
  return (
    <div className="bg-primary-500 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl px-6 lg:px-8 mt-24 mb-24">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xxl:col-span-4">
          <div>
            <div className="px-8 py-2">
              <h4 className="text-lg text-gray-400 font-thin">Your Balance</h4>
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

              <div className="ml-6 relative bg-secondary-500 p-4 border-r-8 shadow-md my-4 flex justify-between border-accent-500">
                <div className="absolute -left-6">
                  <div className="cursor-pointer bg-red-600 p-2 w-6 flex items-center text-xs text-white justify-center mt-[-7px]">
                    x
                  </div>
                </div>
                <div>
                  <p>My wallet</p>
                </div>
                <div>
                  <p>$ +400</p>
                </div>
              </div>

              <div className="ml-6 relative bg-secondary-500 p-4 border-r-8 shadow-md my-4 flex justify-between border-red-600">
                <div className="absolute -left-6">
                  <div className="cursor-pointer bg-red-600 p-2 w-6 flex items-center text-xs text-white justify-center mt-[-7px]">
                    x
                  </div>
                </div>
                <div>
                  <p>My wallet</p>
                </div>
                <div>
                  <p>$ -400</p>
                </div>
              </div>

              <div className="ml-6 relative bg-secondary-500 p-4 border-r-8 shadow-md my-4 flex justify-between border-accent-500">
                <div className="absolute -left-6">
                  <div className="cursor-pointer bg-red-600 p-2 w-6 flex items-center text-xs text-white justify-center mt-[-7px]">
                    x
                  </div>
                </div>
                <div>
                  <p>My wallet</p>
                </div>
                <div>
                  <p>$ +400</p>
                </div>
              </div>
            </div>

            <div className="px-8 my-6">
              <div className="my-4 border-b w-full">
                <h2 className="font-semibold text-lg">Add new transaction</h2>
              </div>

              <div className="bg-primary-500 border-2 border-secondary-500 p-4 rounded-md">
                <form className="mt-4">
                  <div className="my-5 text-sm">
                    <label htmlFor="text" className="block text-white">
                      Text
                    </label>
                    <input
                      name="text"
                      id="text"
                      autoFocus
                      className="rounded-sm px-4 py-3 mt-1 focus:ring-accent-500 focus:ring-4 focus:outline-none bg-secondary-500 w-full"
                      placeholder="Enter Text"
                    />
                  </div>

                  <div className="my-5 text-sm">
                    <label htmlFor="amount" className="block text-white">
                      Amount
                      <small className="text-white">
                        {' '}
                        (<span className="text-red-400">
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
                    <input
                      name="amount"
                      id="amount"
                      autoFocus
                      className="rounded-sm px-4 py-3 mt-1 focus:ring-accent-500 focus:ring-4 focus:outline-none bg-secondary-500 w-full"
                      placeholder="Enter Amount"
                    />
                  </div>

                  <div className="my-5">
                    <button className="rounded-sm block text-center text-white bg-secondary-500 p-3 duration-300 hover:bg-accent-500 hover:text-primary-500 w-full focus:ring-accent-500 focus:ring-4 focus:outline-none">
                      Add Transaction
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-8 xxl:col-span-4">
          <PieChart width={500} height={700}>
            <Pie
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
  );
}
