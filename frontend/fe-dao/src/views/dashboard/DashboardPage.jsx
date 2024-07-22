import React, { useEffect, useState } from 'react';
import {
    useTransactionTotalMoney,
    useTransactionTotalMoneyForEachMonth,
    useTopSaleProduct,
    useCountByProductionStatusId,
    useCountByIsShipping,
    useTotalMoneyForEachMonth,
    useOrderCountByStatus,
    useOrderCountByTimePeriod,
    useTotalMoneyByYear
} from '../../hooks/dashboardHooks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChartComponent } from './AreaChartComponent';
import { Select } from '@/components/ui/select';
import { SelectTrigger } from '@radix-ui/react-select';
import { StatCard } from './StatCard';
import { formatPrice } from '@/utils/formatPrice';
import { DollarSign, PackageCheckIcon } from 'lucide-react';
import { faMoneyBill1 } from '@fortawesome/free-solid-svg-icons';
import { TopSales } from './TopSales';



const selectionOptions = ["Today","This Week","This Month","All Time"]


const DashboardPage = () => {

    const today = new Date()
    const todayString = today.toISOString().slice(0,10)


    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(today.getDate() - 7);
    const thisWeek = oneWeekAgo.toISOString().slice(0, 10);

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);
    const thisMonth = oneMonthAgo.toISOString().slice(0, 10);

    oneMonthAgo.setMonth(today.getMonth() - 2);
    const lastMonth = oneMonthAgo.toISOString().slice(0, 10);



    const [dateBegin, setDateBegin] = useState(todayString);
    const [dateEnd, setDateEnd] = useState(todayString);

    const [dateBeginOrder, setDateBeginOrder] = useState(todayString);
    const [dateEndOrder, setDateEndOrder] = useState(todayString);

    const [year, setYear] = useState(todayString);
    const [pageSize, setPageSize] = useState(5);
    const [isShipping, setIsShipping] = useState(true);
    const [productionStatusId, setProductionStatusId] = useState(1)

    const [orderBySelection, setOrderBySelection] = useState(selectionOptions[0])

    useEffect(() => {
      switch(orderBySelection){
        case "Today" : 
          setDateBeginOrder(todayString)
          break;
        case "This Week" : 
          setDateBeginOrder(thisWeek)
          break;
        case "This Month" : 
          setDateBeginOrder(thisMonth)
          break;
        case "All Time" : 
          setDateBeginOrder("1900-01-01")    
          break;          
      }
  },[orderBySelection])

    

    const [salesBySelection, setSalesBySelection] = useState(selectionOptions[0])

    useEffect(() => {
        switch(salesBySelection){
          case "Today" : 
            setDateBegin(todayString)
            break;
          case "This Week" : 
            setDateBegin(thisWeek)
            break;
          case "This Month" : 
            setDateBegin(thisMonth)
            break;
          case "All Time" : 
            setDateBegin("1900-01-01")    
            break;          
        }
    },[salesBySelection])


   


  
    
    const { data: transactionThisMonth } = useTransactionTotalMoney(thisMonth, todayString);
    const { data: salesToday } = useTransactionTotalMoney(dateBegin, dateEnd);

    const { data: transactionTotalMoneyForEachMonth, loading: loadingTransactionTotalMoneyForEachMonth, error: errorTransactionTotalMoneyForEachMonth } = useTransactionTotalMoneyForEachMonth(year);
    const { data: topSalesProducts, loading: loadingTopSaleProduct, error: errorTopSaleProduct } = useTopSaleProduct(pageSize);
    const { data: countByProductionStatusId, loading: loadingCountByProductionStatusId, error: errorCountByProductionStatusId } = useCountByProductionStatusId(productionStatusId);
    const { data: countByIsShipping, loading: loadingCountByIsShipping, error: errorCountByIsShipping } = useCountByIsShipping(isShipping);

    const { data: orderCountByPendingApproval} = useOrderCountByStatus(3);
    const { data: orderCountByCancelled} = useOrderCountByStatus(11);
    const { data: orderCountByCompleted} = useOrderCountByStatus(8);
    const { data: orderCountByReturned} = useOrderCountByStatus(20);



    const { data: orderCountByTimePeriod, loading: loadingOrderCountByTimePeriod, error: errorOrderCountByTimePeriod } = useOrderCountByTimePeriod(dateBeginOrder, dateEndOrder);
    const { data: totalMoneyByYear, loading: loadingTotalMoneyByYear, error: errorTotalMoneyByYear } = useTotalMoneyByYear(year);

    

    

    return (
      <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard Highlights</h1>
        <div className="flex items-center">
          <Input type="date" className="mr-4 p-2 border rounded"/>
          <div className="flex items-center">
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Orders" value={orderCountByTimePeriod} 
          orderBySelection={orderBySelection} 
          setOrderBySelection={setOrderBySelection} 
          selectionOptions={selectionOptions}
        />
        <StatCard title="Orders Pending Approval" value={orderCountByPendingApproval} component={PackageCheckIcon}/>
        <StatCard title="Month total" value={"₫" +formatPrice(transactionThisMonth)} component={DollarSign} />
        <StatCard title="Sales" value={"₫" + formatPrice(salesToday)} 
          orderBySelection={salesBySelection} 
          setOrderBySelection={setSalesBySelection} 
          selectionOptions={selectionOptions} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="grid grid-cols-2 grid-rows-3 gap-6 ">
              <StatCard title="Orders In Production" value={countByProductionStatusId} />
              <StatCard title="Shipments in Transit" value={countByIsShipping} />
              <div className="col-span-2 row-span-2">
               {topSalesProducts && <TopSales topSalesProducts={topSalesProducts} /> }
               </div>
            </div>

            <Card className="h-full hover:border-green-900 transition duration-500 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Revenue by Month</CardTitle>
                <CardDescription>Showing the revenue by month</CardDescription>
              </CardHeader>
            <CardContent>
              {transactionTotalMoneyForEachMonth &&
              <AreaChartComponent data={transactionTotalMoneyForEachMonth}/>
              }
            </CardContent>
            </Card>
          

      </div>

    </div>
  );
};

export default DashboardPage
