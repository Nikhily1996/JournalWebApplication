using System;
namespace JournalApi.Models
{
    public class ToDoItems
    {
        public int Id { get; set; }
        public string NameOfToDo { get; set; }
        public string IsComplete { get; set; }
        public string IsRequired { get; set; }
        public DateTime toBeCompletedBy { get; set; }
    }
}