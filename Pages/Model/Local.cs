using System.Collections.Generic;

namespace migo.Pages.Model
{
  public class Local
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }

    public string City { get; set; }

    public string State { get; set; } = "Florida";
    public int Zipcode { get; set; }
    public string Schedule { get; set; }
    public bool Active { get; set; }

    //   Navegation properties
    public int ClientId { get; set; }
    public Client Client { get; set; }
    public List<Volunteer> Volunteers { get; set; } = new List<Volunteer>();
    public List<Comment> Comments { get; set; } = new List<Comment>();
  }
}