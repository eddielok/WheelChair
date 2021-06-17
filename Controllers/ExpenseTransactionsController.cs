using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseTransactionsController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public ExpenseTransactionsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/ExpenseTransactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseTransaction>>> GetExpenseTransaction()
        {
            return await _context.ExpenseTransaction.ToListAsync();
        }

        // GET: api/ExpenseTransactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseTransaction>> GetExpenseTransaction(int id)
        {
            var expenseTransaction = await _context.ExpenseTransaction.FindAsync(id);

            if (expenseTransaction == null)
            {
                return NotFound();
            }

            return expenseTransaction;
        }

        // PUT: api/ExpenseTransactions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpenseTransaction(int id, ExpenseTransaction expenseTransaction)
        {
            if (id != expenseTransaction.TransactionNo)
            {
                return BadRequest();
            }

            _context.Entry(expenseTransaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseTransactionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ExpenseTransactions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ExpenseTransaction>> PostExpenseTransaction(ExpenseTransaction expenseTransaction)
        {
            _context.ExpenseTransaction.Add(expenseTransaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpenseTransaction", new { id = expenseTransaction.TransactionNo }, expenseTransaction);
        }

        // DELETE: api/ExpenseTransactions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ExpenseTransaction>> DeleteExpenseTransaction(int id)
        {
            var expenseTransaction = await _context.ExpenseTransaction.FindAsync(id);
            if (expenseTransaction == null)
            {
                return NotFound();
            }

            _context.ExpenseTransaction.Remove(expenseTransaction);
            await _context.SaveChangesAsync();

            return expenseTransaction;
        }

        private bool ExpenseTransactionExists(int id)
        {
            return _context.ExpenseTransaction.Any(e => e.TransactionNo == id);
        }
    }
}
