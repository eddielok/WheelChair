using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoTapeLibrariesController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public VideoTapeLibrariesController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: api/VideoTapeLibraries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VideoTapeLibrary>>> GetVideoTapeLibrary()
        {
            return await _context.VideoTapeLibrary.ToListAsync();
        }

        // GET: api/VideoTapeLibraries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VideoTapeLibrary>> GetVideoTapeLibrary(int id)
        {
            var videoTapeLibrary = await _context.VideoTapeLibrary.FindAsync(id);

            if (videoTapeLibrary == null)
            {
                return NotFound();
            }

            return videoTapeLibrary;
        }

        // PUT: api/VideoTapeLibraries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVideoTapeLibrary(int id, VideoTapeLibrary videoTapeLibrary)
        {
            if (id != videoTapeLibrary.RefId)
            {
                return BadRequest();
            }

            _context.Entry(videoTapeLibrary).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VideoTapeLibraryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/VideoTapeLibraries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VideoTapeLibrary>> PostVideoTapeLibrary(VideoTapeLibrary videoTapeLibrary)
        {
            _context.VideoTapeLibrary.Add(videoTapeLibrary);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVideoTapeLibrary", new { id = videoTapeLibrary.RefId }, videoTapeLibrary);
        }

        // DELETE: api/VideoTapeLibraries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VideoTapeLibrary>> DeleteVideoTapeLibrary(int id)
        {
            var videoTapeLibrary = await _context.VideoTapeLibrary.FindAsync(id);
            if (videoTapeLibrary == null)
            {
                return NotFound();
            }

            _context.VideoTapeLibrary.Remove(videoTapeLibrary);
            await _context.SaveChangesAsync();

            return videoTapeLibrary;
        }

        private bool VideoTapeLibraryExists(int id)
        {
            return _context.VideoTapeLibrary.Any(e => e.RefId == id);
        }
    }
}
