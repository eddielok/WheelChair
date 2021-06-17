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
    public class PpmiItemsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public PpmiItemsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var ppmiItemss = _context.PpmiItems.ToListAsync();
            //return JsonConvert.SerializeObject(ppmiItemss.Result);

            return Ok(JsonConvert.SerializeObject(ppmiItemss.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var ppmiItemss = _context.PpmiItems.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(ppmiItemss.Result);

            return Ok(JsonConvert.SerializeObject(ppmiItemss));

        }
        [HttpGet("CompletePPMIRoute", Name = "PpmiItemsGetByPPMINo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery]int PPMINo)
        {
            var PpmiItems = await _context.PpmiItems.Where(x => x.PpmiRegNo == PPMINo)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(PpmiItems));
        } 
      // [HttpPost]
      // public IActionResult Post(PpmiItems ppmiItems)
      // {
      //
      //     var latestRefId = _context.PpmiItems.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
      //     ppmiItems.RefId = latestRefId + 1;
      //
      //     _context.Add(ppmiItems);
      //     _context.SaveChanges();
      //
      //     var location = "../PpmiItemss/" + ppmiItems.RefId;
      //
      //     return Created(location, ppmiItems);
      // }
        [HttpPost("multipleInsertRoute", Name = "InsertManyPPMIItems")]
        public IActionResult PostList(PpmiItems[] ppmiItemsList)
        { 
            //var lastObj = _context.PpmiItems.OrderByDescending(x => x.RefId).FirstOrDefault();
            //if (lastObj != null)
            //    latestRefId = lastObj.RefId + 1;
            //else
            //    latestRefId++;

            foreach (PpmiItems anPPMIItem in ppmiItemsList)
            { 
                _context.Add(anPPMIItem);
                _context.SaveChanges(); 
            }

            string location = "../PPMIItems/CompleteOrderRoute/" + ppmiItemsList[0].PpmiRegNo; 
            return Created(location, ppmiItemsList);
        }
        [HttpPut]
        public IActionResult Put(PpmiItems ppmiItems)
        {

            try
            {
                _context.Update(ppmiItems);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PpmiItemsExists(ppmiItems.RefId))
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

            var ppmiItems = _context.PpmiItems.Find(refId);
            _context.PpmiItems.Remove(ppmiItems);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool PpmiItemsExists(int id)
        {
            return _context.PpmiItems.Any(e => e.RefId == id);
        }
    }
}