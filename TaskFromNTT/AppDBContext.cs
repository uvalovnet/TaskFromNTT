using Microsoft.EntityFrameworkCore;
using TaskFromNTT.Models;

namespace TaskFromNTT
{
    public class AppDBContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Сategory> Categories { get; set; }
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { //Database.EnsureCreated(); 
        }
    }

}
