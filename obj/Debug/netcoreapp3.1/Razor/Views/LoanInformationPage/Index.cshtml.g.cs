#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "882f826db7bba2a1efcb7b3bd6abf4e6ab148e2b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_LoanInformationPage_Index), @"mvc.1.0.view", @"/Views/LoanInformationPage/Index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"882f826db7bba2a1efcb7b3bd6abf4e6ab148e2b", @"/Views/LoanInformationPage/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_LoanInformationPage_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\n");
#nullable restore
#line 2 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
  
    ViewData["Title"] = "Loan record";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container""> 
        <div class=""col-xl-12 p-3"" id=""contentForm""></div> 
</div>

<script>document.head.innerHTML += `<link type=""text/css"" rel=""stylesheet"" href=""/css/React.css"">`;</script>

<script type=""text/javascript"">

    var Alert = ReactBootstrap.Alert ;
    var Toast =  ReactBootstrap.Toast; 
    var Button = ReactBootstrap.Button;
    var Spinner = ReactBootstrap.Spinner; 
    var qId = '");
#nullable restore
#line 18 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
          Write(ViewData["id"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qAction = \'");
#nullable restore
#line 19 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
              Write(ViewData["pageAction"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qSeatNo = \'");
#nullable restore
#line 20 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
              Write(ViewData["seatNo"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n    var qWorkingForm = \'");
#nullable restore
#line 21 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
                   Write(ViewData["workingForm"]);

#line default
#line hidden
#nullable disable
            WriteLiteral("\';\n</script>\n<!--   the form, itself -->\n<script type=\"module\"");
            BeginWriteAttribute("src", " src=\"", 673, "\"", 747, 1);
#nullable restore
#line 24 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\LoanInformationPage\Index.cshtml"
WriteAttributeValue("", 679, Url.Content("~/js/consumerComponent/LoanRecord/loan_record_cu.jsx"), 679, 68, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></script>\n\n");
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
