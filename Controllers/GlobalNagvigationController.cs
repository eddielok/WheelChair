using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class GlobalNagvigationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult IndexTwoLayout()
        {
            return View();
        }

        public IActionResult ClientInfomationSubMenu() {

            return View();
        }

        public IActionResult WheelChairBlankSubMenu() {
            return View();
        }

        public IActionResult ExpenditureSubMenu() {
            return View();
        }

        public IActionResult StatisticsSubMenu() {
            return View();
        }

    }
}