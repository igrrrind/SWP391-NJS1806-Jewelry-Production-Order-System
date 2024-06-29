import { useState, useEffect } from 'react';
import ProductTable from './ProductTable';
import { useAllProducts } from '@/hooks/productsHooks';

const ManageProductsPage = () => {

    const { products,loading } = useAllProducts();

    return (
        
        <main className="p-4 xl:flex flex-1 xl:space-x-4">
                <div className="flex-1">
                     <ProductTable products={products} />
                </div>
        </main>
    )
} 

export default ManageProductsPage;