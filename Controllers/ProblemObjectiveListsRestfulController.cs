using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class ProblemObjectiveListsRestfulController : Controller {
        private readonly WheelChairContext _context;

        public ProblemObjectiveListsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var problemObjectiveLists = _context.ProblemObjectiveList.ToListAsync();
            return Ok(JsonConvert.SerializeObject(problemObjectiveLists.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var problemObjectiveLists = _context.ProblemObjectiveList.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(problemObjectiveLists));

        }
        [HttpGet("seatNoRoute", Name = "ProblemObjectiveListGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleProblemObjectiveList = await _context.ProblemObjectiveList.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleProblemObjectiveList));
        }

        [HttpPost]
        public IActionResult Post(ProblemObjectiveList problemObjectiveList) {
            _context.Add(problemObjectiveList);
            _context.SaveChanges();

            var location = "../ProblemObjectiveLists/" + problemObjectiveList.RefId;

            return Created(location, problemObjectiveList);
        }

        [HttpPut]
        public IActionResult Put(ProblemObjectiveList problemObjectiveList) {
            try {
                _context.Update(problemObjectiveList);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!ProblemObjectiveListExists(problemObjectiveList.RefId))
                    return NotFound();
                else
                    throw;
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var problemObjectiveList = _context.ProblemObjectiveList.Find(refId);
            _context.ProblemObjectiveList.Remove(problemObjectiveList);
            _context.SaveChanges();

            return this.StatusCode(204);
        }

        private bool ProblemObjectiveListExists(int id) {
            return _context.ProblemObjectiveList.Any(e => e.RefId == id);
        }
    }
}