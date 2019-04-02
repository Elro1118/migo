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
  public class RolController : ControllerBase
  {
    private readonly DatabaseContext _context;

    public RolController()
    {
      _context = new DatabaseContext();
    }

    // GET: api/Rol
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
    {
      return await _context.Roles.ToListAsync();
    }

    // GET: api/Rol/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Rol>> GetRol(int id)
    {
      var rol = await _context.Roles.FindAsync(id);

      if (rol == null)
      {
        return NotFound();
      }

      return rol;
    }

    // PUT: api/Rol/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRol(int id, Rol rol)
    {
      if (id != rol.Id)
      {
        return BadRequest();
      }

      _context.Entry(rol).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RolExists(id))
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

    // POST: api/Rol
    [HttpPost]
    public async Task<ActionResult<Rol>> PostRol(Rol rol)
    {
      _context.Roles.Add(rol);
      await _context.SaveChangesAsync();

      return CreatedAtAction("GetRol", new { id = rol.Id }, rol);
    }

    // DELETE: api/Rol/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Rol>> DeleteRol(int id)
    {
      var rol = await _context.Roles.FindAsync(id);
      if (rol == null)
      {
        return NotFound();
      }

      _context.Roles.Remove(rol);
      await _context.SaveChangesAsync();

      return rol;
    }

    private bool RolExists(int id)
    {
      return _context.Roles.Any(e => e.Id == id);
    }
  }
}
