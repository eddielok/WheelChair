using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class WorkOrderPageController : Controller
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
        public IActionResult Edit(string pageAction, string id = "", string? workingForm = "", string? seatNo = "")
        {
            ViewData["pageAction"] = pageAction;
            ViewData["id"] = id;
            ViewData["seatNo"] = seatNo;
            ViewData["workingForm"] = workingForm;
            return View();
        }
#nullable disable
    }
}