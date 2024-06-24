using Repositories;
using Repositories.Models;
using Repositories.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Services
{
    public class TransactionService
    {
        private TransactionRepository _transactionRepo = new();

        public List<Transaction> GetTransaction(TransactionQueryObject queryObject)
        {
            return _transactionRepo.GetTransaction(queryObject);
        }

        public void AddTransaction(Transaction transaction)
        {
            _transactionRepo.AddTransaction(transaction);
        }
    }
}
