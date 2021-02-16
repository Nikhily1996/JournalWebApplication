using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JournalApi.Repository;
using JournalApi.Models;
namespace JournalApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoController : ControllerBase
    {

        private readonly IJournalRepository _repo;

        public ToDoController(IJournalRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoItems>> GetTodoItem(int id)
        {
            return await _repo.GetToDoItems(id);
        }
        [HttpGet]
         [Route("pending")]
        public ActionResult<List<ToDoItems>> GetPendingToDoItems()
        {
            return _repo.GetPendingToDoItems();
        }
        [HttpGet]
        [Route("completed")]
        public ActionResult<List<ToDoItems>> GetCompletedToDoItems()
        {
            return _repo.GetCompletedToDoItems();
        }
       
       
        [HttpPut()]
        public async Task<ActionResult<ToDoItems>> UpdateTodoItem(ToDoItems todoItemDTO)
        {
            return await _repo.UpdateToDoItems(todoItemDTO);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteTodoItem(int id)
        {
            return await _repo.DeleteToDoItems(id);
        }
         [HttpPost("{date}")]
        public async Task<ActionResult<ToDoItems>> PostTodoItem([FromBody]ToDoItems todoItem,DateTime date)
        {
            return await _repo.AddToDoItems(todoItem,date);
        }
    }
}
