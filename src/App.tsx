import { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Settings, AlertCircle } from 'lucide-react';
import ClientInfo from './components/ClientInfo';
import InterestedProducts from './components/InterestedProducts';
import PreviousPurchases from './components/PreviousPurchases';
import SettingsPage from './components/SettingsPage';
import { fetchUserInfo } from './api';
import type { ClientInfo as ClientInfoType, Product, Purchase } from './types';

type PageType = 'dashboard' | 'settings';

function App() {
  const [clientInfo, setClientInfo] = useState<ClientInfoType | null>(null);
  const [interestedProducts, setInterestedProducts] = useState<Product[]>([]);
  const [previousPurchases, setPreviousPurchases] = useState<Purchase[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { client, interestedProducts, previousPurchases } = await fetchUserInfo();
        setClientInfo(client);
        setInterestedProducts(interestedProducts);
        setPreviousPurchases(previousPurchases);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user information';
        setError(errorMessage);
        console.error('Error fetching user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentPage === 'dashboard') {
      fetchData();
    }
  }, [currentPage]);

  const handlePageChange = useCallback((page: PageType) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-blue-500 mr-4" />
            <h1 className="text-3xl font-bold text-gray-900">Chatwoot Dashboard</h1>
          </div>
          <nav role="navigation" aria-label="Main navigation">
            <button
              onClick={() => handlePageChange('dashboard')}
              className={`mr-4 px-3 py-2 rounded-md transition-colors ${
                currentPage === 'dashboard'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-label="Go to Dashboard"
              aria-current={currentPage === 'dashboard' ? 'page' : undefined}
            >
              Dashboard
            </button>
            <button
              onClick={() => handlePageChange('settings')}
              className={`inline-flex items-center px-3 py-2 rounded-md transition-colors ${
                currentPage === 'settings'
                  ? 'text-blue-600 bg-blue-50 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              aria-label="Go to Settings"
              aria-current={currentPage === 'settings' ? 'page' : undefined}
            >
              <Settings className="h-5 w-5 mr-1" aria-hidden="true" />
              Settings
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" role="main">
        {currentPage === 'dashboard' ? (
          <>
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="text-sm font-semibold text-red-800 mb-1">Error Loading Data</h3>
                    <p className="text-sm text-red-700">{error}</p>
                    {error.includes('API keys not configured') && (
                      <button
                        onClick={() => handlePageChange('settings')}
                        className="mt-3 text-sm font-medium text-red-800 underline hover:text-red-900"
                      >
                        Configure API Settings
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
            {isLoading ? (
              <div className="text-center py-12" role="status">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-600">Loading user information...</p>
              </div>
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
            ) : !error ? (
              <div className="text-center py-12 bg-white rounded-lg shadow">
                <p className="text-gray-500">No user information available.</p>
              </div>
            ) : null}
          </>
        ) : (
          <SettingsPage />
        )}
      </main>
    </div>
  );
}

export default App;