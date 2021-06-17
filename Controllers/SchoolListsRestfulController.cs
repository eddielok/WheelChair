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
    public class SchoolListsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public SchoolListsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var schoolLists = _context.SchoolList.ToListAsync();
            //return JsonConvert.SerializeObject(schoolLists.Result);

            return Ok(JsonConvert.SerializeObject(schoolLists.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var schoolLists = _context.SchoolList.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(schoolLists.Result);

            return Ok(JsonConvert.SerializeObject(schoolLists));

        }



        [HttpPost]
        public IActionResult Post(int refId, SchoolList schoolList)
        {

            //var latestRefId = _context.SchoolList.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //schoolList.RefId = latestRefId + 1;

            schoolList.RefId = 0;

            _context.Add(schoolList);
            _context.SaveChanges();

            var location = "../SchoolLists/" + schoolList.RefId;

            return Created(location, schoolList);
        }

        [HttpPut]
        public IActionResult Put(SchoolList schoolList)
        {

            try
            {
                _context.Update(schoolList);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SchoolListExists(schoolList.RefId))
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

            var schoolList = _context.SchoolList.Find(refId);
            _context.SchoolList.Remove(schoolList);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool SchoolListExists(int id)
        {
            return _context.SchoolList.Any(e => e.RefId == id);
        }
    }
}