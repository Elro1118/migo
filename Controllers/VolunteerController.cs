using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using content;
using migo.Pages.Model;

namespace content.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class VolunteerController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public VolunteerController()
    {
      _context = new DatabaseContext();
    }

    // GET: api/Volunteer
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Volunteer>>> GetVolunteers()
    {
      return await _context.Volunteers.ToListAsync();
    }

    // GET: api/Volunteer/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Volunteer>> GetVolunteer(int id)
    {
      var volunteer = await _context.Volunteers.FindAsync(id);

      if (volunteer == null)
      {
        return NotFound();
      }

      return volunteer;
    }
    // GET: api/Volunteer/LocalId/
    // [HttpGet("LocalId/{id}")]
    // public async Task<ActionResult<Volunteer>> GetVolunteerForLocal(int id)
    // {
    //   var volunteer = await _context.Volunteers.Where(w => w.localId == id);

    //   if (volunteer == null)
    //   {
    //     return NotFound();
    //   }

    //   return volunteer;
    // }


    // PUT: api/Volunteer/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutVolunteer(int id, Volunteer volunteer)
    {
      if (id != volunteer.Id)
      {
        return BadRequest();
      }

      _context.Entry(volunteer).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!VolunteerExists(id))
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

    // POST: api/Volunteer
    [HttpPost]
    public async Task<ActionResult<Volunteer>> PostVolunteer(Volunteer volunteer)
    {
      _context.Volunteers.Add(volunteer);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetVolunteer", new { id = volunteer.Id }, volunteer);
    }

    // DELETE: api/Volunteer/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Volunteer>> DeleteVolunteer(int id)
    {
      var volunteer = await _context.Volunteers.FindAsync(id);
      if (volunteer == null)
      {
        return NotFound();
      }

      _context.Volunteers.Remove(volunteer);
      await _context.SaveChangesAsync();

      return volunteer;
    }

    private bool VolunteerExists(int id)
    {
      return _context.Volunteers.Any(e => e.Id == id);
    }
  }
}
