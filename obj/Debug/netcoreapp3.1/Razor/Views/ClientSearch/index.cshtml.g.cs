#pragma checksum "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\ClientSearch\index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6cf1f376d8f66656b26f2d41e20c28d9f1d7dc4a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_ClientSearch_index), @"mvc.1.0.view", @"/Views/ClientSearch/index.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6cf1f376d8f66656b26f2d41e20c28d9f1d7dc4a", @"/Views/ClientSearch/index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab0cc8cbc74ab8ac089d08483557f91708d51e3b", @"/Views/_ViewImports.cshtml")]
    public class Views_ClientSearch_index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\ClientSearch\index.cshtml"
  
    ViewData["Title"] = " Client Information";
    Layout = "~/Views/Shared/_menu_Layout.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<div class=""container"">
    <div class=""col-*-12 p-3"" id=""clientSearchForm""></div>
</div>

<script>document.head.innerHTML += `<link type=""text/css"" rel=""stylesheet"" href=""/css/React.css"">`;</script>

<script type=""text/javascript"">
    var Alert = ReactBootstrap.Alert;
    var Tabs = ReactBootstrap.Tabs;
    var Tab = ReactBootstrap.Tab;
    var Toast = ReactBootstrap.Toast;
    var Suspense = React.Suspense;
</script>
<!--   the form, itself -->
<script type=""module""");
            BeginWriteAttribute("src", " src=\"", 577, "\"", 656, 1);
#nullable restore
#line 20 "C:\Users\eddie\Desktop\WheelChair-master\WheelChair\Views\ClientSearch\index.cshtml"
WriteAttributeValue("", 583, Url.Content("~/js/consumerComponent/clientSearch/ClientSearch_Main.jsx"), 583, 73, false);

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
