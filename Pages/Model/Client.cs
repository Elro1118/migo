using System;
using System.Collections.Generic;

namespace migo.Pages.Model
{
  public class Client
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Telephone { get; set; }
    public string Email { get; set; }

    public string Password { get; set; }


    public DateTime? DateCreated { get; set; } = DateTime.Now;

    public DateTime? LastLoggedIn { get; set; } = DateTime.Now;

    public bool Active { get; set; }

    //   Navegation properties
    public int RolId { get; set; }
    public Rol Rol { get; set; }
    public List<Local> Locals { get; set; } = new List<Local>();
  }


}