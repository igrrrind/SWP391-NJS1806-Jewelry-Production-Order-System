using Repositories.Dto;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class TransactionRepository
    {
        JeweleryOrderProductionContext? _context;

        public List<Transaction> GetTransaction(TransactionQueryObject queryObject) 
        {
            _context = new JeweleryOrderProductionContext();
            var transactionList = _context.Transactions.AsQueryable();

            if (queryObject.OrderId != 0)
            {
                transactionList = transactionList.Where(t => t.OrderId == queryObject.OrderId);
            }

            if (queryObject.SortByNewer)
            {
                transactionList = transactionList.OrderByDescending(t => t.TransactionId);
            }
            var skipNumber = (queryObject.PageNumber - 1) * queryObject.PageSize;
            List<Transaction> returnList = transactionList.Skip(skipNumber).Take(queryObject.PageSize).ToList();

            return returnList;

        }
        public decimal TotalmoneyTransactedByATimePeriod(DateOnly begin, DateOnly end)
        {
            _context = new JeweleryOrderProductionContext();
            var total = _context.Transactions.Where(t => t.TransactionDate >= begin && t.TransactionDate <= end).Sum(t => t.TransactionTotal);
            return total;
        }
        public List<TotalMonth> TotaLMoneyForEachMonth(DateOnly year)
        {
            _context  = new JeweleryOrderProductionContext();
            List<TotalMonth> month = new List<TotalMonth>();
            for (int i = 1; i <= 12; i++)
            {
                var total = _context.Transactions.Where(t => t.TransactionDate.Year == year.Year && t.TransactionDate.Month == i).Sum(t => t.TransactionTotal);
                month.Add(new TotalMonth() { Month = i, Total = total });
            }
            return month;

        }
        public void AddTransaction(Transaction transaction)
        {
            _context = new JeweleryOrderProductionContext();
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
        }
    }
}
