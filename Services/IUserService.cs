
using System.Threading.Tasks;

using migo.Pages.Model;



namespace migo.Services

{

  public interface IUserService

  {

    Task<Client> GetUserFromDatabase(System.Security.Claims.ClaimsPrincipal user);

  }

}