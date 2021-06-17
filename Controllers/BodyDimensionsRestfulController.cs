using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WheelChair.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;  
namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class BodyDimensionsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public BodyDimensionsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var bodyDimensions = _context.BodyDimension.ToListAsync();
            return Ok(JsonConvert.SerializeObject(bodyDimensions.Result));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var bodyDimensions = _context.BodyDimension.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(bodyDimensions));
        }

        [HttpGet("seatNoRoute", Name = "BodyDimensionGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var bodyDimensions = await _context.BodyDimension.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(bodyDimensions));
        }

        [HttpPost]
        public IActionResult Post(int refId, BodyDimension bodyDimension) {
            _context.Add(bodyDimension);
            _context.SaveChanges();

            var location = "../BodyDimensions/" + refId.ToString();

            return Created(location, bodyDimension);
        }

        [HttpPut]
        public IActionResult Put(BodyDimension bodyDimension) {
            try {
                _context.Update(bodyDimension);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!BodyDimensionExists(bodyDimension.RefId)) 
                    return NotFound();
                else 
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var bodyDimension = _context.BodyDimension.Find(refId);
            _context.BodyDimension.Remove(bodyDimension);
            _context.SaveChanges();
            return this.StatusCode(204);
        }

        private bool BodyDimensionExists(int id) {
            return _context.BodyDimension.Any(e => e.RefId == id);
        }
    }
}
