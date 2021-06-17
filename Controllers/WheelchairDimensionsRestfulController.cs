using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class WheelchairDimensionsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public WheelchairDimensionsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
         //  string userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value; 
         //  return Ok(userId);
             var wheelchairDimensions = _context.WheelchairDimension.ToListAsync();
             return Ok(JsonConvert.SerializeObject(wheelchairDimensions.Result)); 
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var wheelchairDimensions = _context.WheelchairDimension.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(wheelchairDimensions));

        }

        [HttpGet("seatNoRoute", Name = "WheelchairDimensionsGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var wheelchairDimensions = await _context.WheelchairDimension.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(wheelchairDimensions));
        }

        [HttpPost]
        public IActionResult Post(WheelchairDimension wheelchairDimension) {
            _context.Add(wheelchairDimension);
            _context.SaveChanges();

            var location = "../WheelchairDimensions/" + wheelchairDimension.RefId;

            return Created(location, wheelchairDimension);
        }

        [HttpPut]
        public IActionResult Put(WheelchairDimension wheelchairDimension) {
            try {
                _context.Update(wheelchairDimension);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!WheelchairDimensionExists(wheelchairDimension.RefId))
                    return NotFound();
                else
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var wheelchairDimension = _context.WheelchairDimension.Find(refId);
            _context.WheelchairDimension.Remove(wheelchairDimension);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool WheelchairDimensionExists(int id) {
            return _context.WheelchairDimension.Any(e => e.RefId == id);
        }
    }
}