using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;



namespace migo.Helpers
{

  public class CloudinaryStorage

  {
    private Cloudinary _cloudinary;

    public CloudinaryStorage()
    {

      Account account = new Account(

            "dd4sigtpj",
          "377446522361648",
           "NVWnfSYx4gKg4kvHbDgEr518p1c");

      _cloudinary = new Cloudinary(account);
    }



    public async Task<ImageUploadResult> UploadFile(string path)
    {

      var uploadParams = new ImageUploadParams()

      {

        File = new FileDescription(path)

      };

      var uploadResult = await _cloudinary.UploadAsync(uploadParams);

      return uploadResult;

    }

  }
}