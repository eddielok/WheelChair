using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class ClientSearchController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult ClientInformation(string pageAction, string seatNo )
        {
            ViewData["seatNo"] = seatNo;
            ViewData["pageAction"] = pageAction;
            return View();
        }
    }
}