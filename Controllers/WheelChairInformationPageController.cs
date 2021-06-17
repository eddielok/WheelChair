using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class WheelChairInformationPageController : Controller
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


        public IActionResult Search(string pid)
        {
            ViewData["pid"] = pid;
            return View();
        }

#nullable disable
    }
}