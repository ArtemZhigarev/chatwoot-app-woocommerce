import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings } from 'lucide-react';
import ClientInfo from './components/ClientInfo';
import InterestedProducts from './components/InterestedProducts';
import PreviousPurchases from './components/PreviousPurchases';
import SettingsPage from './components/SettingsPage';
import { fetchUserInfo } from './api';

function App() {
  const [clientInfo, setClientInfo] = useState(null);
  const [interestedProducts, setInterestedProducts] = useState([]);
  const [previousPurchases, setPreviousPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { client, interestedProducts, previousPurchases } = await fetchUserInfo();
        setClientInfo(client);
        setInterestedProducts(interestedProducts);
        setPreviousPurchases(previousPurchases);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-blue-500 mr-4" />
            <h1 className="text-3xl font-bold text-gray-900">Chatwoot Dashboard</h1>
          </div>
          <nav>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`mr-4 ${currentPage === 'dashboard' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('settings')}
              className={`flex items-center ${currentPage === 'settings' ? 'text-blue-500' : 'text-gray-500'}`}
            >
              <Settings className="h-5 w-5 mr-1" />
              Settings
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentPage === 'dashboard' ? (
          isLoading ? (
            <div className="text-center py-4">Loading user information...</div>
          ) : clientInfo ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <ClientInfo client={clientInfo} />
              </div>
              <div className="lg:col-span-2">
                <InterestedProducts products={interestedProducts} />
              </div>
              <div>
                <PreviousPurchases purchases={previousPurchases} />
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">No user information available.</div>
          )
        ) : (
          <SettingsPage />
        )}
      </main>
    </div>
  );
}

export default App;