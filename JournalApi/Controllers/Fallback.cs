using Microsoft.AspNetCore.Mvc;
using System.IO;


namespace JournalApi.Controllers
{
    public class Fallback:Controller
    {public IActionResult Index(){
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),"wwwroot","index.html"),"text/HTML");
    }
    }
}