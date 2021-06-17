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
    public class SwitchboardItemsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public SwitchboardItemsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var switchboardItems = _context.SwitchboardItems.ToListAsync();
            //return JsonConvert.SerializeObject(switchboardItems.Result);

            return Ok(JsonConvert.SerializeObject(switchboardItems.Result));

        }

        [HttpGet("{switchboardId}")]
        public IActionResult Get(int switchboardId)
        {
            var switchboardItems = _context.SwitchboardItems.FirstOrDefault(x => x.SwitchboardId == switchboardId);
            //return JsonConvert.SerializeObject(switchboardItems.Result);

            return Ok(JsonConvert.SerializeObject(switchboardItems));

        }



        [HttpPost]
        public IActionResult Post(SwitchboardItems switchboardItem)
        {

            var latestSwitchboardId = _context.SwitchboardItems.OrderByDescending(x => x.SwitchboardId).FirstOrDefault().SwitchboardId;
            switchboardItem.SwitchboardId = latestSwitchboardId + 1;

            _context.Add(switchboardItem);
            _context.SaveChanges();

            var location = "../SwitchboardItems/" + switchboardItem.SwitchboardId;

            return Created(location, switchboardItem);
        }

        [HttpPut]
        public IActionResult Put(SwitchboardItems switchboardItem)
        {

            try
            {
                _context.Update(switchboardItem);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SwitchboardItemExists(switchboardItem.SwitchboardId))
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

        [HttpDelete("{switchboardId}")]
        public IActionResult Delete(int switchboardId)
        {

            var switchboardItem = _context.SwitchboardItems.Find(switchboardId);
            _context.SwitchboardItems.Remove(switchboardItem);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool SwitchboardItemExists(int? id)
        {
            return _context.SwitchboardItems.Any(e => e.SwitchboardId == id);
        }
    }
}