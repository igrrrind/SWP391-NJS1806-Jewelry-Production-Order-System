import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChartComponent } from './AreaChartComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { fetchImageUrl } from '@/utils/fetchImageUrl';
import FirebaseImage from '@/components/custom/fire-base-image';
import { TrendingUp } from 'lucide-react';


export const TopSales = ({topSalesProducts}) => {
    const sortedTopSalesProducts = [...topSalesProducts].sort((a, b) => b.quantitySold - a.quantitySold);

    return (
    <Card className="h-full hover:border-green-900 transition duration-500 hover:shadow-lg">
      <CardHeader>
        <div className='flex justify-between items-center'>
            <CardTitle>Top Product Sales</CardTitle>
            <TrendingUp/>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid grid-col-1 gap-y-2'>
        {sortedTopSalesProducts &&
            sortedTopSalesProducts.map(product => (
            <div key={product.productId} className='flex justify-between items-center'>
                <div className='flex space-x-2 '>
                    <div className="w-12 h-12 bg-slate-500 rounded-lg overflow-clip border-muted border"><FirebaseImage path={`products/thumbnails/${product.productId}`} alt={product.productName}/></div>
                    <div>
                        <p className='font-medium'>{product.productName}</p>
                        <p className='text-sm text-muted-foreground'>ID {product.productId}</p>   
                    </div>
                </div>
                <p>{product.quantitySold} Products</p>

            </div>  
        ))}
        </div>
      </CardContent>
    </Card>
    )
};