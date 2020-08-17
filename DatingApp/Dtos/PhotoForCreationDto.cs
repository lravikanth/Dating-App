using Microsoft.AspNetCore.Http;

namespace DatingApp.Dtos
{
    public class PhotoForCreationDto
    {
        public string Url { get; set; }
        public IFormFile file {get; set;}
        public string Description { get; set; }
        public System.DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public PhotoForCreationDto()
        {
            DateAdded = System.DateTime.Now;
        }

    }
}