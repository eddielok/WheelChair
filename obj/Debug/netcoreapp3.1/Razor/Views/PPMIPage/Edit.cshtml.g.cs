#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e902f437b558de96a3264227128b7eeeeeac07d1"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_PPMIPage_Edit), @"mvc.1.0.view", @"/Views/PPMIPage/Edit.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e902f437b558de96a3264227128b7eeeeeac07d1", @"/Views/PPMIPage/Edit.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_PPMIPage_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
  
    ViewData["Title"] = "PPMI";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div id=""contentForm""></div>

<script>document.head.innerHTML += `<link type=""text/css"" rel=""stylesheet"" href=""/css/React.css"">`;</script>

<script type=""text/javascript"">

    var Alert = ReactBootstrap.Alert ;
    var Tabs = ReactBootstrap.Tabs ;
    var Toast =  ReactBootstrap.Toast;
    var Tab = ReactBootstrap.Tab;  
    var qSeatNo = '");
#nullable restore
#line 14 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
              Write(ViewData["seatNo"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';  \n    var qId = \'");
#nullable restore
#line 15 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
          Write(ViewData["id"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';  \n    var qAction = \'");
#nullable restore
#line 16 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
              Write(ViewData["pageAction"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\'; \n    var qWorkingForm = \'");
#nullable restore
#line 17 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
                   Write(ViewData["workingForm"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n</script>\n<!--   the form, itself -->\n<script type=\"module\"");
            BeginWriteAttribute("src", " src=\"", 595, "\"", 656, 1);
#nullable restore
#line 20 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\PPMIPage\Edit.cshtml"
WriteAttributeValue("", 601, Url.Content("~/js/consumerComponent/PPMI/PPMI_cu.jsx"), 601, 55, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></script>\n");
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
