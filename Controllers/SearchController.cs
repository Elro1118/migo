using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using migo.Pages.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace content.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class SearchController : ControllerBase
  {

    private DatabaseContext db;
    public SearchController()
    {
      this.db = new DatabaseContext();

    }

    [HttpGet("locals")]
    public ActionResult<List<Volunteer>> SearchForPicture([FromQuery] string query)
    {
      query = query.ToLower();
      var checkingForZipCode = int.TryParse(query, out var zipCode);
      var results = db.Locals.AsQueryable();
      if (checkingForZipCode)
      {
        results = results.Where(w => w.Zipcode == zipCode);
      }
      else
      {
        results = db.Locals.Where(w => w.City.ToLower().Contains(query) || w.State.ToLower().Contains(query));
      }
      return Ok(new { SearchingFor = query, results = results, checkingForZipCode });
    }

  }
}
