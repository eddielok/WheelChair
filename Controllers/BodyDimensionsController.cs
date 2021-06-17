using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WheelChair.Models;

namespace WheelChair.Controllers { 
    public class BodyDimensionsController : Controller
    {
        private readonly WheelChairContext _context;

        public BodyDimensionsController(WheelChairContext context)
        {
            _context = context;
        }

        // GET: BodyDimensions
        public async Task<IActionResult> Index()
        {
            return View(await _context.BodyDimension.ToListAsync());
        }

        // GET: BodyDimensions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bodyDimension = await _context.BodyDimension
                .FirstOrDefaultAsync(m => m.RefId == id);
            if (bodyDimension == null)
            {
                return NotFound();
            }

            return View(bodyDimension);
        }

        // GET: BodyDimensions/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: BodyDimensions/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RefId,SeatNo,Date,Height,Weight,PelvicWidth,PelvicWbrace,ChestWidth,ChestWbrace,ShoulderWidth,HeadWidth,KneeWidth,LseatDepth,RseatDepth,SeatToOcciput,SeatToObrace,SeatToShoulder,SeatToSbrace,SeatToAxilla,SeatToPsis,BackToAntOfIt,LlegLength,RlegLength,LfootLength,RfootLength")] BodyDimension bodyDimension)
        {
            if (ModelState.IsValid)
            {
                _context.Add(bodyDimension);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(bodyDimension);
        }

        // GET: BodyDimensions/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bodyDimension = await _context.BodyDimension.FindAsync(id);
            if (bodyDimension == null)
            {
                return NotFound();
            }
            return View(bodyDimension);
        }

        // POST: BodyDimensions/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("RefId,SeatNo,Date,Height,Weight,PelvicWidth,PelvicWbrace,ChestWidth,ChestWbrace,ShoulderWidth,HeadWidth,KneeWidth,LseatDepth,RseatDepth,SeatToOcciput,SeatToObrace,SeatToShoulder,SeatToSbrace,SeatToAxilla,SeatToPsis,BackToAntOfIt,LlegLength,RlegLength,LfootLength,RfootLength")] BodyDimension bodyDimension)
        {
            if (id != bodyDimension.RefId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(bodyDimension);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!BodyDimensionExists(bodyDimension.RefId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(bodyDimension);
        }

        // GET: BodyDimensions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var bodyDimension = await _context.BodyDimension
                .FirstOrDefaultAsync(m => m.RefId == id);
            if (bodyDimension == null)
            {
                return NotFound();
            }

            return View(bodyDimension);
        }

        // POST: BodyDimensions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var bodyDimension = await _context.BodyDimension.FindAsync(id);
            _context.BodyDimension.Remove(bodyDimension);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool BodyDimensionExists(int id)
        {
            return _context.BodyDimension.Any(e => e.RefId == id);
        }
    }
}
