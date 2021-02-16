using Microsoft.EntityFrameworkCore;
using JournalApi.Models;
namespace JournalApi.Data
{
    public class JournalContext: DbContext
    {
        public JournalContext(DbContextOptions<JournalContext> options): base(options)
        {
        }

        public DbSet<ToDoItems> TodoItems { get; set; }
        public DbSet<BucketListItem> BucketList { get; set; }
        public DbSet<Journal> JournalBook { get; set; }

    }
}