namespace migo.Pages.Model
{
  public class Comment
  {
    public int Id { get; set; }

    public string Description { get; set; }
    public bool Active { get; set; }
    //   Navegation properties
    public int localId { get; set; }

    public Local Local { get; set; }
  }

}