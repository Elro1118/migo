

using migo.Pages.Model;

using migo.ViewModels;



namespace migo.Services

{

  public interface IAuthService

  {

    AuthData GetAuthData(Client user);

    string HashPassword(Client user, SignUp data);

    bool VerifyPassword(Client user, string providedPassword);

  }

}