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
    public class WcBankManagementDistrictClustersRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public WcBankManagementDistrictClustersRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var wcBankManagementDistrictClusters = _context.WcBankManagementDistrictCluster.ToListAsync();
            //return JsonConvert.SerializeObject(wcBankManagementDistrictClusters.Result);

            return Ok(JsonConvert.SerializeObject(wcBankManagementDistrictClusters.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var wcBankManagementDistrictClusters = _context.WcBankManagementDistrictCluster.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(wcBankManagementDistrictClusters.Result);

            return Ok(JsonConvert.SerializeObject(wcBankManagementDistrictClusters));

        }



        [HttpPost]
        public IActionResult Post(WcBankManagementDistrictCluster wcBankManagementDistrictCluster)
        {

            //var latestRefId = _context.WcBankManagementDistrictCluster.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //wcBankManagementDistrictCluster.RefId = latestRefId + 1;

            wcBankManagementDistrictCluster.RefId = 0;

            _context.Add(wcBankManagementDistrictCluster);
            _context.SaveChanges();

            var location = "../WcBankManagementDistrictClusters/" + wcBankManagementDistrictCluster.RefId;

            return Created(location, wcBankManagementDistrictCluster);
        }

        [HttpPut]
        public IActionResult Put(WcBankManagementDistrictCluster wcBankManagementDistrictCluster)
        {

            try
            {
                _context.Update(wcBankManagementDistrictCluster);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WcBankManagementDistrictClusterExists(wcBankManagementDistrictCluster.RefId))
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

            var wcBankManagementDistrictCluster = _context.WcBankManagementDistrictCluster.Find(refId);
            _context.WcBankManagementDistrictCluster.Remove(wcBankManagementDistrictCluster);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool WcBankManagementDistrictClusterExists(int id)
        {
            return _context.WcBankManagementDistrictCluster.Any(e => e.RefId == id);
        }
    }
}