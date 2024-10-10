import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface Purchase {
  id: number;
  date: string;
  total: number;
  items: string[];
}

interface PreviousPurchasesProps {
  purchases: Purchase[];
}

const PreviousPurchases: React.FC<PreviousPurchasesProps> = ({ purchases }) => {
  if (purchases.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <ShoppingCart className="h-6 w-6 text-green-500 mr-2" />
        <h2 className="text-xl font-semibold">Previous Purchases</h2>
      </div>
      <ul className="space-y-4">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="border-b pb-4 last:border-b-0">
            <p className="font-semibold">Order #{purchase.id}</p>
            <p className="text-gray-600">{purchase.date}</p>
            <p className="text-gray-800">Total: ${purchase.total.toFixed(2)}</p>
            <ul className="list-disc list-inside mt-2">
              {purchase.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600">{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousPurchases;