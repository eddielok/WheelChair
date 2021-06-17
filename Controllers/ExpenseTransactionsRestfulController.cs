using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class ExpenseTransactionsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public ExpenseTransactionsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var expenseTransactions = _context.ExpenseTransaction.ToListAsync();
            //return JsonConvert.SerializeObject(expenseTransactions.Result);

            return Ok(JsonConvert.SerializeObject(expenseTransactions.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int transactionNo)
        {
            var expenseTransactions = _context.ExpenseTransaction.FirstOrDefault(x => x.TransactionNo == transactionNo);
            //return JsonConvert.SerializeObject(expenseTransactions.Result);

            return Ok(JsonConvert.SerializeObject(expenseTransactions));

        }



        [HttpPost]
        public IActionResult Post(ExpenseTransaction expenseTransaction)
        {

            //var latestRefId = _context.ExpenseTransaction.OrderByDescending(x => x.TransactionNo).FirstOrDefault().TransactionNo;
            //expenseTransaction.TransactionNo = latestRefId + 1;
            expenseTransaction.TransactionNo = 0;

            _context.Add(expenseTransaction);
            _context.SaveChanges();

            var location = "../ExpenseTransactions/" + expenseTransaction.TransactionNo;

            return Created(location, expenseTransaction);
        }

        [HttpPut]
        public IActionResult Put(ExpenseTransaction expenseTransaction)
        {

            try
            {
                _context.Update(expenseTransaction);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseTransactionExists(expenseTransaction.TransactionNo))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int transactionNo)
        {

            var expenseTransaction = _context.ExpenseTransaction.Find(transactionNo);
            _context.ExpenseTransaction.Remove(expenseTransaction);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool ExpenseTransactionExists(int id)
        {
            return _context.ExpenseTransaction.Any(e => e.TransactionNo == id);
        }

    }
}