import { memo } from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Purchase } from '../types';

interface PreviousPurchasesProps {
  purchases: Purchase[];
}

const PreviousPurchases: React.FC<PreviousPurchasesProps> = memo(({ purchases }) => {
  if (purchases.length === 0) {
    return null;
  }

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <ShoppingCart className="h-6 w-6 text-green-500 mr-2" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Previous Purchases</h2>
      </div>
      <ul className="space-y-4" role="list">
        {purchases.map((purchase) => (
          <li
            key={purchase.id}
            className="border-b pb-4 last:border-b-0 last:pb-0"
          >
            <p className="font-semibold text-gray-900">
              Order #{purchase.id}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <time dateTime={purchase.date}>{formatDate(purchase.date)}</time>
            </p>
            <p className="text-gray-900 font-medium mt-1">
              Total: <span className="text-green-600">${purchase.total.toFixed(2)}</span>
            </p>
            {purchase.items.length > 0 && (
              <ul className="list-disc list-inside mt-2 space-y-1" role="list">
                {purchase.items.map((item, index) => (
                  <li key={`${purchase.id}-item-${index}`} className="text-sm text-gray-600">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});

PreviousPurchases.displayName = 'PreviousPurchases';

export default PreviousPurchases;