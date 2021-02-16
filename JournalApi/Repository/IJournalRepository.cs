using System.Threading.Tasks;
using JournalApi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
namespace JournalApi.Repository
{
    public interface IJournalRepository
    {
        Task<ActionResult<ToDoItems>> GetToDoItems(int Id);
        ActionResult<List<ToDoItems>> GetPendingToDoItems();
        ActionResult<List<ToDoItems>> GetCompletedToDoItems();
        Task<ActionResult<ToDoItems>> AddToDoItems(ToDoItems item,DateTime date);
        Task<ActionResult<bool>> DeleteToDoItems(int Id);
        Task<ActionResult<ToDoItems>> UpdateToDoItems(ToDoItems todoItem);
        Task<ActionResult<BucketListItem>> AddBucketListItems(BucketListItem item);
        ActionResult<List<BucketListItem>> GetBucketListItems();
        ActionResult<List<BucketListItem>> GetPendingBucketListItems();
        ActionResult<List<BucketListItem>> GetCompletedBucketListItems();
       // Task<ActionResult<BucketListItem>> GetBucketListItems(int Id);
        Task<ActionResult<BucketListItem>> UpdateBucketListItems(BucketListItem bucketListItem);
        Task<ActionResult<bool>> DeleteBucketListItems(int Id);
        Task<ActionResult<Journal>> AddJournalBook(Journal item,DateTime date);
        ActionResult<List<Journal>> GetJournalBook();
        ActionResult<Journal> GetJournalBook(DateTime date);
        Task<ActionResult<Journal>> UpdateJournalBook(Journal Journal);
        Task<ActionResult<bool>> DeleteJournalBook(int Id);

    }
}