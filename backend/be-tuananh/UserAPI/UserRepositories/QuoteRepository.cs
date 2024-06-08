using Microsoft.EntityFrameworkCore;
using Repositories.CustomObjects;
using Repositories.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repositories
{
    public class QuoteRepository
    {
        private JeweleryOrderProductionContext dbContext = null;
        public List<Quote> GetQuotes()
        {
            dbContext = new JeweleryOrderProductionContext();
            return dbContext.Quotes.ToList();
        }

        public Quote? GetQuote(int id)
        {
            dbContext = new JeweleryOrderProductionContext();
            
            return dbContext.Quotes.FirstOrDefault(q => q.QuoteId == id);
        }

        public Quote AddQuote(Quote quote)
        {
            dbContext = new JeweleryOrderProductionContext();
            dbContext.Quotes.Add(quote);
            dbContext.SaveChanges();
            return quote;
        }

        public Quote UpdateQuote(int id, Quote quote)
        {
            dbContext = new JeweleryOrderProductionContext();
            Quote oQuote = GetQuote(id);
            if (oQuote != null)
            {
                oQuote.ProductionCost = quote.ProductionCost;
                oQuote.CaratCost = quote.CaratCost;
                oQuote.MetalCost = quote.MetalCost;
                oQuote.QuoteTotalPrice = quote.QuoteTotalPrice;
                oQuote.CaratPrice = quote.CaratPrice;
                oQuote.MetalWeight = quote.MetalWeight;
                dbContext.SaveChanges();
            }
            return oQuote;
        }

        public void DeleteQuote(int id)
        {
            dbContext = new JeweleryOrderProductionContext();
            Quote oQuote = GetQuote(id);
            if (oQuote != null)
            {
                dbContext.Remove(oQuote);
                dbContext.SaveChanges();
            }

        }
    }
}
