'use client';

import { useEffect, useState } from 'react';
import ProductDeleteButton from './ProductDeleteButton';

interface Product {
    _id?: string;
    name: string;
    price: number;
    category: string;
    stock: number;
}

interface prop {
    refresh: number;
}

export default function ProductsList({ refresh }: prop) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                console.error('Error fetching data: ', err);
            } finally {
                setLoading(false);
            }

        }

        fetchProducts();
    }, [refresh, refreshKey]);

    console.log(products);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Product List</h1>

            {/* Show loading or product list */}
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <li
                            key={index}
                            className="border border-gray-200 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow duration-300 relative"
                        >
                            {/* Top-right delete button */}
                            <div className="absolute top-2 right-2">
                                <ProductDeleteButton id={product._id} onDelete={() => setRefreshKey((prev) => prev + 1)} />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-700 mb-2">{product.name}</h2>
                            <p className="text-gray-600">
                                <strong className="font-medium text-gray-800">Price:</strong> ${product.price}
                            </p>
                            <p className="text-gray-600">
                                <strong className="font-medium text-gray-800">Category:</strong> {product.category}
                            </p>
                            <p className="text-gray-600">
                                <strong className="font-medium text-gray-800">Stock:</strong> {product.stock}
                            </p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}