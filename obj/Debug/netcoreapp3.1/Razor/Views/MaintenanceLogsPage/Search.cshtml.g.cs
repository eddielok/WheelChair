#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\MaintenanceLogsPage\Search.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c3c2a649e10a2e3a999d2b4bfeec3b2f0b19f6ed"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_MaintenanceLogsPage_Search), @"mvc.1.0.view", @"/Views/MaintenanceLogsPage/Search.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c3c2a649e10a2e3a999d2b4bfeec3b2f0b19f6ed", @"/Views/MaintenanceLogsPage/Search.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_MaintenanceLogsPage_Search : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\MaintenanceLogsPage\Search.cshtml"
  
    ViewData["Title"] = "Maintenance_Log_InputForm";

#line default
#line hidden
#nullable disable
            WriteLiteral("<div id=\"displayContent\"></div>\n\n<script>document.head.innerHTML += \'<link type=\"text/css\" rel=\"stylesheet\" href=\"/css/React.css\">\';</script>\n\n<script type=\"text/javascript\">\n\n    var qFilterString = \'");
#nullable restore
#line 10 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\MaintenanceLogsPage\Search.cshtml"
                    Write(ViewData["filterString"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var Alert = ReactBootstrap.Alert;\n</script>\n<!--   the form, itself -->\n<script type=\"module\"");
            BeginWriteAttribute("src", " src=\"", 384, "\"", 473, 1);
#nullable restore
#line 14 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\MaintenanceLogsPage\Search.cshtml"
WriteAttributeValue("", 390, Url.Content("~/js/consumerComponent/MaintenanceLog/maintenance_log_get_table.jsx"), 390, 83, false);

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
