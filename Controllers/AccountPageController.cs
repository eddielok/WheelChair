using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class AccountPageController : Controller
    {
#nullable enable
        public IActionResult Index(string pageAction, string username = "", string? workingForm = "", string? id = "")
        {
            ViewData["id"] = id;
            ViewData["pageAction"] = pageAction;
            ViewData["userName"] = username;
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