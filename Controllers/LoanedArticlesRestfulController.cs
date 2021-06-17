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
using System.Text;
using Microsoft.Data.SqlClient;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class LoanedArticlesRestfulController : Controller {
        private readonly WheelChairContext _context;


        public LoanedArticlesRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var loanedArticles = _context.LoanedArticle.ToListAsync();
            //return JsonConvert.SerializeObject(loanedArticles.Result);

            return Ok(JsonConvert.SerializeObject(loanedArticles.Result));

        }
        [HttpGet("loanFormRoute", Name = "LoanedArticleGetByLoanFormNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string loanNo) {
            var loanedArticles = await _context.LoanedArticle.Where(x => x.LoanFormNo == loanNo)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(loanedArticles));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var loanedArticles = _context.LoanedArticle.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(loanedArticles.Result);

            return Ok(JsonConvert.SerializeObject(loanedArticles));
        }
        [HttpPost("multipleInsertRoute", Name = "InsertManyLoanedArticles")] //By Ath
        public async Task<IActionResult> PostList(LoanedArticle[] loanedArticlesList) {
            foreach (LoanedArticle aLoanArticletem in loanedArticlesList) {
                _context.Add(aLoanArticletem);
                await _context.SaveChangesAsync();
            }
            string location = "../LoanedArticlesRestful/loanFormRoute/" + loanedArticlesList[0].LoanFormNo;
            return Created(location, loanedArticlesList);
        }
        [HttpGet("GetAsync/{item}", Name = "GetAsyncLoanedArticles")] //By Ath
        public async Task<IActionResult> GetAsync(string item, [FromQuery] string param) {
            switch (item) {
                case "loan_detail": {
                        var r = await GetLoanArticleDetail(param);
                        return Ok(r);
                    }
            }
            return BadRequest();
        }
        private async Task<string> GetLoanArticleDetail(string loanNo) {

            StringBuilder jsonResult = new StringBuilder();
            using (var command = _context.Database.GetDbConnection().CreateCommand()) {
                command.CommandText = " select " +
                                      "   loArtic.ref_id as [RefId] , loArtic.LoanFormNo, loArtic.partNo AS [PartNo],ISNULL(loArtic.Remarks,'') AS [Remarks], " +
                                      "   ISNULL(parInfo.Price,'')  AS [Price], ISNULL(parInfo.PartType,'')  AS [PartType]," +
                                      "   ISNULL(parInfo.Consumable,'')  AS [Consumable],  ISNULL(parInfo.Description,'')   AS [Description]" +
                                      " from Loaned_Article loArtic " +
                                      " inner join Parts_Information parInfo on loArtic.PartNo = parInfo.PartNo " +
                                      " where LoanFormNo = @loanNo" +
                                      " for json path";
                command.Parameters.Add(new SqlParameter("loanNo", loanNo));
                _context.Database.OpenConnection();
                using var result = await command.ExecuteReaderAsync();
                if (result.HasRows)
                    while (await result.ReadAsync()) {
                        jsonResult.Append(result.GetValue(0).ToString());
                    }
            }
            return jsonResult.ToString();
        }
        //[HttpPost]
        //public IActionResult Post(LoanedArticle loanedArticle)
        //{
        //
        //    var latestRefId = _context.LoanedArticle.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
        //    loanedArticle.RefId = latestRefId + 1;
        //
        //    _context.Add(loanedArticle);
        //    _context.SaveChanges();
        //
        //    var location = "../LoanedArticles/" + loanedArticle.RefId;
        //
        //    return Created(location, loanedArticle);
        //}


        [HttpPut]
        public IActionResult Put(LoanedArticle loanedArticle) {

            try {
                _context.Update(loanedArticle);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!LoanedArticleExists(loanedArticle.RefId)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {

            var loanedArticle = _context.LoanedArticle.Find(refId);
            _context.LoanedArticle.Remove(loanedArticle);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool LoanedArticleExists(int id) {
            return _context.LoanedArticle.Any(e => e.RefId == id);
        }
    }
}