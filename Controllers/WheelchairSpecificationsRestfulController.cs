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
    public class WheelchairSpecificationsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public WheelchairSpecificationsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var wheelchairSpecifications = _context.WheelchairSpecification.ToListAsync();
            //return JsonConvert.SerializeObject(wheelchairSpecifications.Result);

            return Ok(JsonConvert.SerializeObject(wheelchairSpecifications.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var wheelchairSpecifications = _context.WheelchairSpecification.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(wheelchairSpecifications.Result);

            return Ok(JsonConvert.SerializeObject(wheelchairSpecifications));

        }

        [HttpPost]
        public IActionResult Post(WheelchairSpecification wheelchairSpecification)
        {

            //var latestRefId = _context.WheelchairSpecification.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //wheelchairSpecification.RefId = latestRefId + 1;
            wheelchairSpecification.RefId = 0;

            _context.Add(wheelchairSpecification);
            _context.SaveChanges();

            var location = "../WheelchairSpecifications/" + wheelchairSpecification.RefId;

            return Created(location, wheelchairSpecification);
        }

        [HttpPut]
        public IActionResult Put(WheelchairSpecification wheelchairSpecification)
        {

            try
            {
                _context.Update(wheelchairSpecification);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WheelchairSpecificationExists(wheelchairSpecification.RefId))
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

            var wheelchairSpecification = _context.WheelchairSpecification.Find(refId);
            _context.WheelchairSpecification.Remove(wheelchairSpecification);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool WheelchairSpecificationExists(int id)
        {
            return _context.WheelchairSpecification.Any(e => e.RefId == id);
        }
    }
}