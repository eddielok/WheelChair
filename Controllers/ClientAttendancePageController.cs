using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class ClientAttendancePageController : Controller
    {
#nullable enable
        public IActionResult Index(string pageAction, string? workingForm = "", string? id = "", string? seatNo = "")
        {
            ViewData["id"] = id;
            ViewData["pageAction"] = pageAction;
            ViewData["workingForm"] = workingForm;
            ViewData["seatNo"] = seatNo;
            return View();
        }
#nullable disable
    }
}