namespace migo.Pages.Model
{

  public class Volunteer
  {

    public int Id { get; set; }
    public string Name { get; set; }

    public string Telephone { get; set; }

    public string Email { get; set; } = null;

    public string Photo { get; set; } = null;

    //   Navegation properties
    public int localId { get; set; }

    public Local Local { get; set; }
  }

}
