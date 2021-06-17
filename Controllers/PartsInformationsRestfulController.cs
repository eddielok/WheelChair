//20200905 ENH by Ath, to enforce class responsibility; enforce DB modication via Restful API

using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;
using System.Data;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Authorization;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = Policies.User)]
    public class PartsInformationsRestfulController : Controller {
        private readonly WheelChairContext _context;


        public PartsInformationsRestfulController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get() {
            var partsInformations = _context.PartsInformation.ToListAsync();
            //return JsonConvert.SerializeObject(partsInformations.Result);

            return Ok(JsonConvert.SerializeObject(partsInformations.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId) {
            var partsInformations = _context.PartsInformation.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(partsInformations.Result);

            return Ok(JsonConvert.SerializeObject(partsInformations));

        }
        [HttpGet("GetPartByPartNo", Name = "PartsInformationGetPartByPartNo")] //By Ath
        public async Task<IActionResult> GetPartInfoByPartNo([FromQuery] string anItem) {
            var raw = await  _context.PartsInformation.AsNoTracking().FirstOrDefaultAsync(i => i.PartNo.Equals(anItem));
            return Ok(JsonConvert.SerializeObject(raw));
        }
        [HttpGet("availablePartList", Name = "PartsInformationGetByAvailableItems")] //By Ath
        public async Task<IActionResult> GetAvailableList() {
            var avaPartsInformations = await _context.PartsInformation
                                                              .OrderBy(x => x.PartNo)
                                                              .Where(x => x.TotalQuantity - x.OutQuantity > 0)
                                                              .AsNoTracking()
                                                              .ToListAsync();
            avaPartsInformations.Insert(0, new PartsInformation());
            return Ok(JsonConvert.SerializeObject(avaPartsInformations));
        }
        [HttpPost]
        public IActionResult Post(int refId, PartsInformation partsInformation) {

            //var latestRefId = _context.PartsInformation.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //partsInformation.RefId = latestRefId + 1;

            partsInformation.RefId = 0;

            _context.Add(partsInformation);
            _context.SaveChanges();

            var location = "../PartsInformations/" + refId.ToString();

            return Created(location, partsInformation);
        }

        [HttpPut]
        public IActionResult Put(PartsInformation partsInformation) {

            try {
                _context.Update(partsInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException) {
                if (!PartsInformationExists(partsInformation.RefId)) {
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

            var partsInformation = _context.PartsInformation.Find(refId);
            _context.PartsInformation.Remove(partsInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }
        [HttpPatch("{partID}")]
        public IActionResult Patch (string partID,  [FromBody] JsonPatchDocument<PartsInformation> patchDoc) {
            if (patchDoc != null) {
                PartsInformation partUpdatedInstance = _context.PartsInformation.FirstOrDefault(la => la.PartNo == partID);
                  
                patchDoc.ApplyTo(partUpdatedInstance, ModelState);

                if (!ModelState.IsValid) {
                    return BadRequest(ModelState);
                }
                _context.Update(partUpdatedInstance);
                _context.SaveChanges();

                return new ObjectResult(partUpdatedInstance);
            }
            else {
                return BadRequest(ModelState);
            }
        }
        private bool PartsInformationExists(int id) {
            return _context.PartsInformation.Any(e => e.RefId == id);
        }
    }
}