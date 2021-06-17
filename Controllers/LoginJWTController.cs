using System;
using System.Collections.Generic;
using System.Linq; 
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WheelChair.Models;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class LoginJWTController : ControllerBase {
        private readonly IConfiguration _config;
        private readonly WheelChairContext _context;
         
        private List<User> appUsers = new List<User>{
            new User { FullName = "Vaibhav Bhapkar", UserName = "Admin", Password = "1234", UserRole = "Admin" },
            new User { FullName = "Test User", UserName = "User", Password = "1234", UserRole = "User" }
            };
         
        public LoginJWTController(IConfiguration config, WheelChairContext context) {
            _config = config;
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] User login) {
            IActionResult response = Unauthorized();

            UserLogin user = AuthenticateUser(login);
            if (user != null) {
                var tokenString = GenerateJWTToken(user);
                response = Ok(new {
                    token = tokenString,
                    userDetails = user,
                });
            }
            return response;
        }
        UserLogin AuthenticateUser(User loginCredentials) { 
            //20200818 Change to get DB
            //User user = appUsers.SingleOrDefault(x => x.UserName == loginCredentials.UserName && x.Password == loginCredentials.Password);
            //Use EncrytedPasswoed
            var encrytedPassword = new EncrytedPassword();
            var ecocdePassword = encrytedPassword.HMACSHA256(loginCredentials.Password);

            UserLogin userLogin = _context.UserLogin.SingleOrDefault(x => x.UserName == loginCredentials.UserName && x.Password == ecocdePassword);
             
            return userLogin;
        }
        string GenerateJWTToken(UserLogin userInfo) {

            var jetSecretKey = _config["Jwt:SecretKey"];
            var issuer = _config["Jwt:Issuer"];
            var audience = _config["Jwt:Audience"];

            //var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt: SecretKey"]));
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jetSecretKey));

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
             
            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.UserName),
                new Claim("fullName", userInfo.FullName.ToString()),
                new Claim("role",userInfo.UserRole),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            //"https://localhost:44349"
            //issuer: _config["Jwt: Issuer"],
            //audience: _config["Jwt: Audience"],

            var token = new JwtSecurityToken(
              issuer: issuer,
              audience: audience,
              claims: claims,
              expires: DateTime.Now.AddMinutes(10),
              signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}
