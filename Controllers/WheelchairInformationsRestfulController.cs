//20200905 ENH by Ath, to enforce class responsibility; enforce DB modication via Restful API

using System; 
using System.Linq; 
using System.Threading.Tasks; 
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models; 
using Microsoft.AspNetCore.Authorization;
namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class WheelchairInformationsRestfulController : Controller {
        private readonly WheelChairContext _context;


        public WheelchairInformationsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var wheelchairInformations = _context.WheelchairInformation.ToListAsync();
            //return JsonConvert.SerializeObject(wheelchairInformations.Result);

            return Ok(JsonConvert.SerializeObject(wheelchairInformations.Result));
        }
        [HttpGet("wheelchairMappingList", Name = "WheelchairInformationsGetMapping")] //By Ath
        public async Task<IActionResult> GetList([FromQuery] bool filterAvailable) {
            var wheelchairInformations = await _context.WheelchairInformation.WhereIf(wc => wc.Availability, filterAvailable)
                                                              .Select(x => new { x.WheelchairNo, x.WheelchairModel, x.Availability })
                                                              .AsNoTracking()
                                                              .ToListAsync();
            string WheelchairNo = string.Empty;
            string WheelchairModel = string.Empty;
            bool Availability = true;
            wheelchairInformations.Insert(0, new { WheelchairNo, WheelchairModel, Availability });
            return Ok(JsonConvert.SerializeObject(wheelchairInformations));
        }
        [HttpGet("{wheelchairNo}")]
        public IActionResult Get(string wheelchairNo) {
            string decodedWheelchair = System.Net.WebUtility.UrlDecode(wheelchairNo);
            var wheelchairInformations = _context.WheelchairInformation.FirstOrDefault(x => x.WheelchairNo == decodedWheelchair);
            //return JsonConvert.SerializeObject(wheelchairInformations.Result);

            return Ok(JsonConvert.SerializeObject(wheelchairInformations));

        }



        [HttpPost]
        public IActionResult Post(WheelchairInformation wheelchairInformation) {

            var latestWheelchairNo = GetLastWheelChairNo();
            wheelchairInformation.WheelchairNo = latestWheelchairNo;

            _context.Add(wheelchairInformation);
            _context.SaveChanges();

            var location = "../WheelchairInformations/" + latestWheelchairNo;

            return Created(location, wheelchairInformation);
        }

        private string GetLastWheelChairNo() {
            var latestWheelchairNo = _context.WheelchairInformation.OrderByDescending(x => x.WheelchairNo).FirstOrDefault().WheelchairNo;
            var wheelChairNo = latestWheelchairNo.Replace("WC", "");
            var prefix = "WC";
            var lastWheelChairNo = Int32.Parse(wheelChairNo) + 1;

            return prefix + lastWheelChairNo;
        }

        [HttpPut]
        public IActionResult Put(WheelchairInformation wheelchairInformation) {

            try {
                _context.Update(wheelchairInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!WheelchairInformationExists(wheelchairInformation.WheelchairNo)) {
                    return NotFound();
                }
                else {
                    throw;
                }
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{wheelchairNo}")]
        public IActionResult Delete(string wheelchairNo) {

            var wheelchairInformation = _context.WheelchairInformation.Find(wheelchairNo);
            _context.WheelchairInformation.Remove(wheelchairInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }
        [HttpPatch("{wcID}")]
        public IActionResult Patch(string wcID, [FromBody] JsonPatchDocument<WheelchairInformation> patchDoc) {
            if (patchDoc != null) {
                WheelchairInformation wcUpdatedInstance = _context.WheelchairInformation.Find(wcID);

                patchDoc.ApplyTo(wcUpdatedInstance, ModelState);

                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
                _context.Update(wcUpdatedInstance);
                _context.SaveChanges();

                return new ObjectResult(wcUpdatedInstance);
            }
            else {
                return BadRequest(ModelState);
            }
        }
        private bool WheelchairInformationExists(string id) {
            return _context.WheelchairInformation.Any(e => e.WheelchairNo == id);
        }
    }
}