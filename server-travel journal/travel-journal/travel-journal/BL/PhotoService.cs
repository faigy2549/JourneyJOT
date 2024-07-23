using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using travel_journal.DAL;
using travel_journal.DTO;
using travel_journal.Models;
using Microsoft.Extensions.Logging;

namespace travel_journal.BL
{
    public class PhotoService : IPhotoService
    {
        private readonly IPhotoRepository _photoRepository;
        private readonly ILogger<PhotoService> _logger;

        public PhotoService(IPhotoRepository photoRepository, ILogger<PhotoService> logger)
        {
            _photoRepository = photoRepository;
            _logger = logger;
        }

        public async Task<IEnumerable<PhotoDTO>> GetAllPhotosAsync()
        {
            _logger.LogInformation("Fetching all photos.");
            var photos = await _photoRepository.GetAllPhotosAsync();
            return MapToPhotoDTOs(photos);
        }

        public async Task<PhotoDTO> GetPhotoByIdAsync(int photoId)
        {
            _logger.LogInformation($"Fetching photo with ID {photoId}.");
            var photo = await _photoRepository.GetPhotoByIdAsync(photoId);
            return MapToPhotoDTO(photo);
        }

        public async Task<IEnumerable<PhotoDTO>> GetPhotoByJournalEntryIdAsync(int journalEntryId)
        {
            _logger.LogInformation($"Fetching photos for journal entry with ID {journalEntryId}.");
            var photos = await _photoRepository.GetPhotoByJournalEntryIdAsync(journalEntryId);
            return MapToPhotoDTOs(photos);
        }

        public async Task<int> CreatePhotoAsync(PhotoDTO photoCreateDto)
        {
            _logger.LogInformation("Creating a new photo.");
            var photo = MapToPhoto(photoCreateDto);
            await _photoRepository.AddPhotoAsync(photo);
            return photo.Id;
        }

        public async Task UpdatePhotoAsync(int photoId, PhotoDTO photoUpdateDto)
        {
            _logger.LogInformation($"Updating photo with ID {photoId}.");
            var existingPhoto = await _photoRepository.GetPhotoByIdAsync(photoId);
            if (existingPhoto == null)
            {
                _logger.LogWarning($"Photo with ID {photoId} not found.");
                throw new ArgumentException($"Photo with id {photoId} not found.");
            }

            MapToPhoto(photoUpdateDto, existingPhoto);

            await _photoRepository.UpdatePhotoAsync(existingPhoto);
        }

        public async Task DeletePhotoAsync(int photoId)
        {
            _logger.LogInformation($"Deleting photo with ID {photoId}.");
            var existingPhoto = await _photoRepository.GetPhotoByIdAsync(photoId);
            if (existingPhoto == null)
            {
                _logger.LogWarning($"Photo with ID {photoId} not found.");
                throw new ArgumentException($"Photo with id {photoId} not found.");
            }

            await _photoRepository.DeletePhotoAsync(existingPhoto);
        }

        private PhotoDTO MapToPhotoDTO(Photo photo)
        {
            return new PhotoDTO
            {
                Id = photo.Id,
                Url = photo.Url,
                JournalEntryId = photo.JournalEntryId,
            };
        }

        private IEnumerable<PhotoDTO> MapToPhotoDTOs(IEnumerable<Photo> photos)
        {
            var photoDTOs = new List<PhotoDTO>();
            foreach (var photo in photos)
            {
                photoDTOs.Add(MapToPhotoDTO(photo));
            }
            return photoDTOs;
        }

        private Photo MapToPhoto(PhotoDTO photoCreateDto)
        {
            return new Photo
            {
                Url = photoCreateDto.Url,
                JournalEntryId = photoCreateDto.JournalEntryId,
            };
        }

        private void MapToPhoto(PhotoDTO photoUpdateDto, Photo photo)
        {
            photo.Id = photoUpdateDto.Id;
            photo.Url = photoUpdateDto.Url;
            photo.JournalEntryId = photoUpdateDto.JournalEntryId;
        }
    }
}
