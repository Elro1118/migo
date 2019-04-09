
using System;
using System.ComponentModel.DataAnnotations;
namespace migo.ViewModels
{
  public class SignUp
  {
    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.Now;

    public int RolId { get; set; } = 1;
    public bool Active { get; set; } = true;

  }
}