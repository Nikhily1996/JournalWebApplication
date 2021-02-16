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
    public class BucketListController: ControllerBase
    {
        private readonly IJournalRepository _repo;
        public BucketListController(IJournalRepository repo)
        {
            _repo = repo;
        }
        [HttpGet()]
        public ActionResult<List<BucketListItem>> GetBucketListItem()
        {
            return  _repo.GetBucketListItems();
        }
        [HttpGet]
        [Route("pending")]
        public ActionResult<List<BucketListItem>> GetPendingBucketListItem()
        {
            return _repo.GetPendingBucketListItems();
        }
        [HttpGet]
        [Route("completed")]
        public ActionResult<List<BucketListItem>> GetCompletedBucketListItem()
        {
            return _repo.GetCompletedBucketListItems();
        }
       
       
        [HttpPut("setBucketListItem")]
        public async Task<ActionResult<BucketListItem>> UpdateBucketListItem(BucketListItem todoItemDTO)
        {
            return await _repo.UpdateBucketListItems(todoItemDTO);

        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteBucketListItem(int id)
        {
            return await _repo.DeleteBucketListItems(id);
        }
        [HttpPost("addBucketListItem")]
        public async Task<ActionResult<BucketListItem>> PostBucketListItem(BucketListItem bucketListItem)
        {
            return await _repo.AddBucketListItems(bucketListItem);
        }
        
    }
}