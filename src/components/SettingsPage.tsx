import { useState, useEffect, useCallback } from 'react';
import { Key, Save, CheckCircle, AlertCircle } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [wooCommerceKey, setWooCommerceKey] = useState('');
  const [wooCommerceSecret, setWooCommerceSecret] = useState('');
  const [chatwootToken, setChatwootToken] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Load saved settings from localStorage
    const savedWooCommerceKey = localStorage.getItem('wooCommerceKey') || '';
    const savedWooCommerceSecret = localStorage.getItem('wooCommerceSecret') || '';
    const savedChatwootToken = localStorage.getItem('chatwootToken') || '';

    setWooCommerceKey(savedWooCommerceKey);
    setWooCommerceSecret(savedWooCommerceSecret);
    setChatwootToken(savedChatwootToken);
  }, []);

  const handleSave = useCallback(() => {
    // Validate inputs
    if (!wooCommerceKey.trim()) {
      setErrorMessage('WooCommerce API Key is required');
      setSaveStatus('error');
      return;
    }
    if (!wooCommerceSecret.trim()) {
      setErrorMessage('WooCommerce API Secret is required');
      setSaveStatus('error');
      return;
    }
    if (!chatwootToken.trim()) {
      setErrorMessage('Chatwoot API Token is required');
      setSaveStatus('error');
      return;
    }

    try {
      // Save settings to localStorage
      localStorage.setItem('wooCommerceKey', wooCommerceKey.trim());
      localStorage.setItem('wooCommerceSecret', wooCommerceSecret.trim());
      localStorage.setItem('chatwootToken', chatwootToken.trim());

      setSaveStatus('success');
      setErrorMessage('');

      // Reset success message after 3 seconds
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setErrorMessage('Failed to save settings. Please try again.');
      setSaveStatus('error');
    }
  }, [wooCommerceKey, wooCommerceSecret, chatwootToken]);

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
            type="password"
            id="chatwootToken"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={chatwootToken}
            onChange={(e) => setChatwootToken(e.target.value)}
            placeholder="Enter your Chatwoot API token"
          />
        </div>

        {/* Status Messages */}
        {saveStatus === 'success' && (
          <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-md" role="alert">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" aria-hidden="true" />
            <span className="text-green-800">Settings saved successfully!</span>
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-md" role="alert">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" aria-hidden="true" />
            <span className="text-red-800">{errorMessage}</span>
          </div>
        )}

        <div>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            aria-label="Save API settings"
          >
            <Save className="h-5 w-5 mr-2" aria-hidden="true" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;