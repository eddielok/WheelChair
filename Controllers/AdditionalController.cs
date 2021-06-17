using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NUnit.Framework;
using WheelChair.Models;

namespace WheelChair.Controllers {

    public class AdditionalClass {
        public string Key { get; set; }
        public string Value { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]

    public class AdditionalController : ControllerBase {
        private readonly WheelChairContext _context;
        public AdditionalController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get(string classType, string classId) {
            var additionalClass = new List<AdditionalClass>();
            if ( classType == null || string.IsNullOrEmpty(classType.Trim()) ||
                classId == null || string.IsNullOrEmpty(classId.Trim())) {
                return BadRequest("both class type and class id must be filled");
            }

            switch (classType) {
                case "WheelChairInfomation":
                    additionalClass = GetWheelChairInfomation(classId);
                    break;
            }

            return Ok(JsonConvert.SerializeObject(additionalClass));
        }

        private List<AdditionalClass> GetWheelChairInfomation(string id) {

            var wheelchairSpecification = _context.WheelchairSpecification.Where(x => x.WheelchairModel == id).FirstOrDefault();

            if (wheelchairSpecification == null) throw new ArgumentNullException("Missing wheelchair Specification !!");

            var power = new AdditionalClass() { Key = "Power", Value = wheelchairSpecification.Power.ToString() };
            var titleInSpace = new AdditionalClass() { Key = "TiltInSpace", Value = wheelchairSpecification.TiltInSpace.ToString() };
            var folderable = new AdditionalClass() { Key = "Foldable", Value = wheelchairSpecification.Foldable.ToString() };

            var additionalClasses = new List<AdditionalClass>();

            additionalClasses.Add(power);
            additionalClasses.Add(titleInSpace);
            additionalClasses.Add(folderable);
            return additionalClasses;
        }

    }
}