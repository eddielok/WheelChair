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
    public class WorkOrdersRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public WorkOrdersRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var workOrders = _context.WorkOrder.ToListAsync();
            //return JsonConvert.SerializeObject(workOrders.Result);

            return Ok(JsonConvert.SerializeObject(workOrders.Result));

        }

        [HttpGet("{orderNo}")]
        public IActionResult Get(int orderNo)
        {
            var workOrders = _context.WorkOrder.FirstOrDefault(x => x.OrderNo == orderNo);
            //return JsonConvert.SerializeObject(workOrders.Result);

            return Ok(JsonConvert.SerializeObject(workOrders));

        }

        [HttpGet("seatNoRoute", Name = "WorkOrdersGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery]string seat_no)
        {
            var workOrder = await _context.WorkOrder.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.OrderDate)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(workOrder));
        }

        [HttpPost]
        public IActionResult Post(int orderNo, WorkOrder workOrder)
        {

            //var latestOrderNo = _context.WorkOrder.OrderByDescending(x => x.OrderNo).FirstOrDefault().OrderNo;
            //workOrder.OrderNo = latestOrderNo + 1;
            workOrder.OrderNo = null;

            _context.Add(workOrder);
            _context.SaveChanges();

            var location = "../WorkOrders/" + workOrder.OrderNo.ToString();

            return Created(location, workOrder);
        }

        [HttpPut]
        public IActionResult Put(WorkOrder workOrder)
        {

            try
            {
                _context.Update(workOrder);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkOrderExists(workOrder.OrderNo))
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

        [HttpDelete("{orderNo}")]
        public IActionResult Delete(int orderNo)
        {

            var workOrder = _context.WorkOrder.Find(orderNo);
            _context.WorkOrder.Remove(workOrder);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool WorkOrderExists(int? id)
        {
            return _context.WorkOrder.Any(e => e.OrderNo == id);
        }
    }
}