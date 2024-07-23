using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using travel_journal.DTO;
using travel_journal.BL;

namespace travel_journal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly ILogger<PhotoController> _logger;

        public PhotoController(IPhotoService photoService, ILogger<PhotoController> logger)
        {
            _photoService = photoService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoDTO>>> Get()
        {
            _logger.LogInformation("Fetching all photos.");
            var photos = await _photoService.GetAllPhotosAsync();
            return Ok(photos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoDTO>> Get(int id)
        {
            _logger.LogInformation($"Fetching photo with ID {id}.");
            var photo = await _photoService.GetPhotoByIdAsync(id);
            if (photo == null)
            {
                _logger.LogWarning($"Photo with ID {id} not found.");
                return NotFound();
            }
            return Ok(photo);
        }

        [HttpGet("journalEntryId/{journalEntryId}")]
        public async Task<ActionResult<IEnumerable<PhotoDTO>>> GetByJournal(int journalEntryId)
        {
            _logger.LogInformation($"Fetching photos for journal entry with ID {journalEntryId}.");
            var photos = await _photoService.GetPhotoByJournalEntryIdAsync(journalEntryId);
            if (photos == null || !photos.GetEnumerator().MoveNext())
            {
                _logger.LogWarning($"No photos found for journal entry with ID {journalEntryId}.");
                return NotFound();
            }
            return Ok(photos);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(PhotoDTO photoCreateDTO)
        {
            _logger.LogInformation("Creating a new photo.");
            var photoId = await _photoService.CreatePhotoAsync(photoCreateDTO);
            return CreatedAtAction(nameof(Get), new { id = photoId }, photoId);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, PhotoDTO photoUpdateDTO)
        {
            _logger.LogInformation($"Updating photo with ID {id}.");
            try
            {
                await _photoService.UpdatePhotoAsync(id, photoUpdateDTO);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, $"Photo with ID {id} not found.");
                return NotFound(ex.Message);
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            _logger.LogInformation($"Deleting photo with ID {id}.");
            try
            {
                await _photoService.DeletePhotoAsync(id);
            }
            catch (ArgumentException ex)
            {
                _logger.LogError(ex, $"Photo with ID {id} not found.");
                return NotFound(ex.Message);
            }
            return NoContent();
        }
    }
}
