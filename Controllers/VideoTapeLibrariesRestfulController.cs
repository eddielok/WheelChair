using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoTapeLibrariesRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public VideoTapeLibrariesRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var VideoTapeLibraries = _context.VideoTapeLibrary.ToListAsync();
            //return JsonConvert.SerializeObject(VideoTapeLibraries.Result);

            return Ok(JsonConvert.SerializeObject(VideoTapeLibraries.Result));

        }

        [HttpGet("{refId}")]
        public IActionResult Get(int refId)
        {
            var VideoTapeLibraries = _context.VideoTapeLibrary.FirstOrDefault(x => x.RefId == refId);
            //return JsonConvert.SerializeObject(VideoTapeLibraries.Result);

            return Ok(JsonConvert.SerializeObject(VideoTapeLibraries));

        }



        [HttpPost]
        public IActionResult Post(VideoTapeLibrary VideoTapeLibrary)
        {

            //var latestRefId = _context.VideoTapeLibrary.OrderByDescending(x => x.RefId).FirstOrDefault().RefId;
            //VideoTapeLibrary.RefId = latestRefId + 1;

            VideoTapeLibrary.RefId = 0;

            _context.Add(VideoTapeLibrary);
            _context.SaveChanges();

            var location = "../VideoTapeLibrarys/" + VideoTapeLibrary.RefId;

            return Created(location, VideoTapeLibrary);
        }

        [HttpPut]
        public IActionResult Put(VideoTapeLibrary VideoTapeLibrary)
        {

            try
            {
                _context.Update(VideoTapeLibrary);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoTapeLibraryExists(VideoTapeLibrary.RefId))
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

            var VideoTapeLibrary = _context.VideoTapeLibrary.Find(refId);
            _context.VideoTapeLibrary.Remove(VideoTapeLibrary);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool VideoTapeLibraryExists(int id)
        {
            return _context.VideoTapeLibrary.Any(e => e.RefId == id);
        }
    }
}