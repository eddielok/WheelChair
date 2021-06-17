using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WheelChair.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;

namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginRestfulController : Controller
    {
        private readonly WheelChairContext _context;

        public UserLoginRestfulController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok();

        }

        [HttpGet("{username}/{password}")]
        public IActionResult Get(string username, string password)
        {
            //Use EncrytedPasswoed
            var encrytedPassword = new EncrytedPassword();
            var ecocdePassword = encrytedPassword.HMACSHA256(password);

            var userLogin = _context.UserLogin.FirstOrDefault(x => x.UserName == username && x.Password == ecocdePassword);

            if (userLogin == null)
            {
                return Unauthorized();
            }

            return Ok(JsonConvert.SerializeObject(userLogin));
        }

        [HttpPost]
        public IActionResult Get(UserLogin userLogin)
        {
            userLogin.Id = 0;

            var encrytedPassword = new EncrytedPassword();
            var ecocdePassword = encrytedPassword.HMACSHA256(userLogin.Password);
            userLogin.Password = ecocdePassword;

            _context.UserLogin.Add(userLogin);
            _context.SaveChanges();

            var location = "../UserLogin/" + userLogin.Id;

            return Created(location, userLogin);
        }

        [HttpPut]
        public IActionResult Put(UserLogin userLogin)
        {

            try
            {
                var encrytedPassword = new EncrytedPassword();
                var ecocdePassword = encrytedPassword.HMACSHA256(userLogin.Password);
                userLogin.Password = ecocdePassword;
                    
                _context.UserLogin.Update(userLogin);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return this.StatusCode(304);
            }
            return this.StatusCode(202);
        }

        [HttpDelete("{Id}")]
        public IActionResult Delete(int Id)
        {
            try
            {
                var userLogin = _context.UserLogin.FirstOrDefault(x => x.Id == Id);
                _context.UserLogin.Remove(userLogin);
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return this.StatusCode(304);
            }


            return this.StatusCode(204);
        }

    }
}
