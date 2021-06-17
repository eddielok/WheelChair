using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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
    public class ClientAttendancesRestfulController : Controller {
        private readonly WheelChairContext _context; 
        public ClientAttendancesRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var ClientAttendances = _context.ClientAttendance.ToListAsync();
            //return JsonConvert.SerializeObject(ClientAttendances.Result);

            return Ok(JsonConvert.SerializeObject(ClientAttendances.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var ClientAttendances = _context.ClientAttendance.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(ClientAttendances.Result);

            return Ok(JsonConvert.SerializeObject(ClientAttendances));

        }

        [HttpGet("seatNoRoute", Name = "ClientAttendanceGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var attendances = await _context.ClientAttendance.Where(x => x.SeatNo == seat_no)
                                                             .AsNoTracking().ToListAsync();
            return Ok(JsonConvert.SerializeObject(attendances));
        }

        [HttpPost]
        public IActionResult Post(ClientAttendance ClientAttendance) {
            try {
                //var latestRefId = _context.ClientAttendance.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
                //ClientAttendance.RefId = latestRefId + 1;
                ClientAttendance.RefId = 0;

                _context.Add(ClientAttendance);
                _context.SaveChanges();

                var location = "../ClientAttendances/" + ClientAttendance.RefId;

                return Created(location, ClientAttendance);
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Put(ClientAttendance ClientAttendance) {

            try {
                _context.Update(ClientAttendance);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ClientAttendanceExists(ClientAttendance.RefId)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {

            var ClientAttendance = _context.ClientAttendance.Find(refId);
            _context.ClientAttendance.Remove(ClientAttendance);
            _context.SaveChanges();

            return this.StatusCode(204);
        } 
        private bool ClientAttendanceExists(int id) {
            return _context.ClientAttendance.Any(e => e.RefId == id);
        }


    }
}