using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
    public class ClientInformationsRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public ClientInformationsRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var ClientInformations = _context.ClientInformation.ToListAsync();
            //return JsonConvert.SerializeObject(ClientInformations.Result);

            return Ok(JsonConvert.SerializeObject(ClientInformations.Result));

        }

        [HttpGet("{seatNo}")]
        public IActionResult Get(string seatNo)
        {
            var ClientInformations = _context.ClientInformation.FirstOrDefault(x => x.SeatNo == seatNo);
            //return JsonConvert.SerializeObject(ClientInformations.Result);

            return Ok(JsonConvert.SerializeObject(ClientInformations));
        }

        [HttpGet("age/{seatNo}",Name= "ClientInformationsGetAgeBySeatNo")]//By Ath 
        public async Task<IActionResult> GetAge(string seatNo)
        {
            var ClientInformations = await _context.ClientInformation
                                                    .Where(x => x.SeatNo == seatNo)
                                                    .AsNoTracking()
                                                    .ToListAsync();
            DateTime dob = ClientInformations.FirstOrDefault().Dob;
            DateTime now = DateTime.Now;
            int age = (now.Year == dob.Year) ? 0 : (now.Year - dob.Year) + ((now.Month > dob.Month) || (now.Month == dob.Month) && (now.Day > dob.Day) ? 1 : 0);
            return Ok(JsonConvert.SerializeObject(age));
        }
        [HttpGet("dob/{seatNo}", Name = "ClientInformationsGetDobBySeatNo")]//By Ath 
        public async Task<IActionResult> GetDOB(string seatNo)
        {
            var ClientInformations = await _context.ClientInformation
                                                    .Where(x => x.SeatNo == seatNo)
                                                    .AsNoTracking()
                                                    .ToListAsync();
            DateTime dob = ClientInformations.FirstOrDefault().Dob;
            return Ok(JsonConvert.SerializeObject(dob));
        } 
        [HttpPost]
        public IActionResult Post(ClientInformation clientInformation)
        {
            //Remove SeatNo
            //return ClientInformation.SeatNo
            //var latestSeatNo = _context.ClientInformation.OrderByDescending(x => x.SeatNo).FirstOrDefault().SeatNo;
            //ClientInformation.SeatNo = latestSeatNo + 1;

            var latestSeatNo = GetLatestSeatNo();
            clientInformation.SeatNo = latestSeatNo;
             
          // var context = new ValidationContext(clientInformation);
          //  
          // var validationResults = new List<ValidationResult>();
          //  
          // bool isValid = Validator.TryValidateObject(clientInformation, context, validationResults, true);


            _context.Add(clientInformation);
            _context.SaveChanges();

            var location = "../ClientInformations/" + latestSeatNo;
            
            return Created(location, clientInformation);
        }

        private string GetLatestSeatNo()
        {
            var latestSeatNo = _context.ClientInformation.OrderByDescending(x => x.SeatNo).FirstOrDefault().SeatNo;
            var serialsNumber = latestSeatNo.Substring(6, 5);
            var lastSerialsNumber = Int16.Parse(serialsNumber) + 1;
            var yearString = DateTime.Now.ToString("yy");
            var prefix = "SEAT"; 
            return prefix + yearString + lastSerialsNumber;
        }

        [HttpPut]
        public IActionResult Put(ClientInformation ClientInformation)
        {

            try
            {
                _context.Update(ClientInformation);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientInformationExists(ClientInformation.SeatNo))
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

        [HttpDelete("{seatNo}")]
        public IActionResult Delete(int seatNo)
        {

            var ClientInformation = _context.ClientInformation.Find(seatNo);
            _context.ClientInformation.Remove(ClientInformation);
            _context.SaveChanges();

            return this.StatusCode(204);
        }


        private bool ClientInformationExists(string seatNo)
        {
            return _context.ClientInformation.Any(e => e.SeatNo == seatNo);
        }


    }
}