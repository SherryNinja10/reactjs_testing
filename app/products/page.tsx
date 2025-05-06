'use client';

import { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import ProductsList from '../components/ProductsList';

export default function ProductsPage() {
  const [refresh, setRefresh] = useState<number>(0);

  const handleRefresh = () => {setRefresh(prev => prev + 1)};

  return (
    <div className="p-6">
      {/* Always show the form */}
      <ProductForm addedProduct={handleRefresh} />
      <ProductsList refresh={refresh} />
    </div>
  );
}
