using System;

using System.Linq;

using System.Threading.Tasks;

using migo.Pages.Model;

using migo.Services;

using migo.ViewModels;

using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using content;

namespace migo.Controllers
{
  [Route("auth")]
  [ApiController]
  public class AuthController : ControllerBase
  {

    IAuthService authService;

    DatabaseContext db;

    public AuthController(IAuthService authService, DatabaseContext db)

    {

      this.db = db;

      this.authService = authService;

    }



    [HttpPost("login")]

    public async Task<ActionResult<AuthData>> Post([FromBody]LoginViewModel model)

    {

      if (!ModelState.IsValid) return BadRequest(ModelState);



      var user = await this.db.Clients.FirstOrDefaultAsync(f => f.Email == model.Email);



      if (user == null)

      {

        return BadRequest(new { email = "no user with this email" });

      }



      var passwordValid = authService.VerifyPassword(user, model.Password);

      if (!passwordValid)

      {

        return BadRequest(new { password = "invalid password" });

      }

      user.LastLoggedIn = DateTime.Now;

      await this.db.SaveChangesAsync();

      return authService.GetAuthData(user);

    }



    [HttpPost("register")]

    public async Task<ActionResult<AuthData>> Post([FromBody]SignUp model)
    {

      if (!ModelState.IsValid) return BadRequest(ModelState);

      var alreadyExists = await this.db.Clients.AnyAsync(a => a.Email == model.Email);

      if (alreadyExists) return BadRequest(new { username = "user with this email already exists" });

      var user = new Client
      {
        Email = model.Email,
        Name = model.Name,
        Telephone = model.Phone,
        DateCreated = model.DateCreated,
        RolId = model.RolId,
        Active = model.Active
      };

      user.Password = authService.HashPassword(user, model);
      this.db.Clients.Add(user);
      await this.db.SaveChangesAsync();
      return authService.GetAuthData(user);

    }
  }
}