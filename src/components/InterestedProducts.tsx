import React from 'react';
import { Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface InterestedProductsProps {
  products: Product[];
}

const InterestedProducts: React.FC<InterestedProductsProps> = ({ products }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Package className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-xl font-semibold">Interested Products</h2>
      </div>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="flex items-center space-x-4">
            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestedProducts;