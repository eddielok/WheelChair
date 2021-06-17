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
    public class ClientPurchasingRegistriesRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public ClientPurchasingRegistriesRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var clientPurchasingRegistries = _context.ClientPurchasingRegistry.ToListAsync();
            //return JsonConvert.SerializeObject(ClientPurchasingRegistries.Result);

            return Ok(JsonConvert.SerializeObject(clientPurchasingRegistries.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var clientPurchasingRegistries = _context.ClientPurchasingRegistry.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(ClientPurchasingRegistries.Result);

            return Ok(JsonConvert.SerializeObject(clientPurchasingRegistries));

        }



        [HttpPost]
        public IActionResult Post(int refId, ClientPurchasingRegistry clientPurchasingRegistry)
        {

            //var latestRefId = _context.ClientPurchasingRegistry.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //clientPurchasingRegistry.RefId = latestRefId + 1;
            clientPurchasingRegistry.RefId = 0;

            _context.Add(clientPurchasingRegistry);
            _context.SaveChanges();

            var location = "../ClientPurchasingRegistries/" + refId.ToString();

            return Created(location, clientPurchasingRegistry);
        }

        [HttpPut]
        public IActionResult Put(ClientPurchasingRegistry clientPurchasingRegistry)
        {

            try
            {
                _context.Update(clientPurchasingRegistry);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientPurchasingRegistryExists(clientPurchasingRegistry.RefId))
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

            var clientPurchasingRegistry = _context.ClientPurchasingRegistry.Find(refId);
            _context.ClientPurchasingRegistry.Remove(clientPurchasingRegistry);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool ClientPurchasingRegistryExists(int id)
        {
            return _context.ClientPurchasingRegistry.Any(e => e.RefId == id);
        }


    }

}