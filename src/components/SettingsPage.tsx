import React, { useState, useEffect } from 'react';
import { Key, Save } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [wooCommerceKey, setWooCommerceKey] = useState('');
  const [wooCommerceSecret, setWooCommerceSecret] = useState('');
  const [chatwootToken, setChatwootToken] = useState('');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedWooCommerceKey = localStorage.getItem('wooCommerceKey') || '';
    const savedWooCommerceSecret = localStorage.getItem('wooCommerceSecret') || '';
    const savedChatwootToken = localStorage.getItem('chatwootToken') || '';

    setWooCommerceKey(savedWooCommerceKey);
    setWooCommerceSecret(savedWooCommerceSecret);
    setChatwootToken(savedChatwootToken);
  }, []);

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('wooCommerceKey', wooCommerceKey);
    localStorage.setItem('wooCommerceSecret', wooCommerceSecret);
    localStorage.setItem('chatwootToken', chatwootToken);

    alert('Settings saved successfully!');
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <Key className="h-6 w-6 text-blue-500 mr-2" />
        API Settings
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="wooCommerceKey" className="block text-sm font-medium text-gray-700">
            WooCommerce API Key
          </label>
          <input
            type="text"
            id="wooCommerceKey"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={wooCommerceKey}
            onChange={(e) => setWooCommerceKey(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="wooCommerceSecret" className="block text-sm font-medium text-gray-700">
            WooCommerce API Secret
          </label>
          <input
            type="password"
            id="wooCommerceSecret"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={wooCommerceSecret}
            onChange={(e) => setWooCommerceSecret(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="chatwootToken" className="block text-sm font-medium text-gray-700">
            Chatwoot API Token
          </label>
          <input
            type="text"
            id="chatwootToken"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={chatwootToken}
            onChange={(e) => setChatwootToken(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;