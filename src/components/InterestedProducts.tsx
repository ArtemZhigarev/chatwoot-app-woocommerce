import { memo } from 'react';
import { Package } from 'lucide-react';
import type { Product } from '../types';

interface InterestedProductsProps {
  products: Product[];
}

const InterestedProducts: React.FC<InterestedProductsProps> = memo(({ products }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Package className="h-6 w-6 text-blue-500 mr-2" aria-hidden="true" />
        <h2 className="text-xl font-semibold">Interested Products</h2>
      </div>
      <ul className="space-y-4" role="list">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
            <img
              src={product.image}
              alt={`${product.name} product image`}
              className="w-16 h-16 object-cover rounded shadow-sm"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect width="64" height="64" fill="%23e5e7eb"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-family="sans-serif" font-size="12"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{product.name}</p>
              <p className="text-gray-600 font-medium">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

InterestedProducts.displayName = 'InterestedProducts';

export default InterestedProducts;