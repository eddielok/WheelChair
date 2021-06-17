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
    public class OrthoSpinalAssessmentsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public OrthoSpinalAssessmentsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var orthoSpinalAssessments = _context.OrthoSpinalAssessment.ToListAsync();
            //return JsonConvert.SerializeObject(orthoSpinalAssessments.Result);

            return Ok(JsonConvert.SerializeObject(orthoSpinalAssessments.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var orthoSpinalAssessments = _context.OrthoSpinalAssessment.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(orthoSpinalAssessments.Result);

            return Ok(JsonConvert.SerializeObject(orthoSpinalAssessments));

        }



        [HttpPost]
        public IActionResult Post(OrthoSpinalAssessment orthoSpinalAssessment)
        {

            //var latestRefId = _context.OrthoSpinalAssessment.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //orthoSpinalAssessment.RefId = latestRefId + 1;

            orthoSpinalAssessment.RefId = 0;


            _context.Add(orthoSpinalAssessment);
            _context.SaveChanges();

            var location = "../OrthoSpinalAssessments/" + orthoSpinalAssessment.RefId;

            return Created(location, orthoSpinalAssessment);
        }

        [HttpPut]
        public IActionResult Put(OrthoSpinalAssessment orthoSpinalAssessment)
        {

            try
            {
                _context.Update(orthoSpinalAssessment);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrthoSpinalAssessmentExists(orthoSpinalAssessment.RefId))
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

            var orthoSpinalAssessment = _context.OrthoSpinalAssessment.Find(refId);
            _context.OrthoSpinalAssessment.Remove(orthoSpinalAssessment);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool OrthoSpinalAssessmentExists(int id)
        {
            return _context.OrthoSpinalAssessment.Any(e => e.RefId == id);
        }
    }
}