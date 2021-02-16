using System;
namespace JournalApi.Models
{
    public class Journal
    {
        
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string TodaysJounral { get; set; }
        public string Special { get; set; }
    }
}