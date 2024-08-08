using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using travel_journal.Models;

namespace travel_journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadFiles(List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files provided.");

            var uploadedFileUrls = new List<string>();

            foreach (var file in files)
            {
                var filePath = Path.Combine("wwwroot/photos", file.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var fileUrl = $"/uploads/{file.FileName}";
                uploadedFileUrls.Add(fileUrl);
            }

            return Ok(uploadedFileUrls); 
        }
    }
}
