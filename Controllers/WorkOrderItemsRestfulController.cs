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
    public class WorkOrderItemsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public WorkOrderItemsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var workOrderItems = _context.WorkOrderItems.ToListAsync();
            //return JsonConvert.SerializeObject(workOrderItems.Result);

            return Ok(JsonConvert.SerializeObject(workOrderItems.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var workOrderItems = _context.WorkOrderItems.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(workOrderItems.Result);

            return Ok(JsonConvert.SerializeObject(workOrderItems));

        }
       [HttpGet("CompleteOrderRoute", Name = "WorkOrderItemsGetByOrderNo")] //By Ath
       public async Task<IActionResult> GetList([FromQuery]int OrderNo)
       {
           var WorkOrderItems = await _context.WorkOrderItems.Where(x => x.OrderNo == OrderNo)
                                                             .OrderByDescending(x => x.RefId)
                                                             .AsNoTracking()
                                                             .ToListAsync();
           return Ok(JsonConvert.SerializeObject(WorkOrderItems));
       }
         
      // [HttpPost]
      // public IActionResult Post(WorkOrderItems workOrderItem)
      // {
      //     var latestRefId = 0;
      //     var lastObj = _context.WorkOrderItems.OrderByDescending(x => x.RefId).FirstOrDefault();
      //     if (lastObj != null)
      //     {
      //         workOrderItem.RefId = lastObj.RefId + 1;
      //     }
      //     else { workOrderItem.RefId = latestRefId + 1; }
      //    // System.Threading.Thread.Sleep(15000);
      //     _context.Add(workOrderItem);
      //     _context.SaveChanges();
      //
      //     var location = "../WorkOrderItems/" + workOrderItem.RefId;
      //
      //     return Created(location, workOrderItem);
      // }
        [HttpPost("multipleInsertRoute", Name = "InsertManyWorkOrderItems")]
        public IActionResult PostList(WorkOrderItems[] workOrderItemList)
        {   
            foreach (WorkOrderItems aWorkOrderItem in workOrderItemList)
            { 
                _context.Add(aWorkOrderItem);
                _context.SaveChanges(); 
            }
            
            string location = "../WorkOrderItems/CompleteOrderRoute/"+ workOrderItemList[0].OrderNo;
            
            return Created(location, workOrderItemList);
        } 
        [HttpPut]
        public IActionResult Put(WorkOrderItems workOrderItem)
        {

            try
            {
                _context.Update(workOrderItem);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkOrderItemExists(workOrderItem.RefId))
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

            var workOrderItem = _context.WorkOrderItems.Find(refId);
            _context.WorkOrderItems.Remove(workOrderItem);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool WorkOrderItemExists(int id)
        {
            return _context.WorkOrderItems.Any(e => e.RefId == id);
        }
    }
}