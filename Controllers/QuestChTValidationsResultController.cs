using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestChTValidationsResultController : Controller
    {
        private readonly WheelChairContext _context;


        public QuestChTValidationsResultController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var questChTValidations = _context.QuestChTValidation.ToListAsync();
            //return JsonConvert.SerializeObject(questChTValidations.Result);

            return Ok(JsonConvert.SerializeObject(questChTValidations.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var questChTValidations = _context.QuestChTValidation.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(questChTValidations.Result);

            return Ok(JsonConvert.SerializeObject(questChTValidations));

        }



        [HttpPost]
        public IActionResult Post(QuestChTValidation questChTValidation)
        {

            // var latestRefId = _context.QuestChTValidation.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            // questChTValidation.RefId = latestRefId + 1;

            questChTValidation.RefId = 0;

           _context.Add(questChTValidation);
            _context.SaveChanges();

            var location = "../QuestChTValidations/" + questChTValidation.RefId;

            return Created(location, questChTValidation);
        }

        [HttpPut]
        public IActionResult Put(QuestChTValidation questChTValidation)
        {

            try
            {
                _context.Update(questChTValidation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestChTValidationExists(questChTValidation.RefId))
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
        public IActionResult Delete(int refId)
        {

            var questChTValidation = _context.QuestChTValidation.Find(refId);
            _context.QuestChTValidation.Remove(questChTValidation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool QuestChTValidationExists(int id)
        {
            return _context.QuestChTValidation.Any(e => e.RefId == id);
        }
    }
}