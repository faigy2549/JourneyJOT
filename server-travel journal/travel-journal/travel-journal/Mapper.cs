using AutoMapper;
using travel_journal.DTO;
using travel_journal.Models;

namespace travel_journal
{
    public class Mapper:Profile
    {
        public Mapper()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Trip, TripDTO>().ReverseMap();
            CreateMap<Photo, PhotoDTO>().ReverseMap();
            CreateMap<JournalEntry, JournalEntryDTO>().ReverseMap();
        }
    }
}
