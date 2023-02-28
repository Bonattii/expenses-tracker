import LoginWarning from '../components/LoginWarning';
import TableRow from '../components/TableRow';
import Th from '../components/Th';

export default function History() {
  const userToken = localStorage.getItem('user-token');

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
                    <TableRow text="John Doe" value={6000.55} />
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
