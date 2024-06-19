using Microsoft.EntityFrameworkCore;
using Repositories;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class QuoteService
    {
        private QuoteRepository? quoteRepository = null;

        public List<Quote> GetQuotes(int pageNumber, int pageSize)
        {
            quoteRepository = new QuoteRepository();
            return quoteRepository.GetQuotes(pageNumber, pageSize);
        }
        public Quote? GetQuote(int id)
        {
            quoteRepository = new QuoteRepository();
            return quoteRepository.GetQuote(id);
        }

        public Quote AddQuote(Quote quote)
        {
            quoteRepository = new QuoteRepository();
            return quoteRepository.AddQuote(quote);
        }

        public Quote UpdateQuote(int id, Quote quote)
        {
            quoteRepository = new QuoteRepository();
            return quoteRepository.UpdateQuote(id, quote);
        }

        public void DeleteQuote(int id)
        {
            quoteRepository = new QuoteRepository();
            quoteRepository.DeleteQuote(id);

        }
    }
}
