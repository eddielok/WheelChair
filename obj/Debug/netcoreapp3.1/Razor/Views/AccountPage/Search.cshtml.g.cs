#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\AccountPage\Search.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b26d0ef0a6ca63e53762ccf3e9eca0c934185958"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_AccountPage_Search), @"mvc.1.0.view", @"/Views/AccountPage/Search.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b26d0ef0a6ca63e53762ccf3e9eca0c934185958", @"/Views/AccountPage/Search.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_AccountPage_Search : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\AccountPage\Search.cshtml"
  
    ViewData["Title"] = "Supplier Information";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"<div id=""displayContent""></div>

<script>document.head.innerHTML += `<link type=""text/css"" rel=""stylesheet"" href=""/css/React.css"">`;</script>

<script type=""text/javascript"">

    var queryPatientID = '';
    var Alert = ReactBootstrap.Alert ;
</script>
<!--   the form, itself -->
<script type=""module""");
            BeginWriteAttribute("src", " src=\"", 356, "\"", 447, 1);
#nullable restore
#line 14 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\AccountPage\Search.cshtml"
WriteAttributeValue("", 362, Url.Content("~/js/consumerComponent/accountInformation/account_information_get.jsx"), 362, 85, false);

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