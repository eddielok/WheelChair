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
    public class FunctionalSkillsRestfulController : Controller {
        private readonly WheelChairContext _context;
         
        public FunctionalSkillsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var functionalSkills = _context.FunctionalSkills.ToListAsync();
            return Ok(JsonConvert.SerializeObject(functionalSkills.Result));
        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var functionalSkills = _context.FunctionalSkills.FirstOrDefault(x => x.RefId == refId);
            return Ok(JsonConvert.SerializeObject(functionalSkills));

        }

        [HttpGet("seatNoRoute", Name = "FunctionalSkillsGetBySeatNo")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] string seat_no) {
            var multipleFunctionalSkills = await _context.FunctionalSkills.Where(x => x.SeatNo == seat_no)
                                                              .OrderByDescending(x => x.RefId)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            return Ok(JsonConvert.SerializeObject(multipleFunctionalSkills));
        }

        [HttpPost]
        public IActionResult Post(FunctionalSkills functionalSkill) {
            _context.Add(functionalSkill);
            _context.SaveChanges();

            var location = "../FunctionalSkills/" + functionalSkill.RefId;

            return Created(location, functionalSkill);
        }

        [HttpPut]
        public IActionResult Put(FunctionalSkills functionalSkill) {

            try {
                _context.Update(functionalSkill);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!FunctionalSkillExists(functionalSkill.RefId)) 
                    return NotFound(); 
                else 
                    throw; 
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{refId}")]
        public IActionResult Delete(int refId) {
            var functionalSkill = _context.FunctionalSkills.Find(refId);
            _context.FunctionalSkills.Remove(functionalSkill);
            _context.SaveChanges();

            return this.StatusCode(204);
        }
        private bool FunctionalSkillExists(int id) {
            return _context.FunctionalSkills.Any(e => e.RefId == id);
        }
    }
}