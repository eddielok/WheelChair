using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WheelChair.Models
{
    public class WheelchairInformationsSearch
    {
        public double? SeatWidth { get; set; }
        public double? SeatDepth { get; set; }
        public bool? TiltInSpace { get; set; }
        public bool? Recliner { get; set; }
        public bool? ElevatingFr { get; set; }
        public bool? Power { get; set; }
        public bool? Foldable { get; set; }
        public string RearWheelSize { get; set; }
        public float? PandaSize { get; set; }
        public bool Availability { get; set; }
    }
}
