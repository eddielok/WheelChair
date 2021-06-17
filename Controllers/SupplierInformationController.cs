using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class SupplierInformationController : Controller
    {

#nullable enable
        public IActionResult Index(string pageAction, string seatNo = "", string? workingForm = "", string? id = "")
        {
            ViewData["id"] = id;
            ViewData["pageAction"] = pageAction;
            ViewData["seatNo"] = seatNo;
            ViewData["workingForm"] = workingForm;
            return View();
        }
#nullable disable

        public IActionResult Search(string pid)
        {
            ViewData["pid"] = pid;
            return View();
        }



    }
}
