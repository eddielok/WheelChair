using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WheelChair.Models
{
    public class ClientInformationSearch
    {
        public string SeatNo { get; set; }
        public string Hkid { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string ChineseName { get; set; }
        public string LoanNo { get; set; }
        public string LoanWheelChairNo { get; set; }
        public int? WheelchairWidth_base { get; set; }
        public int? WheelchairWidth_upper { get; set; }
        public int? WheelchairDepth_base { get; set; }
        public int? WheelchairDepth_upper { get; set; }
        public int? PandaSize_base { get; set; }
        public int? WheelchairPandaSize_upper { get; set; }
        public bool IsShowAll { get; set; }
        public bool? IsRearWheel_S { get; set; }
        public bool? IsRearWheel_L { get; set; }
        public bool? IsFoldable { get; set; }
        public bool? IsPower { get; set; }
        public bool? IsElevateFootrest { get; set; }
        public bool? IsRecliner { get; set; }
        public bool? IsTilt { get; set; }
        public bool? IsFilterWCResultBySpec { get; set; }
    }
}
