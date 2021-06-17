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
    public class QuestWcbsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public QuestWcbsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var questWcbs = _context.QuestWcb.ToListAsync();
            //return JsonConvert.SerializeObject(questWcbs.Result);

            return Ok(JsonConvert.SerializeObject(questWcbs.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var questWcbs = _context.QuestWcb.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(questWcbs.Result);

            return Ok(JsonConvert.SerializeObject(questWcbs));

        }



        [HttpPost]
        public IActionResult Post(QuestWcb questWcb)
        {

            var latestRefId = _context.QuestWcb.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            questWcb.RefId = latestRefId + 1;

            _context.Add(questWcb);
            _context.SaveChanges();

            var location = "../QuestWcbs/" + questWcb.RefId;

            return Created(location, questWcb);
        }

        [HttpPut]
        public IActionResult Put(QuestWcb questWcb)
        {

            try
            {
                _context.Update(questWcb);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestWcbExists(questWcb.RefId))
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

            var questWcb = _context.QuestWcb.Find(refId);
            _context.QuestWcb.Remove(questWcb);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool QuestWcbExists(int id)
        {
            return _context.QuestWcb.Any(e => e.RefId == id);
        }
    }
}