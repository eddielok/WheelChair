using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NUnit.Framework;
using WheelChair.Models;

namespace WheelChair.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase {
        private readonly WheelChairContext _context;
        public CommonController(WheelChairContext context) {
            _context = context;
        }

        [HttpGet("{type}")]
        public IActionResult Get(string type) {
            var itemLists = new List<CommonDropdownList>();

            switch (type) {
                case "Suppliers":
                    itemLists = GetSuppliersDropDownList();
                    break;

                case "WheelChairModel":
                    itemLists = GetWheelChairModel();
                    break;

                case "SeatNoList":
                    itemLists = GetSeatNo();
                    break;

                case "Funding":
                    itemLists = GetFunding();
                    break;

            }

            return Ok(JsonConvert.SerializeObject(itemLists));
        }

#nullable enable
        [HttpGet("GetAsync/Data/{item}")]
        public async Task<IActionResult> GetAsync(string item, [FromQuery] string param, [FromQuery] string? lang = "eng") {

            switch (item) {
                case "loan": {
                        var r = await GetReportCommom(item, param, lang);
                        return Ok(r);
                    }
                case "getReportList": {
                        var r = await GetReportList(item, param, lang);
                        return Ok(r);
                    }
            }
            return BadRequest();
        }
#nullable disable

        private async Task<string> GetReportList(string type, string param, string language) {
            StringBuilder jsonResult = new StringBuilder();
            using (var command = _context.Database.GetDbConnection().CreateCommand()) {
                command.CommandText = " select  [value] from report where report = @param AND language = @language AND expires_date >= getdate() AND active_date<= getdate()  order by field asc";
                command.Parameters.Add(new SqlParameter("param", param));
                command.Parameters.Add(new SqlParameter("language", language));
                _context.Database.OpenConnection();
                using var result = await command.ExecuteReaderAsync();
                if (result.HasRows)
                    while (await result.ReadAsync()) {
                        jsonResult.Append(result.GetValue(0).ToString() + "(@BR)");
                    }
            }
            return jsonResult.ToString();
        }
        private async Task<string> GetReportCommom(string type, string param, string language) {
            StringBuilder jsonResult = new StringBuilder();
            using (var command = _context.Database.GetDbConnection().CreateCommand()) {
                command.CommandText = "select [field],[value] from report where report = @type AND language = @language AND expires_date >= getdate() AND active_date<= getdate() ;";
                command.Parameters.Add(new SqlParameter("type", type));
                command.Parameters.Add(new SqlParameter("language", language));
                _context.Database.OpenConnection();
                using var result = await command.ExecuteReaderAsync();
                if (result.HasRows) {
                    jsonResult.Append("{");
                    while (await result.ReadAsync()) {
                        //remove line-break character to save JSON
                        jsonResult.Append("\"" + result.GetValue(0).ToString() + "\":" + "\"" + result.GetValue(1).ToString().Replace("\r\n", "") + "\",");
                    }
                    jsonResult.Remove(jsonResult.Length - 1, 1);
                    jsonResult.Append("}");
                }
            }
            return jsonResult.ToString();
        }
        private List<CommonDropdownList> GetSuppliersDropDownList() {
            var suppliers = _context.Supplier.AsNoTracking();
            var itemLists = new List<CommonDropdownList>();
            itemLists.Add(new CommonDropdownList(string.Empty, string.Empty));
            foreach (Supplier supplier in suppliers) {
                var itemList = new CommonDropdownList(supplier.RefId.ToString(), supplier.Supplier1.ToString());
                itemLists.Add(itemList);
            }
            return itemLists;
        }

        private List<CommonDropdownList> GetWheelChairModel() {
            var wheelChairModels = _context.WheelchairSpecification;
            var itemLists = new List<CommonDropdownList>();
            itemLists.Add(new CommonDropdownList(string.Empty, string.Empty));
            foreach (WheelchairSpecification wheelChairModel in wheelChairModels) {
                var itemList = new CommonDropdownList(wheelChairModel.RefId.ToString(), wheelChairModel.WheelchairModel.ToString());
                itemLists.Add(itemList);
            }
            return itemLists;
        }


        private List<CommonDropdownList> GetSeatNo() {
            var clientInformations = _context.ClientInformation;
            var itemLists = new List<CommonDropdownList>();
            itemLists.Add(new CommonDropdownList(string.Empty, string.Empty));
            foreach (ClientInformation ClientInformation in clientInformations) {
                var itemList = new CommonDropdownList(ClientInformation.SeatNo.ToString(), ClientInformation.SeatNo.ToString());
                itemLists.Add(itemList);
            }
            return itemLists;
        }
        private List<CommonDropdownList> GetFunding() {
            var Ppmis = _context.Ppmi.Select(p => p.Funding).Distinct().OrderBy(f => f).Select(f => new CommonDropdownList(f, f)).ToList();
            Ppmis.Insert(0, new CommonDropdownList(string.Empty, string.Empty));
            return Ppmis;
        }
    }


}