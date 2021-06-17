using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using WheelChair.Models;

namespace WheelChair.Controllers
{
    public class MedicalInformationsController : Controller
    {
        private readonly WheelChairContext _context;

        public MedicalInformationsController(WheelChairContext context)
        {
            _context = context;
        }
        public IActionResult MedicalInformationPage(string pid)
        {
            ViewData["pid"] = pid;
            return View();
        }

        [Route("MedicInfo/new")]
        [HttpPost]
        public ActionResult AddMedicalInformation(MedicalInformation record)
        {
            ArchiveToOfflineFile(record);
            return Content("Success :)");
        }

        private void ArchiveToOfflineFile(MedicalInformation record)
        {
            string jsonString;
            jsonString = JsonSerializer.Serialize(record);

            //DataManipulation.ArchiveToOfflineFile(jsonString, Environment.CurrentDirectory + @"\archive\archiveMEDIC.txt");
        }

        // GET: MedicalInformations
        public async Task<IActionResult> Index()
        {
            return View(await _context.MedicalInformation.ToListAsync());
        }

        // GET: MedicalInformations/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var medicalInformation = await _context.MedicalInformation
                .FirstOrDefaultAsync(m => m.RefId == id);
            if (medicalInformation == null)
            {
                return NotFound();
            }

            return View(medicalInformation);
        }

        // GET: MedicalInformations/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: MedicalInformations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RefId,SeatNo,Date,SurgeryInfo,PendingSurgery,Seizures,PressureSores,ExistingSores,PainDiscomfort,Sensation,Hearing,Vision,RespiratoryStatus,Notes")] MedicalInformation medicalInformation)
        {
            ValidationContext vldCtx =
                  new ValidationContext(medicalInformation, null, null);
            List<ValidationResult> errors =
                new List<ValidationResult>();
            if (Validator.TryValidateObject(medicalInformation, vldCtx, errors, true))
            { 
                medicalInformation.RefId = System.DateTime.Now.Second ;
                _context.Add(medicalInformation);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            else
            {
                return BadRequest(ModelState);
            }
              
        }

        // GET: MedicalInformations/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var medicalInformation = await _context.MedicalInformation.FindAsync(id);
            if (medicalInformation == null)
            {
                return NotFound();
            }
            return View(medicalInformation);
        }

        // POST: MedicalInformations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("RefId,SeatNo,Date,SurgeryInfo,PendingSurgery,Seizures,PressureSores,ExistingSores,PainDiscomfort,Sensation,Hearing,Vision,RespiratoryStatus,Notes")] MedicalInformation medicalInformation)
        {
            if (id != medicalInformation.RefId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(medicalInformation);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MedicalInformationExists(medicalInformation.RefId))
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
            return View(medicalInformation);
        }

        // GET: MedicalInformations/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var medicalInformation = await _context.MedicalInformation
                .FirstOrDefaultAsync(m => m.RefId == id);
            if (medicalInformation == null)
            {
                return NotFound();
            }

            return View(medicalInformation);
        }

        // POST: MedicalInformations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var medicalInformation = await _context.MedicalInformation.FindAsync(id);
            _context.MedicalInformation.Remove(medicalInformation);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool MedicalInformationExists(int id)
        {
            return _context.MedicalInformation.Any(e => e.RefId == id);
        }
    }
}
