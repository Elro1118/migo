using System.Collections.Generic;
namespace migo.Pages.Model
{
  public class Rol
  {
    public int Id { get; set; }
    public string type { get; set; }

    //   Navegation properties
    public List<Client> Clients { get; set; } = new List<Client>();
  }
}