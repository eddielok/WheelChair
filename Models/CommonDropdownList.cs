namespace WheelChair.Models
{
    public class CommonDropdownList
    {
        public string Value { get; set; }
        public string Name { get; set; }
        public CommonDropdownList(string v, string n)
        {
            Value = v;
            Name = n;
        } 
    }
}
