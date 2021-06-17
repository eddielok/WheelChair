using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using WheelChair.Models; 
namespace WheelChair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly WheelChairContext _context;

        public AccountController(WheelChairContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public IActionResult Get()
        {
            var account = _context.Account.ToListAsync();
            return Ok(JsonConvert.SerializeObject(account.Result));

        }

        [HttpGet("{username}")]
        public IActionResult Get(string username)
        {
            var account = _context.Account.FirstOrDefault(x => x.UserName == username);

            if (account == null)
                return Unauthorized();

            return Ok(JsonConvert.SerializeObject(account));

        }


        [HttpGet("{username}/{password}")]
        public IActionResult Get(string username, string password)
        {

            var passwordSHA = GetHMACSHA1Text(password);
            var isAccount = _context.Account.Any(x => x.UserName == username && x.Password == passwordSHA);

            if (isAccount)
                return Ok();

            return Unauthorized();
        }

        [HttpPost]
        public IActionResult Post(Account Account)
        {

            //account.UserName = username;
            //account.Password = GetHMACSHA1Text(password);
            //account.CreatedBy = userBy;
            //account.CreatedDate = DateTime.Now;
            //account.ModifiedBy = userBy;
            //account.ModifiedDate = DateTime.Now;

            Account.Password = GetHMACSHA1Text(Account.Password);
            Account.Id = null ;

            _context.Add(Account);
            _context.SaveChanges();

            Account = _context.Account.FirstOrDefault(x => x.UserName == Account.UserName);


            var location = "../Accounts/" + Account.Id.ToString();

            return Created(location, Account);
        }

        [HttpPut]
        public IActionResult PUT(Account Account)
        {

            var account = _context.Account.FirstOrDefault(x => x.UserName == Account.UserName);

            if (account == null)
                return Unauthorized();

            account.Password = GetHMACSHA1Text(Account.Password);
            account.ModifiedBy = Account.ModifiedBy;
            account.ModifiedDate = DateTime.Now;

            _context.Account.Update(account);
            _context.SaveChanges();

            var location = "../Accounts/" + account.Id.ToString();

            return Created(location, account);
        }

        private string GetHMACSHA1Text(string EncryptText)
        {
            string EncryptKey = "WheelChairIsCreatedBy123456#";

            HMACSHA1 hmacsha1 = new HMACSHA1();
            hmacsha1.Key = System.Text.Encoding.ASCII.GetBytes(EncryptKey);
            byte[] dataBuffer = System.Text.Encoding.ASCII.GetBytes(EncryptText);
            byte[] hashBytes = hmacsha1.ComputeHash(dataBuffer);
            return Convert.ToBase64String(hashBytes);

        }



    }
}