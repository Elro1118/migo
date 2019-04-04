using System;

using System.IO;

using System.Linq;

using System.Text;

using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc;



namespace content.ImageHelper

{

  public interface IImageHandler

  {

    Task<string> UploadImage(string filedata);

  }



  public interface IImageWriter

  {

    Task<string> UploadImage(string filedata);

  }





  public class ImageHandler : IImageHandler

  {

    private readonly IImageWriter _imageWriter;

    public ImageHandler(IImageWriter imageWriter)

    {

      _imageWriter = imageWriter;

    }



    public async Task<string> UploadImage(string filedata)

    {

      var result = await _imageWriter.UploadImage(filedata);

      return result;

    }

  }





  public class ImageWriter : IImageWriter

  {

    public async Task<string> UploadImage(string filedata)

    {

      var splitted = filedata.Split(';');
      var fileType = splitted[0];
      var name = splitted[1];//"name=mira.jpg"
      var extension = "." + name.Split('.')[1];
      var data = splitted[2].Split(',')[1];
      // check to see if its an image, 
      var isImage = extension == ".jpg" || extension == ".jpeg" || extension == ".png";
      // if yes, then save to disk
      if (isImage)
      {
        return await WriteFile(data, extension);

      }
      return "Invalid image file";
    }



    /// <summary>

    /// Method to check if file is image file

    /// </summary>

    /// <param name="file"></param>

    /// <returns></returns>

    private bool CheckIfImageFile(IFormFile file)

    {

      byte[] fileBytes;

      using (var ms = new MemoryStream())

      {

        file.CopyTo(ms);

        fileBytes = ms.ToArray();

      }



      return WriterHelper.GetImageFormat(fileBytes) != WriterHelper.ImageFormat.unknown;

    }



    /// <summary>

    /// Method to write file onto the disk

    /// </summary>

    /// <param name="file"></param>

    /// <returns></returns>

    public async Task<string> WriteFile(string base64FileData, string extension)

    {

      string fileName;

      var path = String.Empty;

      try

      {

        fileName = Guid.NewGuid().ToString() + extension; //Create a new Name 

        //for the file due to security reasons.

        path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images", fileName);

        File.WriteAllBytes(path, Convert.FromBase64String(base64FileData));


      }

      catch (Exception e)

      {

        return e.Message;

      }



      return path;

    }





    public class WriterHelper

    {

      public enum ImageFormat

      {

        bmp,

        jpeg,

        gif,

        tiff,

        png,

        unknown

      }



      public static ImageFormat GetImageFormat(byte[] bytes)

      {

        var bmp = Encoding.ASCII.GetBytes("BM");     // BMP

        var gif = Encoding.ASCII.GetBytes("GIF");    // GIF

        var png = new byte[] { 137, 80, 78, 71 };              // PNG

        var tiff = new byte[] { 73, 73, 42 };                  // TIFF

        var tiff2 = new byte[] { 77, 77, 42 };                 // TIFF

        var jpeg = new byte[] { 255, 216, 255, 224 };          // jpeg

        var jpeg2 = new byte[] { 255, 216, 255, 225 };         // jpeg canon



        if (bmp.SequenceEqual(bytes.Take(bmp.Length)))

          return ImageFormat.bmp;



        if (gif.SequenceEqual(bytes.Take(gif.Length)))

          return ImageFormat.gif;



        if (png.SequenceEqual(bytes.Take(png.Length)))

          return ImageFormat.png;



        if (tiff.SequenceEqual(bytes.Take(tiff.Length)))

          return ImageFormat.tiff;



        if (tiff2.SequenceEqual(bytes.Take(tiff2.Length)))

          return ImageFormat.tiff;



        if (jpeg.SequenceEqual(bytes.Take(jpeg.Length)))

          return ImageFormat.jpeg;



        if (jpeg2.SequenceEqual(bytes.Take(jpeg2.Length)))

          return ImageFormat.jpeg;



        return ImageFormat.unknown;

      }

    }

  }

}