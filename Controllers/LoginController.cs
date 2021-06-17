using System;
using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class LoginController : Controller {
#nullable enable
        public IActionResult Index(  string? redirect = "") {
            ViewData["redirect"] = redirect;
            return View();
        }
#nullable disable
    }
}