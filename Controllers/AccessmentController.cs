using Microsoft.AspNetCore.Mvc;
//added by ath
namespace WheelChair.Controllers {
    public class AccessmentController : Controller {
#nullable enable
        public IActionResult Index(string pageAction, string seatNo = "", string? workingForm = "", string? id = "") {
            ViewData["id"] = id;
            ViewData["pageAction"] = pageAction;
            ViewData["seatNo"] = seatNo;
            ViewData["workingForm"] = workingForm;
            return View();
        }
        public IActionResult AllAspect(string pageAction, string seatNo = "", string? workingForm = "") {
            ViewData["pageAction"] = pageAction;
            ViewData["seatNo"] = seatNo;
            ViewData["workingForm"] = workingForm;
            return View();
        }
#nullable disable
    }
}