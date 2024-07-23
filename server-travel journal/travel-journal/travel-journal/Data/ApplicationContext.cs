using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using travel_journal.Models;

public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }
    public DbSet<Trip> Trips { get; set; }
    public DbSet<JournalEntry> JournalEntries { get; set; }
    public DbSet<Photo> Photos { get; set; }
}

