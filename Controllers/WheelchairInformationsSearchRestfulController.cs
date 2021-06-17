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
    public class WheelchairInformationsSearchRestfulController : Controller
    {
        private readonly WheelChairContext _context;


        public WheelchairInformationsSearchRestfulController(WheelChairContext context)
        {
            _context = context;
        }

       [HttpPost]
        public IActionResult Post(WheelchairInformationsSearch wheelchairInformationsSearch)
        {
            //var ClientInformations = _context.ClientInformation.FirstOrDefault(x => x.SeatNo == seatNo);
            //return JsonConvert.SerializeObject(ClientInformations.Result);
            var wheelchairInformations = _context.WheelchairInformation.Where(x => 1 == 1).ToList();
            var wheelchairSpecifications = _context.WheelchairSpecification.Where(x => 1 == 1).ToList();
            //var wheelchairDimensions = _context.WheelchairDimension.Where(x => 1 == 1).ToList();

            // join wheelchairDimension in wheelchairDimensions on wheelchairSpecification.RefId equals wheelchairDimension.RefId

            var query = from wheelchairInformation in wheelchairInformations
                        join wheelchairSpecification in wheelchairSpecifications on wheelchairInformation.WheelchairModel equals wheelchairSpecification.WheelchairModel           
                        select new
                        {
                            wheelchairNo = wheelchairInformation.WheelchairNo,
                            wheelchairModel = wheelchairInformation.WheelchairModel,
                            status = wheelchairInformation.Status,
                            supplier = wheelchairInformation.Supplier,
                            seatWidth = wheelchairInformation.SeatWidth,
                            seatDepth = wheelchairInformation.SeatDepth,
                            tiltInSpace = wheelchairSpecification.TiltInSpace,
                            recliner = wheelchairInformation.Recliner,
                            elevatingFr = wheelchairInformation.ElevatingFr,
                            power = wheelchairSpecification.Power,
                            foldable = wheelchairSpecification.Foldable,
                            rearWheelSize = wheelchairInformation.RearWheelSize,
                            pandaSize = wheelchairInformation.PandaSize,
                            avaliability = wheelchairInformation.Availability
                        };


            if (wheelchairInformationsSearch.SeatWidth != null) {
                query = query.Where(x => x.seatWidth == wheelchairInformationsSearch.SeatWidth);
            }

            if (wheelchairInformationsSearch.SeatDepth != null)
            {
                query = query.Where(x => x.seatDepth == wheelchairInformationsSearch.SeatDepth);
            }

            if (wheelchairInformationsSearch.TiltInSpace != null)
            {
                query = query.Where(x => x.tiltInSpace == wheelchairInformationsSearch.TiltInSpace);
            }

            if (wheelchairInformationsSearch.Recliner != null)
            {
                query = query.Where(x => x.recliner == wheelchairInformationsSearch.Recliner);
            }

            if (wheelchairInformationsSearch.ElevatingFr != null)
            {
                query = query.Where(x => x.elevatingFr == wheelchairInformationsSearch.ElevatingFr);
            }

            if (wheelchairInformationsSearch.Power != null)
            {
                query = query.Where(x => x.power == wheelchairInformationsSearch.Power);
            }

            if (wheelchairInformationsSearch.Foldable != null)
            {
                query = query.Where(x => x.foldable == wheelchairInformationsSearch.Foldable);
            }

            if (string.IsNullOrEmpty(wheelchairInformationsSearch.RearWheelSize))
            {
                query = query.Where(x => x.rearWheelSize == wheelchairInformationsSearch.RearWheelSize);
            }

            if (wheelchairInformationsSearch.PandaSize != null)
            {
                query = query.Where(x => x.pandaSize == wheelchairInformationsSearch.PandaSize);
            }

            if (wheelchairInformationsSearch.Availability == true) {
                query = query.Where(x => x.avaliability == true);
            }

            return Ok(JsonConvert.SerializeObject(query.ToList()));

  //          {
  //              "seatWidth": 10,
  //"seatDepth": null,
  //"tiltInSpace": null,
  //"recliner": null,
  //"elevatingFr": null,
  //"power": null,
  //"foldable": null,
  //"rearWheelSize": null,
  //"pandaSize": null,
  //"availability": true
  //          }
        }


    }
}