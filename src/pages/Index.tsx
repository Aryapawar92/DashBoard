
import Dashboard from "../components/Dashboard/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h1 className="text-lg font-medium">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-2">
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 3 days</option>
              <option>Last 7 days</option>
              <option>Last 14 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>
      </header>
      <Dashboard />
    </div>
  );
};

export default Index;
