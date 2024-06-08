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
    public class QuoteServices
    {
        private QuoteRepository quoteRepository;

        public List<Quote> GetQuotes()
        {
            return quoteRepository.GetQuotes();
        }
        public Quote? GetQuote(int id)
        {
            return quoteRepository.GetQuote(id);
        }

        public Quote AddQuote(Quote quote)
        {
            return quoteRepository.AddQuote(quote);
        }

        public Quote UpdateQuote(int id, Quote quote)
        {
            return quoteRepository.UpdateQuote(id, quote);
        }

        public void DeleteQuote(int id)
        {
            quoteRepository.DeleteQuote(id);

        }
    }
}
