using System.Threading.Tasks;

using migo.Pages.Model;

using content;

using Microsoft.EntityFrameworkCore;



namespace migo.Services

{

  public class UserService : IUserService

  {

    private readonly DatabaseContext db;



    public UserService(DatabaseContext db)

    {

      this.db = db;

    }



    public async Task<Client> GetUserFromDatabase(System.Security.Claims.ClaimsPrincipal user)

    {

      var userName = user?.Identity?.Name;

      var currentUser = await this.db.Clients.FirstOrDefaultAsync(f => f.Name == userName);

      currentUser.Password = null;

      return currentUser;

    }

  }

}