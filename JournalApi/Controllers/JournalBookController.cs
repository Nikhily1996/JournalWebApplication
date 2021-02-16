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
    public class JournalBookController: ControllerBase
    {  private readonly IJournalRepository _repo;
        public JournalBookController(IJournalRepository repo)
        {
            _repo = repo;
        }
        [HttpGet("{date}")]
        public  ActionResult<Journal> GetJournal(DateTime date)
        {
            return  _repo.GetJournalBook(date);
        }
        [HttpGet]
        public ActionResult<List<Journal>> GetAll()
        {
            return _repo.GetJournalBook();
        }
       
        [HttpPut()]
        public async Task<ActionResult<Journal>> UpdateJournal(Journal todoItemDTO)
        {
            return await _repo.UpdateJournalBook(todoItemDTO);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteJournal(int id)
        {
            return await _repo.DeleteJournalBook(id);
        }
        [HttpPost("{date}")]
        public async Task<ActionResult<Journal>> PostJournal([FromBody]Journal todoItem,DateTime date)
        {
            return await _repo.AddJournalBook(todoItem,date);
        }
        
    }
}