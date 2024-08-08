using travel_journal.DTO;

namespace travel_journal.BL
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByIdAsync(string id);
    }
}
