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
    public class SuppliersRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public SuppliersRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var suppliers = _context.Supplier.ToListAsync();
            //return JsonConvert.SerializeObject(suppliers.Result);

            return Ok(JsonConvert.SerializeObject(suppliers.Result));

        }




        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var suppliers = _context.Supplier.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(suppliers.Result);

            return Ok(JsonConvert.SerializeObject(suppliers));

        }



        [HttpPost]
        public IActionResult Post(Supplier supplier)
        {

            //20200817 Set DB PK and auto increment
            //var latestRefId = _context.Supplier.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //supplier.RefId = latestRefId + 1;

            supplier.RefId = 0;

            _context.Add(supplier);
            _context.SaveChanges();

            var location = "../Suppliers/" + supplier.RefId;

            return Created(location, supplier);
        }

        [HttpPut]
        public IActionResult Put(Supplier supplier)
        {

            try
            {
                _context.Update(supplier);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SupplierExists(supplier.RefId))
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

            var supplier = _context.Supplier.Find(refId);
            _context.Supplier.Remove(supplier);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool SupplierExists(int id)
        {
            return _context.Supplier.Any(e => e.RefId == id);
        }
    }
}