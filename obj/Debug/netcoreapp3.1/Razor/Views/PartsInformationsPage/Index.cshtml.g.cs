#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ad5a776295bb9b3fbdee3cf9cd42a3cc7a3404c4"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_PartsInformationsPage_Index), @"mvc.1.0.view", @"/Views/PartsInformationsPage/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\_ViewImports.cshtml"
using WheelChair;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\_ViewImports.cshtml"
using WheelChair.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\_ViewImports.cshtml"
using React.AspNet;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ad5a776295bb9b3fbdee3cf9cd42a3cc7a3404c4", @"/Views/PartsInformationsPage/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_PartsInformationsPage_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\n");
#nullable restore
#line 2 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
  
    ViewData["Title"] = "Part_Information_InputForm";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container"">
    <div class=""row"">
        <div class=""col-xl-12 p-3"" id=""contentForm""></div>
    </div>
</div>

<script>document.head.innerHTML += `<link type=""text/css"" rel=""stylesheet"" href=""/css/React.css"">`;</script>

<script type=""text/javascript"">

    var Alert = ReactBootstrap.Alert;
    var Toast = ReactBootstrap.Toast;
    var Tabs = ReactBootstrap.Tabs ;
    var Tab = ReactBootstrap.Tab ;
    var qId = '");
#nullable restore
#line 20 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
          Write(ViewData["id"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qAction = \'");
#nullable restore
#line 21 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
              Write(ViewData["pageAction"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qSeatNo = \'");
#nullable restore
#line 22 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
              Write(ViewData["seatNo"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qWorkingForm = \'");
#nullable restore
#line 23 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
                   Write(ViewData["workingForm"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n</script>\n<!--   the form, itself -->\n<script type=\"module\"");
            BeginWriteAttribute("src", " src=\"", 705, "\"", 789, 1);
#nullable restore
#line 26 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PartsInformationsPage\Index.cshtml"
WriteAttributeValue("", 711, Url.Content("~/js/consumerComponent/PartInformation/part_information_cu.jsx"), 711, 78, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></script>\n\n\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
