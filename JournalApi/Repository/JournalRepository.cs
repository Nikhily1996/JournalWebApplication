using System.Threading.Tasks;
using JournalApi.Models;
using JournalApi.Data;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
namespace JournalApi.Repository
{
    public class JournalRepository : IJournalRepository
    {
        private readonly JournalContext _context;
        public JournalRepository(JournalContext context)
        {
            _context = context;
        }
        #region  To Do Items
        public async Task<ActionResult<ToDoItems>> AddToDoItems(ToDoItems item,DateTime date)
        {
              
              item.toBeCompletedBy=date;
             _context.TodoItems.Add(item);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item); 
            return item;
        }

        public async Task<ActionResult<bool>> DeleteToDoItems(int Id)
        {
            var itemToRemove=await _context.TodoItems.FindAsync(Id);
            if(itemToRemove==null){
                return false;
            }
            _context.TodoItems.Remove(itemToRemove);
            _context.SaveChanges();
            return true;
        }
        public  ActionResult<List<ToDoItems>> GetPendingToDoItems()
        {
          return  _context.TodoItems.Where(obj=>obj.IsComplete =="false").ToList();
        }

        public  ActionResult<List<ToDoItems>> GetCompletedToDoItems()
        {
          return  _context.TodoItems.Where(obj=>obj.IsComplete =="true").ToList();
        }

        public async Task<ActionResult<ToDoItems>> GetToDoItems(int Id)
        {
             return  await _context.TodoItems.FindAsync(Id);
        }

        public async Task<ActionResult<ToDoItems>> UpdateToDoItems(ToDoItems todoItem)
        {
            var todoItemInDB = await _context.TodoItems.FindAsync(todoItem.Id);
            if (todoItem == null)
            {
                return null;
            }
            todoItemInDB.IsComplete = todoItem.IsComplete;
             await _context.SaveChangesAsync();
            return todoItem;
        }
        #endregion
        #region BucketList
        public async Task<ActionResult<BucketListItem>> AddBucketListItems(BucketListItem item)
        {
            _context.BucketList.Add(item);
            await _context.SaveChangesAsync();
            // return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item); 
            return item;
        }
          public  ActionResult<List<BucketListItem>> GetPendingBucketListItems()
        {
          return  _context.BucketList.Where(obj=>obj.IsComplete =="false").ToList();
        }

        public  ActionResult<List<BucketListItem>> GetCompletedBucketListItems()
        {
          return  _context.BucketList.Where(obj=>obj.IsComplete =="true").ToList();
        }
         public async Task<ActionResult<bool>> DeleteBucketListItems(int Id)
        {
            var itemToRemove=await _context.BucketList.FindAsync(Id);
            if(itemToRemove==null){
                return false;
            }
            _context.BucketList.Remove(itemToRemove);
            _context.SaveChanges();
            return true;
        }
        // public async Task<ActionResult<BucketListItem>> GetBucketListItems(int Id)
        // {
        //      return  await _context.BucketList.FindAsync(Id);
        // }
        public  ActionResult<List<BucketListItem>> GetBucketListItems()
        {
          return  _context.BucketList.Select(x => x).ToList();
        }
          public async Task<ActionResult<BucketListItem>> UpdateBucketListItems(BucketListItem bucketListItem)
        {
            var bucketListItemInDB = await _context.BucketList.FindAsync(bucketListItem.Id);
            if (bucketListItemInDB == null)
            {
                return null;
            }
            bucketListItemInDB.NameOfBucketItem = bucketListItem.NameOfBucketItem;
            bucketListItemInDB.IsComplete = bucketListItem.IsComplete;
            bucketListItemInDB.PhotosLink=bucketListItem.PhotosLink;
             await _context.SaveChangesAsync();
            return bucketListItemInDB;

        }

        #endregion
    
      #region JournalBook
        public async Task<ActionResult<Journal>> AddJournalBook(Journal item,DateTime date)
        {
              var itemToAdd= _context.JournalBook.Where(obj=>obj.Date ==date).FirstOrDefault();
              item.Date=date;
              if(itemToAdd==null){
                  _context.JournalBook.Add(item);
                   await _context.SaveChangesAsync();
              }else{
                  await UpdateJournalBook(item);
              }
            
           
            // return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item); 
            return item;
        }
         public async Task<ActionResult<bool>> DeleteJournalBook(int Id)
        {
            var itemToRemove=await _context.JournalBook.FindAsync(Id);
            if(itemToRemove==null){
                return false;
            }
            _context.JournalBook.Remove(itemToRemove);
            _context.SaveChanges();
            return true;
        }
        public  ActionResult<Journal> GetJournalBook(DateTime date)
        {
            return   _context.JournalBook.Where(obj=>obj.Date==date).FirstOrDefault();
        }
        public  ActionResult<List<Journal>> GetJournalBook()
        {
          return  _context.JournalBook.Select(x => x).ToList();
        }
          public async Task<ActionResult<Journal>> UpdateJournalBook(Journal journalPage)
        {
            var journalPageInDB = _context.JournalBook.Where(obj=>obj.Date.Date==journalPage.Date.Date).FirstOrDefault();
            if (journalPageInDB == null)
            {
                return null;
            }
            journalPageInDB.Date = journalPage.Date;
            journalPageInDB.TodaysJounral = journalPage.TodaysJounral;
            journalPageInDB.Special=journalPage.Special;
            await _context.SaveChangesAsync();
            return journalPageInDB;

        }

        #endregion
   }
}