import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { beUrl } from '@/config/baseUrl';

const baseUrl = beUrl;

const useFetchData = (endpoint, params = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`${baseUrl}${endpoint}`, { params: memoizedParams });
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, memoizedParams]);

    return { data, loading, error };
};

export const useTransactionTotalMoney = (begin, end) => useFetchData('Transaction/TotalMoney', { begin, end });
export const useTransactionTotalMoneyForEachMonth = (year) => useFetchData('Transaction/TotalMoneyForEachMonth', { year });
export const useTopSaleProduct = (pageSize) => useFetchData('OrderFixedItem/TopsaleProduct', { pageSize });
export const useCountByProductionStatusId = (statusId) => useFetchData('ProductionTrackings/CountByProductionStatusId', { statusId });
export const useCountByIsShipping = (isShipping) => useFetchData('Shipments/CountByIsShipping', { isShipping });
export const useTotalMoneyForEachMonth = (year) => useFetchData('Order/TotalMoneyForEachMonth', { year });
export const useOrderCountByStatus = (statusId) => useFetchData('Order/OrderCountByStatus', { statusId });
export const useOrderCountByTimePeriod = (startDate, endDate) => useFetchData('Order/OrderCountByATimePeriod', { startDate, endDate });
export const useTotalMoneyByYear = (year) => useFetchData('Order/TotalMoneyByYear', { year });
