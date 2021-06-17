using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WheelChair.Controllers
{
    public class LoanInformationPageController : Controller
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

        public IActionResult Search(string? loanNumber = "", string? seatNo = "")
        {
            ViewData["loanNumber"] = loanNumber;
            ViewData["seatNo"] = seatNo;
            return View();
        }
        public IActionResult PrintaLoan(string? loanNumber = "" , string? language = "") {
            ViewData["loanNumber"] = loanNumber; 
            ViewData["language"] = language; 
            return View();
        }
#nullable disable
    }


}