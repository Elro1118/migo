using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using content;
using migo.Pages.Model;
using Microsoft.AspNetCore.Authorization;
using Geocoding.Google;
using Geocoding;

namespace content.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LocalController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public LocalController()
    {
      _context = new DatabaseContext();
    }

    // GET: api/Local
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Local>>> GetLocals()
    {
      return await _context.Locals.ToListAsync();
    }

    // GET: api/Local/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Local>> GetLocal(int id)
    {
      var local = await _context.Locals.FindAsync(id);

      if (local == null)
      {
        return NotFound();
      }

      return local;
    }

    // GET: api/Local/clientId/
    [HttpGet("ClientId/{id}")]
    [Authorize]
    public async Task<ActionResult<List<Local>>> GetLocalsForClient(int id)
    {
      var local = await _context.Locals.Where(w => w.ClientId == id).OrderBy(o => o.Name).ToListAsync();

      if (local == null)
      {
        return NotFound();
      }

      return local;
    }

    // PUT: api/Local/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutLocal(int id, Local local)
    {
      if (id != local.Id)
      {
        return BadRequest();
      }

      _context.Entry(local).State = EntityState.Modified;
      IGeocoder geocoder = new GoogleGeocoder() { ApiKey = "AIzaSyBspmkDaTr3qyTe6fXB5qT6MCQKiABCTKc" };
      IEnumerable<Address> addresses = await geocoder.GeocodeAsync(local.Address + ' ' + local.City + ' ' + local.State + ' ' + local.State);
      local.Latitude = addresses.First().Coordinates.Latitude;
      local.Longitude = addresses.First().Coordinates.Longitude;


      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!LocalExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Local
    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Local>> PostLocal(Local local)
    {
      //TODO: geocode the address
      IGeocoder geocoder = new GoogleGeocoder() { ApiKey = "AIzaSyBspmkDaTr3qyTe6fXB5qT6MCQKiABCTKc" };
      IEnumerable<Address> addresses = await geocoder.GeocodeAsync(local.Address + ' ' + local.City + ' ' + local.State + ' ' + local.State);
      local.Latitude = addresses.First().Coordinates.Latitude;
      local.Longitude = addresses.First().Coordinates.Longitude;

      Console.WriteLine("Formatted: " + addresses.First().FormattedAddress); //Formatted: 1600 Pennsylvania Ave SE, Washington, DC 20003, USA
      Console.WriteLine("Coordinates: " + addresses.First().Coordinates.Latitude + ", " + addresses.First().Coordinates.Longitude); //Coordinates: 38.8791981, -76.9818437

      _context.Locals.Add(local);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetLocal", new { id = local.Id }, local);
    }

    // DELETE: api/Local/5
    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<Local>> DeleteLocal(int id)
    {
      var local = await _context.Locals.FindAsync(id);
      if (local == null)
      {
        return NotFound();
      }

      _context.Locals.Remove(local);
      await _context.SaveChangesAsync();

      return local;
    }

    private bool LocalExists(int id)
    {
      return _context.Locals.Any(e => e.Id == id);
    }
  }
}
