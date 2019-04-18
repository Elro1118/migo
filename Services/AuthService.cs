
using System;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

using migo.Pages.Model;

using migo.Services.Settings;

using migo.ViewModels;

using Microsoft.AspNetCore.Identity;

using Microsoft.Extensions.Options;

using Microsoft.IdentityModel.Tokens;


namespace migo.Services
{
  public class AuthService : IAuthService

  {



    private double jwtLifespan;

    private string jwtSecret;



    public AuthService(IOptions<AuthSettings> settings)

    {

      this.jwtLifespan = settings.Value.JwtLifespan;
      this.jwtSecret = settings.Value.JwtToken;

    }



    public AuthData GetAuthData(Client user)
    {
      var expirationTime = DateTime.UtcNow.AddSeconds(jwtLifespan);
      var tokenDescriptor = new SecurityTokenDescriptor
      {

        Subject = new ClaimsIdentity(new[]
             {

            new Claim(ClaimTypes.Name, user.Name),

            new Claim(ClaimTypes.Gender, "non-binary"),

            new Claim("id", user.Id.ToString())

        }),

        Expires = expirationTime,

        // new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256Signature)

        SigningCredentials = new SigningCredentials(

                   new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),

                   SecurityAlgorithms.HmacSha256Signature

               )

      };

      var tokenHandler = new JwtSecurityTokenHandler();

      var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));



      return new AuthData

      {

        Token = token,

        TokenExpirationTime = ((DateTimeOffset)expirationTime).ToUnixTimeSeconds(),

        Id = user.Id,

        UserName = user.Name

      };

    }



    public string HashPassword(Client user, SignUp data)

    {

      return new PasswordHasher<Client>().HashPassword(user, data.Password);

    }



    public bool VerifyPassword(Client user, string providedPassword)

    {

      return new PasswordHasher<Client>().VerifyHashedPassword(user, user.Password, providedPassword) == PasswordVerificationResult.Success;

    }

  }
}